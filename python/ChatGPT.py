import openai

# Replace 'YOUR_API_KEY' with your OpenAI API key
openai.api_key = 'sk-analyze-service-bIhLAROtB2JNNQRs4YUPT3BlbkFJ2dPxpXxOaUnZMbKfrbUy'

# Query me
def query_chatgpt(prompt):
    response = openai.Completion.create(
        engine='gpt-3.5-turbo',  # Use the latest model available
        prompt=prompt,
        max_tokens=100,  # Adjust the maximum number of tokens in the response as needed
        temperature=0.7,  # Adjust temperature for randomness in response
    )
    return response.choices[0].text.strip()

# Example usage
prompt = "What is the capital of France?"
answer = query_chatgpt(prompt)
print(answer)
