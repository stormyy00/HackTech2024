#!/bin/bash

# Define your OpenAI API key here
OPENAI_API_KEY="sk-analyze-service-bIhLAROtB2JNNQRs4YUPT3BlbkFJ2dPxpXxOaUnZMbKfrbUy"
# OPENAI_API_KEY = "sk-proj-3FoeaJhEloyvIwIzPyodT3BlbkFJZaebPtu5CPT1mSWiX3ka"

# Define the request data in a variable
REQUEST_DATA='{
  "model": "gpt-3.5-turbo",
  "messages": [{"role": "user", "content": "Say this is a test!"}],
  "temperature": 0.7
}'

# Make the request using curl
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d "$REQUEST_DATA"
