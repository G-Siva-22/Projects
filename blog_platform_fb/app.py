from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime
import os
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate("codsoft.json")  # Replace with your Firebase Admin SDK path
firebase_admin.initialize_app(cred)

# Initialize app and login manager
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a strong secret key
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

db = firestore.client()
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# User Model
class User(UserMixin):
    def __init__(self, id, username, password, email):
        self.id = id
        self.username = username
        self.password = password
        self.email = email

    @staticmethod
    def get_by_id(user_id):
        user_ref = db.collection('users').document(user_id)
        user = user_ref.get()
        if user.exists:
            user_data = user.to_dict()
            return User(id=user.id, **user_data)
        return None

    @staticmethod
    def get_by_username(username):
        user_ref = db.collection('users').where('username', '==', username).stream()
        for user in user_ref:
            user_data = user.to_dict()
            return User(id=user.id, **user_data)
        return None

    @staticmethod
    def create_user(username, password, email):
        user_ref = db.collection('users').document()
        user_ref.set({
            'username': username,
            'password': generate_password_hash(password, method='pbkdf2:sha256'),
            'email': email
        })
        return User(id=user_ref.id, username=username, password=password, email=email)

# Blog Model
class Blog:
    def __init__(self, id, title, content, date_posted, user_id, image_file=None, mood=None):
        self.id = id
        self.title = title
        self.content = content
        self.date_posted = date_posted
        self.user_id = user_id
        self.image_file = image_file
        self.mood = mood  # Added mood as an attribute
        self.comments = []

    @staticmethod
    def get_all():
        blogs_ref = db.collection('blogs')
        blogs = blogs_ref.stream()
        return [Blog(id=blog.id, **blog.to_dict()) for blog in blogs]

    @staticmethod
    def get_by_id(blog_id):
        blog_ref = db.collection('blogs').document(blog_id)
        blog_data = blog_ref.get()
        if blog_data.exists:
            return Blog(id=blog_data.id, **blog_data.to_dict())
        return None

    @staticmethod
    def create_blog(title, content, user_id, image_file=None, mood=None):
        blog_ref = db.collection('blogs').document()
        blog_ref.set({
            'title': title,
            'content': content,
            'date_posted': firestore.SERVER_TIMESTAMP,  # Automatically set the timestamp
            'user_id': user_id,
            'image_file': image_file,
            'mood': mood  # Save mood to Firestore
        })
        return Blog(id=blog_ref.id, title=title, content=content, user_id=user_id, image_file=image_file, mood=mood, date_posted=None)

# Comment Model
class Comment:
    def __init__(self, id, content, date_commented, blog_id, user_id):
        self.id = id
        self.content = content
        self.date_commented = date_commented
        self.blog_id = blog_id
        self.user_id = user_id

    @staticmethod
    def create_comment(content, blog_id, user_id):
        comment_ref = db.collection('comments').document()
        comment_ref.set({
            'content': content,
            'date_commented': firestore.SERVER_TIMESTAMP,  # Automatically set the timestamp
            'blog_id': blog_id,
            'user_id': user_id
        })
        return Comment(id=comment_ref.id, content=content, blog_id=blog_id, user_id=user_id, date_commented=None)

# Like Model
class Like:
    def __init__(self, id, blog_id, user_id):
        self.id = id
        self.blog_id = blog_id
        self.user_id = user_id

    @staticmethod
    def toggle_like(blog_id, user_id):
        like_ref = db.collection('likes').where('blog_id', '==', blog_id).where('user_id', '==', user_id).stream()
        existing_like = None
        for like in like_ref:
            existing_like = like
            break
        
        if existing_like:
            # Remove the like
            db.collection('likes').document(existing_like.id).delete()
            return None
        else:
            # Add a new like
            like_ref = db.collection('likes').document()
            like_ref.set({
                'blog_id': blog_id,
                'user_id': user_id
            })
            return Like(id=like_ref.id, blog_id=blog_id, user_id=user_id)

# Load User for LoginManager
@login_manager.user_loader
def load_user(user_id):
    return User.get_by_id(user_id)

# Function to check if file is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Routes
@app.route('/')
def home():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))  
    blogs = Blog.get_all()
    return render_template('home.html', blogs=blogs)

@app.route('/blog/<blog_id>', methods=['GET', 'POST'])
@login_required
def blog_detail(blog_id):
    blog = Blog.get_by_id(blog_id)
    if request.method == 'POST' and 'comment' in request.form:
        comment_content = request.form.get('comment')
        Comment.create_comment(comment_content, blog_id, current_user.id)

    if request.method == 'POST' and 'like' in request.form:
        Like.toggle_like(blog_id, current_user.id)

    # Fetch comments and pass them to the template
    comments_ref = db.collection('comments').where('blog_id', '==', blog_id).stream()
    comments = []
    for comment in comments_ref:
        comment_data = comment.to_dict()
        # Fetch user details for each comment
        user = User.get_by_id(comment_data['user_id'])
        comment_data['user'] = user  # Attach user info to the comment
        comments.append(comment_data)
    
    blog.comments = comments  # Add the list of comments to the blog object
    return render_template('blog_detail.html', blog=blog)

@app.route('/create_blog', methods=['GET', 'POST'])
@login_required
def create_blog():
    if request.method == 'POST':
        title = request.form.get('title')
        content = request.form.get('content')
        image = request.files.get('image')
        mood = request.form.get('mood')  # Get mood from form

        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            image_filename = filename
        else:
            image_filename = None

        # Creating blog with Firestore's SERVER_TIMESTAMP
        Blog.create_blog(title, content, current_user.id, image_filename, mood)
        flash('Blog created successfully!', category='success')
        return redirect(url_for('home'))

    return render_template('create_blog.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        email = request.form.get('email')

        user = User.get_by_username(username)
        if user:
            flash('Username already exists!', category='error')
            return redirect(url_for('register'))

        new_user = User.create_user(username, password, email)
        flash('Account created successfully! Please log in to continue.', category='success')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.get_by_username(username)

        if user and check_password_hash(user.password, password):
            login_user(user)
            flash('Logged in successfully!', category='success')
            return redirect(url_for('home'))
        else:
            flash('Login unsuccessful. Please check your username and password.', category='error')

    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully!', category='success')
    return redirect(url_for('login'))

# Ensure app context is active for Firestore
if __name__ == '__main__':
    app.run(debug=True)
