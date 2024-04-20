from flask import Flask, request, send_from_directory, abort, jsonify
import os
from werkzeug.utils import secure_filename
from transcribe import *
from NRC_analyze import *

app = Flask(__name__)
UPLOAD_FOLDER = 'upload'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp3', 'wav'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB Max Upload

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return 'No file part'
#     file = request.files['file']
#     if file.filename == '':
#         return 'No selected file'
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(file_path)
#         file_path = os.path.join(os.getcwd(), file_path)
#         print(transcribe(file_path))
#         return f'File {filename} uploaded successfully.'
#     else:
#         return 'Invalid file type'

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
        text_path = file_path[:-4:] + ".txt"
        f = open(text_path, "w")
        f.write(transcribe(file_path))
        f.close()
        print(analyze(text_path))
        print(f"File {filename} uploaded to {user_dir} by user: {username}")
        return jsonify({"message": f"File {filename} uploaded successfully to {username}'s directory."})
    
    # If the file type is not allowed, return an error
    return jsonify({"error": "Invalid file type"}), 400

# @app.route('/files/<filename>')
# def download_file(filename):
#     if os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], filename)):
#         return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
#     else:
#         abort(404)

@app.route('/files/<filename>', methods=['GET'])
def download_file(filename):
    # Get the custom header 'Username' from the request
    username = request.headers.get('Username')
    
    # Check if the username header is present
    if not username:
        return jsonify({"error": "Username header is missing"}), 400

    # Create the file path within the user's directory
    user_dir = os.path.join(app.config['UPLOAD_FOLDER'], username)
    file_path = os.path.join(user_dir, filename)

    # Check if the file exists in the user's directory
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