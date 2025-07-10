from flask import Flask, render_template, request, redirect, send_from_directory, jsonify
import json, os
from datetime import datetime
from werkzeug.utils import secure_filename
from groq import Groq
from gtts import gTTS
import uuid

# Flask app configuration
app = Flask(__name__)

# Upload folder and size limit configuration for task file uploads
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max

# File to store task data
TASK_FILE = 'tasks.json'

# Groq API client for teacher bot
client = Groq(api_key="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")

# Utility functions for managing tasks
def load_tasks():
    try:
        with open(TASK_FILE, 'r') as f:
            return json.load(f)
    except:
        return []

def save_tasks(tasks):
    with open(TASK_FILE, 'w') as f:
        json.dump(tasks, f, indent=4)

# Routes for task management
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/teacher')
def teacher_portal():
    return render_template('teacher.html')

@app.route('/add', methods=['GET', 'POST'])
def add_task():
    if request.method == 'POST':
        task = {
            'title': request.form['title'],
            'description': request.form['description'],
            'due_date': request.form['due_date'],
            'created_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            'status': 'Pending',
            'submission': None
        }
        tasks = load_tasks()
        tasks.append(task)
        save_tasks(tasks)
        return redirect('/view')
    return render_template('add_task.html')

@app.route('/view')
def view_tasks():
    tasks = load_tasks()
    return render_template('view_tasks.html', tasks=tasks)

@app.route('/progress')
def view_progress():
    tasks = load_tasks()
    return render_template('view_progress.html', tasks=tasks)

@app.route('/student', methods=['GET', 'POST'])
def student_portal():
    tasks = load_tasks()
    if request.method == 'POST':
        title = request.form['task_title']
        file = request.files['file']
        if file and file.filename.endswith('.pdf'):
            filename = secure_filename(file.filename)
            path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(path)

            for task in tasks:
                if task['title'] == title:
                    task['status'] = 'Completed'
                    task['submission'] = filename
                    break
            save_tasks(tasks)
            return redirect('/student')
    return render_template('student.html', tasks=tasks)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Routes for teacher bot interaction
@app.route('/teacher-bot')
def teacher_bot_home():
    return render_template('teacher_bot.html')

@app.route('/ask_teacher', methods=['POST'])
def ask_teacher():
    user_input = request.json['question']

    # Query the teacher bot API
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": user_input}],
        model="llama3-8b-8192",
    )

    # Get the response and limit the word count
    response = chat_completion.choices[0].message.content
    limited_response = ' '.join(response.split()[:50])

    # Convert the response to speech
    tts = gTTS(text=limited_response)
    audio_filename = f"static/audio_{uuid.uuid4()}.mp3"
    tts.save(audio_filename)

    return jsonify({'response': limited_response, 'audio': audio_filename})

@app.route('/play_audio/<filename>')
def play_audio(filename):
    return send_from_directory('static', filename)

# Ensure the uploads folder exists
if not os.path.exists('uploads'):
    os.makedirs('uploads')

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
