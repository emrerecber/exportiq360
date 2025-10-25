"""
Database configuration and session management
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Database URL
# For PostgreSQL: postgresql://user:password@host:port/database
# For SQLite (development): sqlite:///./exportiq.db
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "sqlite:///./exportiq.db"  # Fallback to SQLite for development
)

# SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    pool_pre_ping=True,  # Verify connections before using
    pool_size=10,  # Connection pool size
    max_overflow=20  # Max connections beyond pool_size
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency for FastAPI
def get_db():
    """
    Database session dependency for FastAPI endpoints
    
    Usage:
        @app.get("/users")
        def get_users(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Initialize database
def init_db():
    """Create all tables"""
    Base.metadata.create_all(bind=engine)

# Drop all tables (careful!)
def drop_db():
    """Drop all tables - use with caution!"""
    Base.metadata.drop_all(bind=engine)
