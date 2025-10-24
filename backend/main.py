from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from models import AssessmentScores, AnalysisResult, InvoiceRequest, InvoiceResponse
from gpt_engine import GPTAnalyzer
from parasut_service import ParasutService
import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

app = FastAPI(
    title="ExportIQ 360 API",
    description="E-İhracat Botu MVP - AI-powered e-export competence analysis",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Frontend URLs
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True
    )