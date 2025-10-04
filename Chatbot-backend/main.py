from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend (React, etc.) to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change this to your frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class ChatMessage(BaseModel):
    message: str

# Simple in-memory context store (optional)
# In real apps, you might use session IDs or a database
chat_context = {}

@app.post("/chat")
async def chat_endpoint(chat: ChatMessage, request: Request):
    user_message = chat.message.strip().lower()

    # Basic chatbot logic
    if user_message in ["hi", "hello"]:
        response = "Hey there! How can I help you today?"
    elif "how are you" in user_message:
        response = "I'm doing great, thanks for asking! How about you?"
    elif "bye" in user_message:
        response = "Goodbye! Have a wonderful day!"
    else:
        response = "I'm not sure how to respond to that yet."

    return {"response": response}
