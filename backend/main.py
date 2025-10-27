from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from models import (
    AssessmentScores, AnalysisResult, InvoiceRequest, InvoiceResponse,
    SaveResponseRequest, AIAnalysisRequest, ComprehensiveReport
)
from gpt_engine import GPTAnalyzer
from parasut_service import ParasutService
from database_service import db_service
from report_service import report_service
import os
from dotenv import load_dotenv
from typing import Optional, List, Dict

load_dotenv()

app = FastAPI(
    title="ExportIQ 360 API",
    description="E-İhracat Botu MVP - AI-powered e-export competence analysis",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:3000",
        "https://exportiq360.netlify.app",  # Production frontend
        os.getenv("FRONTEND_URL", "")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize GPT analyzer
gpt_analyzer = GPTAnalyzer()

# Initialize Paraşüt service
parasut_service = ParasutService()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "ExportIQ 360 API is running", 
        "status": "healthy",
        "version": "1.0.0",
        "openai_configured": bool(os.getenv("OPENAI_API_KEY"))
    }

@app.post("/analyze", response_model=dict)
async def analyze_competence(scores: AssessmentScores):
    """
    Analyze e-export competence based on provided scores
    """
    try:
        # Extract scores and language
        score_dict = {
            "strategy": scores.strategy,
            "tech": scores.tech,
            "marketing": scores.marketing,
            "logistics": scores.logistics,
            "analytics": scores.analytics
        }
        
        # Get analysis from GPT
        result = gpt_analyzer.analyze_competence(score_dict, scores.language)
        
        return result
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Analysis failed: {str(e)}"
        )

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "api_status": "running",
        "openai_key_configured": bool(os.getenv("OPENAI_API_KEY")),
        "parasut_configured": bool(os.getenv("PARASUT_CLIENT_ID")),
        "environment": os.getenv("ENV", "development")
    }

@app.post("/invoice/create", response_model=InvoiceResponse)
async def create_invoice(invoice_request: InvoiceRequest):
    """
    Paraşüt üzerinden fatura oluştur
    """
    try:
        # Invoice data hazırla
        invoice_data = {
            "customer": {
                "name": invoice_request.customer.name,
                "email": invoice_request.customer.email,
                "tax_office": invoice_request.customer.tax_office,
                "tax_number": invoice_request.customer.tax_number,
                "address": invoice_request.customer.address,
                "city": invoice_request.customer.city,
                "country": invoice_request.customer.country
            },
            "items": [
                {
                    "description": item.description,
                    "quantity": item.quantity,
                    "unit_price": item.unit_price,
                    "vat_rate": item.vat_rate
                }
                for item in invoice_request.items
            ],
            "invoice_date": invoice_request.invoice_date,
            "due_date": invoice_request.due_date,
            "notes": invoice_request.notes,
            "currency": invoice_request.currency
        }
        
        # Paraşüt servisini çağır
        result = parasut_service.create_invoice(invoice_data)
        
        # Email gönder (opsiyonel)
        if result["success"] and invoice_request.customer.email:
            parasut_service.send_invoice_email(
                result["invoice_id"], 
                invoice_request.customer.email
            )
        
        return InvoiceResponse(**result)
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Invoice creation failed: {str(e)}"
        )

@app.post("/payment/webhook")
async def payment_webhook(
    customer_name: str,
    customer_email: str,
    package_name: str = "ExportIQ 360 Assessment Paketi",
    amount: float = 0.0,
    x_webhook_secret: Optional[str] = Header(None)
):
    """
    Ödeme tamamlandığında otomatik fatura oluştur
    
    Webhook güvenliği için X-Webhook-Secret header'ı kontrol edilir
    """
    # Webhook güvenlik kontrolü
    expected_secret = os.getenv("WEBHOOK_SECRET")
    if expected_secret and x_webhook_secret != expected_secret:
        raise HTTPException(status_code=401, detail="Invalid webhook secret")
    
    try:
        # Otomatik fatura oluştur
        invoice_data = {
            "customer": {
                "name": customer_name,
                "email": customer_email,
                "country": "TR"
            },
            "items": [
                {
                    "description": package_name,
                    "quantity": 1,
                    "unit_price": amount,
                    "vat_rate": 20
                }
            ],
            "notes": f"Otomatik fatura - {package_name}",
            "currency": "TRY"
        }
        
        result = parasut_service.create_invoice(invoice_data)
        
        # Email gönder
        if result["success"]:
            parasut_service.send_invoice_email(result["invoice_id"], customer_email)
        
        return {
            "status": "success",
            "message": "Invoice created and sent",
            "invoice_number": result.get("invoice_number"),
            "invoice_url": result.get("invoice_url")
        }
        
    except Exception as e:
        # Hata durumunda webhook'u başarısız saymayalım
        # Ama hatayı loglayalım
        return {
            "status": "error",
            "message": f"Invoice creation failed: {str(e)}"
        }

