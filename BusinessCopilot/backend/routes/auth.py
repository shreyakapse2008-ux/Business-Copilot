from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
import bcrypt
from jose import jwt
from datetime import datetime, timedelta

from database import get_db
from models.user import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# JWT config
SECRET_KEY = "businesscopilot-secret-key-2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours


# --- Schemas ---

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    company: str = ""


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# --- Helpers ---

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_token(user_id: int, email: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "email": email, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


# --- Routes ---

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=data.name,
        email=data.email,
        company=data.company,
        hashed_password=hash_password(data.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_token(user.id, user.email)
    return {
        "message": "Registration successful",
        "token": token,
        "user": {"id": user.id, "name": user.name, "email": user.email, "company": user.company},
    }


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token(user.id, user.email)
    return {
        "message": "Login successful",
        "token": token,
        "user": {"id": user.id, "name": user.name, "email": user.email, "company": user.company},
    }
