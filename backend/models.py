from pydantic import BaseModel
from typing import Dict, Any, Optional, List

class AssessmentScores(BaseModel):
    strategy: float
    tech: float
    marketing: float
    logistics: float
    analytics: float
    language: Optional[str] = "tr"

class CompetenceReport(BaseModel):
    overall_score: float
    category_scores: Dict[str, float]

class AnalysisResult(BaseModel):
    competence_level: str
    competence_report: CompetenceReport
    gap_analysis: Optional[Dict[str, Any]] = None
    swot_analysis: Optional[Dict[str, List[str]]] = None
    action_plan: Optional[Dict[str, List[str]]] = None
    training_recommendations: Optional[List[str]] = None

# Paraşüt Invoice Models
class CustomerInfo(BaseModel):
    name: str
    email: str
    tax_office: Optional[str] = None
    tax_number: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = "TR"

class InvoiceItem(BaseModel):
    description: str
    quantity: float
    unit_price: float
    vat_rate: Optional[float] = 20.0  # KDV oranı varsayılan %20

class InvoiceRequest(BaseModel):
    customer: CustomerInfo
    items: List[InvoiceItem]
    invoice_date: Optional[str] = None
    due_date: Optional[str] = None
    notes: Optional[str] = None
    currency: Optional[str] = "TRY"

class InvoiceResponse(BaseModel):
    success: bool
    invoice_id: Optional[str] = None
    invoice_number: Optional[str] = None
    invoice_url: Optional[str] = None
    total_amount: Optional[float] = None
    error: Optional[str] = None
