#!/bin/bash

# Define variables
FILE="test.wav"
# FILE="test.jpg"
SERVER_URL="http://127.0.0.1:5000/upload"

# Check if test.txt exists
if [ ! -f "$FILE" ]; then
    echo "Error: $FILE does not exist in this directory."
    exit 1
fi

# Use curl to upload the file
curl -X POST -H "Username: VTJ3jowobQZW3ViZQX2P3FNWdji1" -v  -F "file=@${FILE}" $SERVER_URL
