"""
SQLAlchemy ORM Models for ExportIQ 360
"""
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, 
    Text, ForeignKey, JSON, Enum as SQLEnum
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
import enum
from database import Base


# Enums
class UserRole(str, enum.Enum):
    FREE_TRIAL = "free_trial"
    USER = "user"
    ADMIN = "admin"


class PlanType(str, enum.Enum):
    FREE_TRIAL = "free_trial"
    ECOMMERCE = "ecommerce"
    EEXPORT = "eexport"
    COMBINED = "combined"


class SubscriptionStatus(str, enum.Enum):
    ACTIVE = "active"
    EXPIRED = "expired"
    CANCELLED = "cancelled"
    TRIAL = "trial"


# Models
class User(Base):
    """User model"""
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    company_name = Column(String(255))
    phone = Column(String(50))
    role = Column(SQLEnum(UserRole), default=UserRole.FREE_TRIAL, nullable=False)
    
    # Subscription
    plan = Column(SQLEnum(PlanType), default=PlanType.FREE_TRIAL, nullable=False)
    subscription_status = Column(SQLEnum(SubscriptionStatus), default=SubscriptionStatus.TRIAL)
    subscription_start = Column(DateTime)
    subscription_end = Column(DateTime)
    trial_completed = Column(Boolean, default=False)
    
    # Profile
    avatar_url = Column(String(500))
    language = Column(String(5), default="tr")
    
    # Email verification
    email_verified = Column(Boolean, default=False)
    verification_token = Column(String(255))
    
    # Password reset
    reset_token = Column(String(255))
    reset_token_expires = Column(DateTime)
    
    # Metadata
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    last_login = Column(DateTime)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    assessments = relationship("Assessment", back_populates="user", cascade="all, delete-orphan")
    responses = relationship("UserResponse", back_populates="user", cascade="all, delete-orphan")
    subscriptions = relationship("Subscription", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User {self.email}>"


class Question(Base):
    """Question model"""
    __tablename__ = "questions"
    
    id = Column(String(36), primary_key=True)
    question_text_tr = Column(Text, nullable=False)
    question_text_en = Column(Text, nullable=False)
    category = Column(String(50), nullable=False, index=True)
    
    # Channel filtering
    channels = Column(JSON)  # ["ecommerce", "eexport", "combined"]
    is_free_trial_question = Column(Boolean, default=False, index=True)
    
    order = Column(Integer, nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Metadata
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    responses = relationship("UserResponse", back_populates="question")
    
    def __repr__(self):
        return f"<Question {self.id}>"


class Assessment(Base):
    """Assessment model - tracks user's assessment sessions"""
    __tablename__ = "assessments"
    
    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    
    package_type = Column(SQLEnum(PlanType), nullable=False)
    language = Column(String(5), default="tr")
    
    # Progress
    total_questions = Column(Integer, nullable=False)
    answered_questions = Column(Integer, default=0)
    is_completed = Column(Boolean, default=False)
    completion_percentage = Column(Float, default=0.0)
    
    # Timing
    started_at = Column(DateTime, default=func.now(), nullable=False)
    completed_at = Column(DateTime)
    time_spent_seconds = Column(Integer)  # Total time spent
    
    # Scoring
    overall_score = Column(Float)
    category_scores = Column(JSON)  # {"strategy": 85, "tech": 72, ...}
    channel_scores = Column(JSON)  # [{"channel": "ecommerce", "score": 80}, ...]
    
    # AI Report
    report_generated = Column(Boolean, default=False)
    report_data = Column(JSON)  # Full AI report stored as JSON
    
    # Metadata
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="assessments")
    responses = relationship("UserResponse", back_populates="assessment", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Assessment {self.id} - User {self.user_id}>"


class UserResponse(Base):
    """User's answer to a specific question"""
    __tablename__ = "user_responses"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    assessment_id = Column(String(36), ForeignKey("assessments.id"), nullable=False, index=True)
    question_id = Column(String(36), ForeignKey("questions.id"), nullable=False, index=True)
    
    answer = Column(Integer, nullable=False)  # 1-5 rating
    
    # AI Analysis
    ai_comment = Column(Text)  # AI-generated comment for this specific answer
    
    # Metadata
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="responses")
    assessment = relationship("Assessment", back_populates="responses")
    question = relationship("Question", back_populates="responses")
    
    def __repr__(self):
        return f"<Response {self.id} - Q:{self.question_id} A:{self.answer}>"


class Subscription(Base):
    """Subscription and payment tracking"""
    __tablename__ = "subscriptions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    
    plan_type = Column(SQLEnum(PlanType), nullable=False)
    status = Column(SQLEnum(SubscriptionStatus), default=SubscriptionStatus.ACTIVE)
    
    # Payment
    amount = Column(Float, nullable=False)
    currency = Column(String(3), default="TRY")
    payment_provider = Column(String(50))  # "stripe", "iyzico", etc.
    payment_id = Column(String(255))  # External payment ID
    
    # Period
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    auto_renew = Column(Boolean, default=False)
    
    # Invoice
    invoice_generated = Column(Boolean, default=False)
    invoice_id = Column(String(255))
    invoice_url = Column(String(500))
    
    # Metadata
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    cancelled_at = Column(DateTime)
    
    # Relationships
    user = relationship("User", back_populates="subscriptions")
    
    def __repr__(self):
        return f"<Subscription {self.id} - User {self.user_id} - {self.plan_type}>"


class PromoCode(Base):
    """Promotional discount codes"""
    __tablename__ = "promo_codes"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(50), unique=True, nullable=False, index=True)
    
    # Discount
    discount_type = Column(String(20), nullable=False)  # "percentage" or "fixed"
    discount_value = Column(Float, nullable=False)
    
    # Validity
    is_active = Column(Boolean, default=True)
    valid_from = Column(DateTime, nullable=False)
    valid_until = Column(DateTime, nullable=False)
    
    # Usage limits
    max_uses = Column(Integer)  # None for unlimited
    current_uses = Column(Integer, default=0)
    
    # Applicable plans
    applicable_plans = Column(JSON)  # ["ecommerce", "eexport"] or null for all
    
    # Metadata
    created_at = Column(DateTime, default=func.now())
    created_by = Column(String(36))  # Admin user ID
    
    def __repr__(self):
        return f"<PromoCode {self.code}>"


class AuditLog(Base):
    """System audit log for tracking important actions"""
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String(36), index=True)
    action = Column(String(100), nullable=False, index=True)
    resource_type = Column(String(50))  # "user", "assessment", "subscription"
    resource_id = Column(String(36))
    details = Column(JSON)
    ip_address = Column(String(45))
    user_agent = Column(String(500))
    
    created_at = Column(DateTime, default=func.now(), index=True)
    
    def __repr__(self):
        return f"<AuditLog {self.action} by {self.user_id}>"
