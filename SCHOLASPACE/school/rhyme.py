from flask import Flask, render_template, request, jsonify, send_file,Blueprint
from groq import Groq
from gtts import gTTS
import os
import uuid


rhyme_bp = Blueprint('rhyme', __name__ , template_folder='templates')

client = Groq(api_key="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")



@rhyme_bp.route('/chat1', methods=['POST'])
def chat1():
    user_input = request.form['user_input']
    
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": user_input,
            }
        ],
        model="llama3-8b-8192",
    )
    
    response = chat_completion.choices[0].message.content
    limited_response = ' '.join(response.split()[:50])  # Limit response to 50 words
    
    # Convert text to speech using gTTS
    tts = gTTS(limited_response)
    audio_filename = f"audio_{uuid.uuid4()}.mp3"
    tts.save(audio_filename)
    
    return jsonify({'response': limited_response, 'audio': audio_filename})

@rhyme_bp.route('/play_audio/<filename>')
def play_audio(filename):
    return send_file(filename, as_attachment=False)


