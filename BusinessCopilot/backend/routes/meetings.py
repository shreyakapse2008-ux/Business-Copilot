from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models.meeting import Meeting

router = APIRouter(
    prefix="/meetings",
    tags=["Meetings"]
)


class MeetingCreate(BaseModel):
    title: str
    description: str = ""
    user_id: int = 1  # later replace with JWT user


@router.post("/create")
def create_meeting(data: MeetingCreate, db: Session = Depends(get_db)):
    meeting = Meeting(
        title=data.title,
        description=data.description,
        user_id=data.user_id,
    )
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return {
        "message": "Meeting created successfully",
        "meeting": {
            "id": meeting.id,
            "title": meeting.title,
            "description": meeting.description,
            "created_at": str(meeting.created_at),
        },
    }


@router.get("/")
def get_meetings(db: Session = Depends(get_db)):
    meetings = db.query(Meeting).order_by(Meeting.created_at.desc()).all()
    return {
        "meetings": [
            {
                "id": m.id,
                "title": m.title,
                "description": m.description,
                "created_at": str(m.created_at),
            }
            for m in meetings
        ]
    }


@router.delete("/{meeting_id}")
def delete_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    db.delete(meeting)
    db.commit()
    return {"message": "Meeting deleted successfully"}
