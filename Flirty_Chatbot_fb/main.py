import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from groq import Groq  # Directly importing Groq
import firebase_admin
from firebase_admin import credentials, firestore
from fastapi.middleware.cors import CORSMiddleware
import markdown

# Initialize Firebase
try:
    cred = credentials.Certificate('FCB.json')  # Path to your Firebase service account JSON
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("Firebase connection established successfully.")
except Exception as e:
    print(f"Failed to connect to Firebase: {e}")
    db = None

# Initialize FastAPI app
app = FastAPI(
    title="Intelligent Conversational Assistant",
    description="A conversational AI service using Groq"        
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq Client Configuration
client = Groq(
    api_key="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"  # Ensure you set this in your .env file
)

# Request Model
class ChatRequest(BaseModel):
    message: str
    user_id: str

# Response Model
class ChatResponse(BaseModel):
    response: str

def chat_ai(prompt):
    """
    Generate a chat response using Groq's Llama3 model
    
    Args:
        prompt (str): User's input message
    
    Returns:
        str: AI-generated response
    """
    try:
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "system", 
                    "content": "You are very friendly and very intelligent on caring about user's mental healthcare concisely as if texting. Always try to keep the coversation engaging."
                },
                {"role": "user", "content": prompt}
            ],
            model="llama3-70b-8192",
            temperature=0.7,
            max_tokens=5000,
            top_p=1.0,
            stream=False
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error during Groq API call: {e}")
        return "Oops! Something went wrong. Mind trying again?"

@app.post("/chat", response_model=ChatResponse)
async def generate_response(request: ChatRequest):
    try:
        if not db:
            raise HTTPException(status_code=500, detail="Firebase connection not established.")

        # Store conversation history in Firestore
        conversation_ref = db.collection('conversations').document(request.user_id)
        
        response_text_raw = chat_ai(request.message)
        response_text = markdown.markdown(response_text_raw)
        response_text = response_text.replace('<','<br><').replace('<code>',"<code class='code-editor'>")
                
        # Save conversation to Firebase
        conversation_ref.collection('messages').add({
            'user_message': request.message,
            'ai_response': response_text,
            'timestamp': firestore.SERVER_TIMESTAMP
        })
        
        return {"response": response_text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history/{user_id}")
async def get_conversation_history(user_id: str):
    try:
        if not db:
            raise HTTPException(status_code=500, detail="Firebase connection not established.")

        conversation_ref = db.collection('conversations').document(user_id)
        messages = conversation_ref.collection('messages').order_by('timestamp').stream()
        
        history = [msg.to_dict() for msg in messages]
        return {"history": history}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Test Firebase connection
@app.get("/test-firebase")
async def test_firebase():
    try:
        if not db:
            raise HTTPException(status_code=500, detail="Firebase connection not established.")
        
        # Replace 'test_collection' with an actual Firestore collection name
        test_collection = db.collection('test_collection').stream()
        documents = [doc.to_dict() for doc in test_collection]
        return {"status": "success", "data": documents}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Requirements for this project
# requirements.txt content:
# fastapi
# uvicorn
# python-dotenv
# groq
# firebase-admin
# python-multipart

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)