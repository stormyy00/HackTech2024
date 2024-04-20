from flask import Flask, request, send_from_directory, abort, jsonify
import os
from werkzeug.utils import secure_filename
from transcribe import *
# from NRC_analyze import *
from ChatGPT import *
import json
from firebase import *

app = Flask(__name__)
base_url = "http://apt.howard-zhu.com/files/"
UPLOAD_FOLDER = 'upload'
AUDIO_EXTENTIONS = {'mp3', 'wav'}
IMAGE_EXTENSIONS = {"png", "jpg", "jpeg"}
# ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp3', 'wav'}
ALLOWED_EXTENSIONS = AUDIO_EXTENTIONS | IMAGE_EXTENSIONS

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024  # 32MB Max Upload

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    # Get the custom header 'Username' from the request
    username = request.headers.get('Username')
    
    # Check if the username header is present
    if not username:
        return jsonify({"error": "Username header is missing"}), 400

    # Check if a file is part of the request
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    
    # Check if the file has a filename
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Check if the file is of an allowed type
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        # Create a directory for the username if it doesn't exist
        user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
        if not os.path.exists(user_dir):
            os.makedirs(user_dir)

        # Save the file in the user's directory
        file_path = os.path.join(user_dir, filename)
        file.save(file_path)
        file_path = os.path.join(os.getcwd(), file_path)
        raw_path = file_path[:-4:]
        if '.' in filename and filename.rsplit('.', 1)[1].lower() in AUDIO_EXTENTIONS:
            text_path = raw_path + ".txt"
            f = open(text_path, "w")
            text_data = transcribe(file_path)
            f.write(text_data)
            f.close()
            emotions = text_prompt(text_data)
            with open(raw_path + "_text" + ".json", "w") as outfile:
                json.dump(emotions, outfile)
            upload_text_analysis(username, text_data, emotions)
        elif '.' in filename and filename.rsplit('.', 1)[1].lower() in IMAGE_EXTENSIONS:
            # emotions = image_prompt()
            image_url = base_url + username + "/" + filename
            emotions = image_prompt(image_url)
            with open(raw_path + "_image" + ".json", "w") as outfile:
                json.dump(emotions, outfile)
            upload_image_analysis(username, image_url, emotions)
        print(f"File {filename} uploaded to {user_dir} by user: {username}")
        return jsonify({"message": f"File {filename} uploaded successfully to {username}'s directory."})
    
    # If the file type is not allowed, return an error
    return jsonify({"error": "Invalid file type"}), 400


@app.route('/files/<username>/<filename>', methods=['GET'])
def download_file(username, filename):
    # Create the file path within the user's directory
    user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
    file_path = os.path.join(user_dir, filename)

    # Check if the file exists in the user's directory
    print(file_path)
    if os.path.exists(file_path):
        return send_from_directory(user_dir, filename)
    else:
        return jsonify({"error": f"File '{filename}' not found in {username}'s directory."}), 404


@app.route('/files')
def list_files():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return '\n'.join(files)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.run(debug=True)