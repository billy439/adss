from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os

# Set OpenAI API key (for demo purposes; use environment variable in production)
openai.api_key = "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"

# Create FastAPI app
app = FastAPI(title="ADSS Chatbot API", description="Ask agricultural questions", version="1.0")

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request schema
class Question(BaseModel):
    question: str

# API endpoint to handle incoming questions
@app.post("/api/ask")
async def ask_question(payload: Question):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": payload.question}]
        )
        answer = response.choices[0].message["content"].strip()
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

# Run the application locally
if __name__ == "__main__":
    import uvicorn
    print("API is running at: http://127.0.0.1:8000/docs")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
