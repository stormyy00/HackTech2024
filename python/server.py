from flask import Flask, request, send_from_directory, abort, jsonify
import os
from werkzeug.utils import secure_filename
from transcribe import *
# from NRC_analyze import *
from ChatGPT import *
import json
from firebase import *
from flask_cors import CORS
from ffmpeg import *

app = Flask(__name__)
CORS(app)
base_url = "http://apt.howard-zhu.com/files/"
UPLOAD_FOLDER = 'upload'
AUDIO_EXTENTIONS = {'mp3', 'wav', 'm4a'}
IMAGE_EXTENSIONS = {"png", "jpg", "jpeg"}
TEXT_EXTENSIONS = {"txt"}
# ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp3', 'wav'}
ALLOWED_EXTENSIONS = AUDIO_EXTENTIONS | IMAGE_EXTENSIONS | TEXT_EXTENSIONS

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024  # 32MB Max Upload

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    # Get the custom header 'Username' from the request
    debug = True
    if debug:
        request_info = {
        'url': request.url,
        'base_url': request.base_url,
        'url_root': request.url_root,
        'args': request.args.to_dict(),
        'form_data': request.form.to_dict(),
        'headers': dict(request.headers),
        'cookies': request.cookies,
        'data': request.data,
        'files': list(request.files.keys()),
        'remote_addr': request.remote_addr,
        'environ': {key: str(value) for key, value in request.environ.items()}
        }
        # Pretty print to the console
        for item in request_info:
            print(item, request_info[item])
        # print(request_info)
        print("Beginning Upload!")
        print("Headers:")
        for header in request.headers:
            print(f"{header[0]}: {header[1]}")

    username = request.headers.get('Username')
    
    # Check if the username header is present
    if not username:
        if debug:
            print("error 1")
        return jsonify({"error": "Username header is missing"}), 400

    # Check if a file is part of the request
    print("this is request.files: ", request.files)
    if 'file' not in request.files:
        if debug:
            print("error 2")
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    
    # Check if the file has a filename
    if file.filename == '':
        if debug:
            print("error 3")
        return jsonify({"error": "No file selected"}), 400
    print("This is the file: ", file.filename)
    # Check if the file is of an allowed type
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        # Create a directory for the username if it doesn't exist
        user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
        if not os.path.exists(user_dir):
            print("creating a folder!")
            os.makedirs(user_dir)

        # Save the file in the user's directory
        file_path = os.path.join(user_dir, filename)
        file.save(file_path)
        file_path = os.path.join(os.getcwd(), file_path)
        raw_path = file_path[:-4:]
        if '.' in filename and filename.rsplit('.', 1)[1].lower() in AUDIO_EXTENTIONS:
            converted_path = raw_path + "-converted.wav"
            convert_audio(file_path, converted_path)
            file_path = converted_path
            text_path = raw_path + ".txt"
            f = open(text_path, "w")
            print("This is the file path to be transcribed: ", file_path)
            text_data = transcribe(file_path)
            if type(text_data) is not None:
                f.write(text_data)
                f.close()
                emotions = text_prompt(text_data)
                with open(raw_path + "_audio" + ".json", "w") as outfile:
                    json.dump(emotions, outfile)
                upload_text_analysis(username, text_data, emotions)
        elif '.' in filename and filename.rsplit('.', 1)[1].lower() in IMAGE_EXTENSIONS:
            # emotions = image_prompt()
            image_url = base_url + username + "/" + filename
            emotions = image_prompt(image_url)
            with open(raw_path + "_image" + ".json", "w") as outfile:
                json.dump(emotions, outfile)
            upload_image_analysis(username, image_url, emotions)
        elif '.' in filename and filename.rsplit('.', 1)[1].lower() in TEXT_EXTENSIONS:
            f = open(file_path)
            data = f.read()
            emotions = text_prompt(data)
            with open(raw_path + "_text" + ".json", "w") as outfile:
                json.dump(emotions, outfile)
            upload_text_analysis(username, text_data, emotions)
        print(f"File {filename} uploaded to {user_dir} by user: {username}")
        return jsonify({"message": f"File {filename} uploaded successfully to {username}'s directory."}), 200
    
    # If the file type is not allowed, return an error
    if debug:
        print("error 4")
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