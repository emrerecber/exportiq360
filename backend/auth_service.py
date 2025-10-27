"""
Authentication Service
Handles user authentication, JWT tokens, and password management
"""
import os
from datetime import datetime, timedelta
from typing import Optional
from passlib.context import CryptContext
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from db_models import User, UserRole, PlanType, SubscriptionStatus
import uuid

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days


class AuthService:
    """Authentication service for user management"""
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash a password"""
        return pwd_context.hash(password)
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verify a password against hash"""
        return pwd_context.verify(plain_password, hashed_password)
    
    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
        """Create JWT access token"""
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    @staticmethod
    def verify_token(token: str) -> Optional[dict]:
        """Verify JWT token and return payload"""
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except JWTError:
            return None
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """Get user by email"""
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: str) -> Optional[User]:
        """Get user by ID"""
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def create_user(
        db: Session,
        email: str,
        password: str,
        name: str,
        company_name: Optional[str] = None,
        phone: Optional[str] = None
    ) -> User:
        """Create a new user"""
        
        # Check if user already exists
        existing_user = AuthService.get_user_by_email(db, email)
        if existing_user:
            raise ValueError("User with this email already exists")
        
        # Create new user
        user = User(
            id=str(uuid.uuid4()),
            email=email,
            password_hash=AuthService.hash_password(password),
            name=name,
            company_name=company_name,
            phone=phone,
            role=UserRole.FREE_TRIAL,
            plan=PlanType.FREE_TRIAL,
            subscription_status=SubscriptionStatus.TRIAL,
            trial_completed=False,
            language="tr",
            email_verified=False,
            is_active=True,
            created_at=datetime.utcnow()
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
        """Authenticate user with email and password"""
        user = AuthService.get_user_by_email(db, email)
        
        if not user:
            return None
        
        if not AuthService.verify_password(password, user.password_hash):
            return None
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.commit()
        
        return user
    
    @staticmethod
    def create_admin_user(
        db: Session,
        email: str,
        password: str,
        name: str
    ) -> User:
        """Create an admin user"""
        
        # Check if user already exists
        existing_user = AuthService.get_user_by_email(db, email)
        if existing_user:
            # If exists, upgrade to admin
            existing_user.role = UserRole.ADMIN
            existing_user.plan = PlanType.COMBINED
            existing_user.subscription_status = SubscriptionStatus.ACTIVE
            db.commit()
            return existing_user
        
        # Create new admin user
        user = User(
            id=str(uuid.uuid4()),
            email=email,
            password_hash=AuthService.hash_password(password),
            name=name,
            company_name="ExportIQ 360",
            role=UserRole.ADMIN,
            plan=PlanType.COMBINED,
            subscription_status=SubscriptionStatus.ACTIVE,
            trial_completed=True,
            language="tr",
            email_verified=True,
            is_active=True,
            created_at=datetime.utcnow()
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def update_user_plan(
        db: Session,
        user_id: str,
        plan: PlanType,
        subscription_start: datetime,
        subscription_end: datetime
    ) -> User:
        """Update user's subscription plan"""
        user = AuthService.get_user_by_id(db, user_id)
        
        if not user:
            raise ValueError("User not found")
        
        user.plan = plan
        user.subscription_status = SubscriptionStatus.ACTIVE
        user.subscription_start = subscription_start
        user.subscription_end = subscription_end
        user.trial_completed = True
        
        # Upgrade role if not admin
        if user.role != UserRole.ADMIN:
            user.role = UserRole.USER
        
        db.commit()
        db.refresh(user)
        
        return user
    
    @staticmethod
    def user_to_dict(user: User) -> dict:
        """Convert user model to dict for API response"""
        return {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "company": user.company_name,
            "companyName": user.company_name,  # Alias for frontend
            "phone": user.phone,
            "role": user.role.value,
            "plan": user.plan.value,
            "subscription_status": user.subscription_status.value if user.subscription_status else None,
            "subscription_start": user.subscription_start.isoformat() if user.subscription_start else None,
            "subscription_end": user.subscription_end.isoformat() if user.subscription_end else None,
            "trial_completed": user.trial_completed,
            "language": user.language,
            "email_verified": user.email_verified,
            "avatar_url": user.avatar_url,
            "joinDate": user.created_at.isoformat(),
            "last_login": user.last_login.isoformat() if user.last_login else None,
            "assessments": []  # Will be populated separately if needed
        }


# Global instance
auth_service = AuthService()
