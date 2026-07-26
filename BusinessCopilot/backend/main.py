import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import engine, Base

# Import models so SQLAlchemy creates tables
import models.user
import models.meeting

from routes import auth, documents, meetings, reports, ai

# Create all tables in DB
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# CORS
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]

# Add Vercel frontend URL from environment variable if set
FRONTEND_URL = os.getenv("FRONTEND_URL", "")
if FRONTEND_URL:
    ALLOWED_ORIGINS.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router)
app.include_router(documents.router)
app.include_router(meetings.router)
app.include_router(reports.router)
app.include_router(ai.router)


@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}!"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
