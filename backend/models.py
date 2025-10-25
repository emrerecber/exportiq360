from pydantic import BaseModel, Field
from typing import Dict, Any, Optional, List
from datetime import datetime

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

# Question and Response Models
class Question(BaseModel):
    id: str
    question: Dict[str, str]  # {"en": "...", "tr": "..."}
    category: str
    channels: List[str] = Field(default_factory=list)  # ["ecommerce", "eexport", "combined"]
    is_free_trial_question: bool = False
    order: int

class UserResponse(BaseModel):
    user_id: str
    user_email: str
    assessment_id: str
    question_id: str
    answer: int  # 1-5 rating
    timestamp: Optional[datetime] = None
    package_type: str  # "free_trial", "ecommerce", "eexport", "combined"

class SaveResponseRequest(BaseModel):
    user_id: str
    user_email: str
    assessment_id: str
    responses: List[Dict[str, Any]]  # [{question_id, answer}, ...]
    package_type: str

class AIAnalysisRequest(BaseModel):
    user_id: str
    assessment_id: str
    language: str = "tr"

class QuestionAnalysis(BaseModel):
    question_id: str
    question_text: str
    user_answer: int
    ai_comment: str
    category: str

class ChannelScore(BaseModel):
    channel: str
    score: float
    max_score: float
    percentage: float
    level: str  # "Başlangıç", "Orta", "İleri", "Uzman"

class ComprehensiveReport(BaseModel):
    user_id: str
    assessment_id: str
    package_type: str
    overall_score: float
    channel_scores: List[ChannelScore]
    category_scores: Dict[str, float]
    question_analyses: List[QuestionAnalysis]
    strengths: List[str]
    weaknesses: List[str]
    recommendations: List[str]
    action_plan: Dict[str, List[str]]
    generated_at: datetime
