from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from datetime import datetime
from typing import Optional, List
from dataclasses import dataclass
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # In production, use environment variable

# Setup rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# ----- Data Models -----

@dataclass
class Student:
    student_id: str
    name: str
    email: str

@dataclass
class Exam:
    exam_id: str
    exam_name: str
    date: str
    capacity: int = 50
    registered_count: int = 0

@dataclass
class Registration:
    student: Student
    exam: Exam
    registered_date: datetime = datetime.now()
    status: str = "confirmed"

# ----- Sample Data Initialization -----

students: List[Student] = [
    Student("S101", "Alice Johnson", "alice@example.com"),
    Student("S102", "Bob Smith", "bob@example.com"),
    Student("S103", "Charlie Davis", "charlie@example.com")
]

exams: List[Exam] = [
    Exam("E201", "Mathematics", "2025-06-15"),
    Exam("E202", "Physics", "2025-06-20"),
    Exam("E203", "Chemistry", "2025-06-25")
]

registrations: List[Registration] = []

# ----- Helper Functions -----

def get_student_by_id(student_id: str) -> Optional[Student]:
    return next((s for s in students if s.student_id == student_id), None)

def get_exam_by_id(exam_id: str) -> Optional[Exam]:
    return next((e for e in exams if e.exam_id == exam_id), None)

def is_already_registered(student_id: str, exam_id: str) -> bool:
    return any(
        reg.student.student_id == student_id and reg.exam.exam_id == exam_id
        for reg in registrations
    )

def is_exam_full(exam: Exam) -> bool:
    return exam.registered_count >= exam.capacity

# ----- Routes -----

@app.route('/')
def index():
    exam_stats = {
        'total_students': len(students),
        'total_exams': len(exams),
        'total_registrations': len(registrations)
    }
    return render_template('index.html', students=students, exams=exams, registrations=registrations, stats=exam_stats)

@app.route('/students')
def view_students():
    return render_template('students.html', students=students, registrations=registrations)

@app.route('/exams')
def view_exams():
    return render_template('exams.html', exams=exams, registrations=registrations)

@app.route('/register', methods=['GET', 'POST'])
@limiter.limit("10 per minute")  # Rate limit registration attempts
def register():
    if request.method == 'POST':
        student_id = request.form.get('student_id')
        exam_id = request.form.get('exam_id')

        student = get_student_by_id(student_id)
        exam = get_exam_by_id(exam_id)

        if not student or not exam:
            flash('Invalid student or exam ID.', 'error')
        elif is_already_registered(student_id, exam_id):
            flash('Student is already registered for this exam.', 'warning')
        elif is_exam_full(exam):
            flash('This exam has reached its maximum capacity.', 'error')
        else:
            registration = Registration(student, exam)
            registrations.append(registration)
            exam.registered_count += 1
            flash(f'Successfully registered {student.name} for {exam.exam_name}.', 'success')

        return redirect(url_for('register'))

    return render_template('register.html', students=students, exams=exams)

@app.route('/registrations')
def view_registrations():
    return render_template('registrations.html', registrations=registrations)

@app.route('/api/exam-capacity/<exam_id>')
def get_exam_capacity(exam_id):
    exam = get_exam_by_id(exam_id)
    if not exam:
        return jsonify({'error': 'Exam not found'}), 404
    
    return jsonify({
        'capacity': exam.capacity,
        'registered': exam.registered_count,
        'available': exam.capacity - exam.registered_count
    })

# ----- Error Handlers -----

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(429)
def ratelimit_handler(e):
    flash("Too many requests. Please try again later.", "error")
    return redirect(url_for('index'))

# ----- Main -----

if __name__ == '__main__':
    app.run(debug=True)