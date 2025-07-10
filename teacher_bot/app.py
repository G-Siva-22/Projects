from flask import Flask, render_template, request, jsonify, send_file
from groq import Groq
from gtts import gTTS
import uuid
import os

app = Flask(__name__)
client = Groq(api_key="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")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ask_teacher', methods=['POST'])
def ask_teacher():
    user_input = request.json['question']

    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "user", "content": user_input}
        ],
        model="llama3-8b-8192",
    )

    response = chat_completion.choices[0].message.content
    limited_response = ' '.join(response.split()[:50])

    tts = gTTS(text=limited_response)
    audio_filename = f"static/audio_{uuid.uuid4()}.mp3"
    tts.save(audio_filename)

    return jsonify({'response': limited_response, 'audio': audio_filename})

@app.route('/play_audio/<filename>')
def play_audio(filename):
    return send_file(f"static/{filename}", as_attachment=False)

if __name__ == '__main__':
    app.run(debug=True)
