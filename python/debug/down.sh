#!/bin/bash

# Define variables
FILE="deez.txt"
SERVER_URL="http://127.0.0.1:5000/files/${FILE}"

# Use curl to download the file
curl -O $SERVER_URL

# Check if the download was successful
if [ -f "$FILE" ]; then
    echo "Download successful: $FILE"
else
    echo "Error downloading $FILE"
fi