# ==================== Assessment Response Endpoints ====================

@app.post("/responses/save")
async def save_responses(request: SaveResponseRequest):
    """
    Kullanıcının assessment yanıtlarını kaydet
    """
    try:
        result = db_service.save_responses_batch(
            user_id=request.user_id,
            user_email=request.user_email,
            assessment_id=request.assessment_id,
            responses=request.responses,
            package_type=request.package_type
        )
        
        if result["success"]:
            return {
                "status": "success",
                "message": f"{result['saved_count']} responses saved successfully",
                "saved_count": result["saved_count"],
                "total_count": result["total_count"]
            }
        else:
            raise HTTPException(status_code=500, detail=result.get("error", "Failed to save responses"))
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save responses: {str(e)}"
        )

@app.get("/responses/{user_id}/{assessment_id}")
async def get_responses(user_id: str, assessment_id: str):
    """
    Kullanıcının belirli bir assessment için yanıtlarını getir
    """
    try:
        responses = db_service.get_user_responses(user_id, assessment_id)
        
        return {
            "status": "success",
            "user_id": user_id,
            "assessment_id": assessment_id,
            "responses": responses,
            "count": len(responses)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get responses: {str(e)}"
        )

@app.get("/responses/{user_id}")
async def get_all_user_responses(user_id: str):
    """
    Kullanıcının tüm assessment'larını getir
    """
    try:
        assessments = db_service.get_all_user_assessments(user_id)
        
        return {
            "status": "success",
            "user_id": user_id,
            "assessments": assessments,
            "count": len(assessments)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get user responses: {str(e)}"
        )

# ==================== AI Report Generation Endpoints ====================

@app.post("/report/generate", response_model=Dict)
async def generate_report(request: AIAnalysisRequest):
    """
    Kullanıcının yanıtlarını analiz edip AI destekli kapsamlı rapor üret
    
    Request body should include:
    - user_id: User identifier
    - assessment_id: Assessment identifier
    - language: "tr" or "en"
    - questions: Array of question objects from frontend
    """
    try:
        print(f"[REPORT] Starting report generation for user {request.user_id}, assessment {request.assessment_id}")
        
        # Get user responses from database
        user_responses = db_service.get_user_responses(
            request.user_id, 
            request.assessment_id
        )
        
        if not user_responses:
            print(f"[REPORT] No responses found for user {request.user_id}, assessment {request.assessment_id}")
            raise HTTPException(
                status_code=404,
                detail="Bu değerlendirme için yanıt bulunamadı. Lütfen önce değerlendirmeyi tamamlayın."
            )
        
        print(f"[REPORT] Found {len(user_responses)} responses")
        
        # Determine package type from responses
        package_type = user_responses[0].get("package_type", "combined")
        print(f"[REPORT] Package type: {package_type}")
        
        # Generate comprehensive report
        print(f"[REPORT] Generating AI report...")
        report = report_service.generate_comprehensive_report(
            user_id=request.user_id,
            assessment_id=request.assessment_id,
            user_responses=user_responses,
            questions_data=request.questions or [],
            package_type=package_type,
            language=request.language
        )
        
        print(f"[REPORT] Report generated successfully")
        
        # Convert to dict for JSON serialization
        report_dict = report.model_dump(mode='json')
        
        return {
            "status": "success",
            "report": report_dict
        }
        
    except HTTPException as he:
        print(f"[REPORT] HTTP Exception: {he.detail}")
        raise he
    except Exception as e:
        import traceback
        print(f"[REPORT] Error generating report: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Rapor oluşturulurken hata: {str(e)}"
        )

@app.get("/stats")
async def get_stats():
    """
    Genel istatistikler - admin için
    """
    try:
        stats = db_service.get_stats()
        return {
            "status": "success",
            "stats": stats
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get stats: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True
    )