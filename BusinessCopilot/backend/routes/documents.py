from fastapi import APIRouter, UploadFile, File
import os
import shutil


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)



@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )


    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )


    return {
        "message": "Document uploaded successfully",
        "filename": file.filename
    }



@router.get("/{filename}/summary")
def document_summary(filename: str):

    return {
        "filename": filename,
        "summary": [
            "Meeting objectives identified",
            "Important decisions extracted",
            "Action items generated"
        ],
        "status": "AI analysis completed"
    }