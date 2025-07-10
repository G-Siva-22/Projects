# import os
# import requests
# import speech_recognition as sr
# from flask import Flask, request, jsonify, render_template, send_file, Blueprint
# from gtts import gTTS
# import logging
# import time
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# logging.basicConfig(level=logging.DEBUG)
# voice_bp = Blueprint('voice', __name__, template_folder='templates')

# # GROQ API configuration
# GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
# GROQ_API_KEY = os.environ.get("GROQ_API_KEY")  # Corrected from hardcoded name

# AUDIO_DIR = "static/audio"
# os.makedirs(AUDIO_DIR, exist_ok=True)

# def speech_to_text():
#     recognizer = sr.Recognizer()
#     if sr.Microphone.list_microphone_names():
#         with sr.Microphone() as source:
#             logging.info("Adjusting for ambient noise...")
#             recognizer.adjust_for_ambient_noise(source, duration=1)
#             logging.info("Listening...")
#             try:
#                 audio = recognizer.listen(source, timeout=10, phrase_time_limit=10)
#                 text = recognizer.recognize_google(audio)
#                 logging.info(f"Recognized text: {text}")
#                 return text
#             except sr.UnknownValueError:
#                 logging.warning("Could not understand audio")
#                 return "Sorry, I could not understand the audio."
#             except sr.RequestError as e:
#                 logging.error(f"Speech recognition error: {str(e)}")
#                 return "Sorry, there was an error with the speech recognition service."
#     else:
#         logging.error("No default input device available")
#         return "Error: No default input device available. Please connect a microphone."

# # def get_groq_response(text):
# #     if not GROQ_API_KEY:
# #         logging.error("GROQ API key is not set")
# #         return "Error: GROQ API key is not set. Please set the GROQ_API_KEY environment variable."

# #     headers = {
# #         "Authorization": f"Bearer {GROQ_API_KEY}",
# #         "Content-Type": "application/json"
# #     }
# #     payload = {
# #         "model": "llama3-70b-8192",
# #         "messages": [
# #             {"role": "system", "content": "You are a helpful AI assistant. Respond to the user's input in a friendly and informative manner."},
# #             {"role": "user", "content": text}
# #         ],
# #         "temperature": 0.7,
# #         "max_tokens": 800
# #     }

# #     try:
# #         response = requests.post(GROQ_API_URL, json=payload, headers=headers, timeout=30)
# #         response.raise_for_status()
# #         groq_response = response.json()["choices"][0]["message"]["content"]
# #         logging.info("GROQ API response received successfully")
# #         return groq_response
# #     except requests.RequestException as e:
# #         logging.error(f"API error: {e}, Response content: {getattr(e.response, 'content', 'No response')}")
# #         return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Can you try again later?"def get_gemini_response(text):
#     if not GOOGLE_API_KEY:
#         logging.error("Google API key is not set")
#         return "Error: Google API key is not set. Please set the GOOGLE_API_KEY environment variable."

#     try:
#         model = genai.GenerativeModel('gemini-pro')
#         response = model.generate_content(text)
#         logging.info("Gemini API response received successfully")
#         return response.text
#     except Exception as e:
#         logging.error(f"Gemini API error: {str(e)}")
#         return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Can you try again later?"


# def text_to_speech(text):
#     try:
#         tts = gTTS(text=text, lang='en')
#         timestamp = int(time.time())
#         output_file = os.path.join(AUDIO_DIR, f'response_{timestamp}.mp3')
#         tts.save(output_file)
#         logging.info(f"Audio saved to {output_file}")
#         return output_file
#     except Exception as e:
#         logging.error(f"Text-to-speech error: {str(e)}")
#         return None

# @voice_bp.route('/voice')
# def voice():
#     return render_template('voice.html')

# @voice_bp.route('/voice/voice1', methods=['POST'])
# def voice1():
#     try:
#         user_input = speech_to_text()
#         logging.info(f"User said: {user_input}")

#         if user_input.lower() in [
#             "sorry, i could not understand the audio.",
#             "sorry, there was an error with the speech recognition service.",
#             "error: no default input device available. please connect a microphone."
#         ]:
#             response_text = "I'm having trouble understanding you. Could you please try speaking again?"
#         else:
#             response_text = get_groq_response(user_input)

#         audio_file = text_to_speech(response_text)
#         audio_url = f'/audio/{os.path.basename(audio_file)}' if audio_file else None

#         return jsonify({
#             'text': response_text,
#             'audio_url': audio_url
#         })

