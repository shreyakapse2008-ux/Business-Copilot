from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


class ChatRequest(BaseModel):
    message: str


# Simple keyword-based responses (no API key needed to run)
RESPONSES = {
    "meeting": "Meetings are scheduled events where teams discuss business topics. I can help you create summaries and action items.",
    "document": "I can analyze uploaded documents and extract key points, decisions, and action items automatically.",
    "report": "Reports provide insights into your business activities, meetings held, documents processed, and AI queries made.",
    "summary": "I generate summaries from your meeting documents to highlight key decisions and action items.",
    "action": "Action items are tasks extracted from meetings. You can track them in the Reports section.",
    "hello": "Hello! I am BusinessCopilot AI. How can I assist you with your business meetings today?",
    "hi": "Hi there! I am your AI business assistant. Ask me anything about your meetings or documents.",
    "help": "I can help you with: summarizing documents, creating meeting notes, generating reports, and answering business questions.",
}


def get_ai_response(message: str) -> str:
    msg_lower = message.lower()
    for keyword, response in RESPONSES.items():
        if keyword in msg_lower:
            return response
    return (
        f"You asked: '{message}'. "
        "I am here to help with your business meetings and documents. "
        "Try asking about meetings, documents, reports, or summaries."
    )


@router.post("/chat")
def ai_chat(data: ChatRequest):
    if not data.message.strip():
        return {"question": "", "answer": "Please enter a message."}

    answer = get_ai_response(data.message)
    return {
        "question": data.message,
        "answer": answer,
    }


@router.post("/summary")
def generate_summary():
    return {
        "summary": "Meeting summary generated successfully.",
        "key_points": [
            "Key business decisions were made",
            "Action items have been assigned",
            "Follow-up meeting scheduled",
        ],
    }
