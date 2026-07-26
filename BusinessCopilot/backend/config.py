import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "BusinessCopilot API"

    # Render sets DATABASE_URL automatically when you add a PostgreSQL service.
    # Locally it falls back to SQLite.
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./business_copilot.db"
    )

    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

    class Config:
        env_file = ".env"


settings = Settings()