#     except Exception as e:
#         logging.error(f"Unexpected error in voice1 endpoint: {str(e)}")
#         return jsonify({
#             'text': "Sorry, an unexpected error occurred. Please try again.",
#             'audio_url': None
#         }), 500

# @voice_bp.route('/audio/<filename>')
# def serve_audio(filename):
#     try:
#         filepath = os.path.join(AUDIO_DIR, filename)
#         if os.path.exists(filepath):
#             logging.info(f"Serving audio file: {filename}")
#             return send_file(filepath, mimetype='audio/mpeg')
#         else:
#             logging.error(f"Audio file not found: {filename}")
#             return "Audio file not found", 404
#     except Exception as e:
#         logging.error(f"Error serving audio file: {str(e)}")
#         return "Error serving audio file", 500
import os
import time
import logging
import speech_recognition as sr
from flask import Blueprint, render_template, jsonify, send_file
from gtts import gTTS
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Blueprint setup
voice_bp = Blueprint('voice', __name__, template_folder='templates')

# Gemini API configuration
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Audio output directory
AUDIO_DIR = "static/audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

# Speech to Text
def speech_to_text():
    recognizer = sr.Recognizer()
    if sr.Microphone.list_microphone_names():
        with sr.Microphone() as source:
            logging.info("Adjusting for ambient noise...")
            recognizer.adjust_for_ambient_noise(source, duration=1)
            logging.info("Listening...")
            try:
                audio = recognizer.listen(source, timeout=10, phrase_time_limit=10)
                text = recognizer.recognize_google(audio)
                logging.info(f"Recognized text: {text}")
                return text
            except sr.UnknownValueError:
                logging.warning("Could not understand audio")
                return "Sorry, I could not understand the audio."
            except sr.RequestError as e:
                logging.error(f"Speech recognition error: {str(e)}")
                return "Sorry, there was an error with the speech recognition service."
    else:
        logging.error("No default input device available")
        return "Error: No default input device available. Please connect a microphone."

# Gemini AI response
def get_gemini_response(text):
    if not GOOGLE_API_KEY:
        logging.error("Google API key is not set")
        return "Error: Google API key is not set. Please set the GOOGLE_API_KEY environment variable."

    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(text)
        logging.info("Gemini API response received successfully")
        return response.text
    except Exception as e:
        logging.error(f"Gemini API error: {str(e)}")
        return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Can you try again later."

# Text to Speech
def text_to_speech(text):
    try:
        tts = gTTS(text=text, lang='en')
        timestamp = int(time.time())
        output_file = os.path.join(AUDIO_DIR, f'response_{timestamp}.mp3')
        tts.save(output_file)
        logging.info(f"Audio saved to {output_file}")
        return output_file
    except Exception as e:
        logging.error(f"Text-to-speech error: {str(e)}")
        return None

# Route: Voice Input Page
@voice_bp.route('/voice')
def voice():
    return render_template('voice.html')

# Route: Handle Voice Request
@voice_bp.route('/voice/voice1', methods=['POST'])
def voice1():
    try:
        user_input = speech_to_text()
        logging.info(f"User said: {user_input}")

        if user_input.lower() in [
            "sorry, i could not understand the audio.",
            "sorry, there was an error with the speech recognition service.",
            "error: no default input device available. please connect a microphone."
        ]:
            response_text = "I'm having trouble understanding you. Could you please try speaking again?"
        else:
            response_text = get_gemini_response(user_input)

        audio_file = text_to_speech(response_text)
        audio_url = f'/audio/{os.path.basename(audio_file)}' if audio_file else None

        return jsonify({
            'text': response_text,
            'audio_url': audio_url
        })

    except Exception as e:
        logging.error(f"Unexpected error in voice1 endpoint: {str(e)}")
        return jsonify({
            'text': "Sorry, an unexpected error occurred. Please try again.",
            'audio_url': None
        }), 500

# Route: Serve Audio
@voice_bp.route('/audio/<filename>')
def serve_audio(filename):
    try:
        filepath = os.path.join(AUDIO_DIR, filename)
        if os.path.exists(filepath):
            logging.info(f"Serving audio file: {filename}")
            return send_file(filepath, mimetype='audio/mpeg')
        else:
            logging.error(f"Audio file not found: {filename}")
            return "Audio file not found", 404
    except Exception as e:
        logging.error(f"Error serving audio file: {str(e)}")
        return "Error serving audio file", 500
