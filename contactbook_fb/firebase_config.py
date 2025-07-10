import firebase_admin
from firebase_admin import credentials, firestore

# Path to your Firebase service account key JSON file
SERVICE_ACCOUNT_KEY_PATH = "CB.json"

# Initialize the Firebase app
if not firebase_admin._apps:
    cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
    firebase_admin.initialize_app(cred)

# Firestore Database instance
db = firestore.client()
