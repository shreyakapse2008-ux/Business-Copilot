from pypdf import PdfReader


def extract_text(file_path):

    text = ""

    reader = PdfReader(file_path)

    for page in reader.pages:
        text += page.extract_text() or ""

    return text



def generate_summary(text):

    # Temporary AI summary
    # नंतर OpenAI/Groq जोडू

    return {
        "summary": "Meeting document analyzed successfully.",
        "key_points": [
            "Important business decisions extracted",
            "Meeting topics identified",
            "Action items generated"
        ]
    }