from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.meeting import Meeting
from models.user import User

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/dashboard")
def dashboard_report(db: Session = Depends(get_db)):
    total_meetings = db.query(Meeting).count()
    total_users = db.query(User).count()

    recent_meetings = (
        db.query(Meeting)
        .order_by(Meeting.created_at.desc())
        .limit(5)
        .all()
    )

    return {
        "documents": 0,
        "meetings": total_meetings,
        "action_items": 0,
        "ai_queries": 0,
        "users": total_users,
        "recent_meetings": [
            {
                "id": m.id,
                "title": m.title,
                "created_at": str(m.created_at),
            }
            for m in recent_meetings
        ],
    }
