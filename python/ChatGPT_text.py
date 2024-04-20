import os
from openai import OpenAI
from dotenv import load_dotenv
import json

template = '''
Given this list of emotions:

Negative
- Angry
- Stressed
- Sad
- Fear
Neutral
- Surprise
- Indifference
- Curiosity
- Boredom
- Acceptance
Positive
- Happy
- Gratitude
- Excitement
- Love

Your response should include the top 3 emotions, their parent category, and confidence level expressed as a decimal. Format this output as a JSON file with the following exmaple strucutre:
{
  "classifications": [
    {
      "category": "Positive",
      "emotion": "Happy",
      "confidence": 0.95
    },
    {
      "category": "Positive",
      "emotion": "Gratitude",
      "confidence": 0.75
    },
    {
      "category": "Positive",
      "emotion": "Excitement",
      "confidence": 0.70
    }
  ]
}
You may not say anything else.
Classify the following sentence:
'''

load_dotenv()
client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)
def prompt(text):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": template + text,
            }
        ],
        model="gpt-3.5-turbo",
    )
    return json.loads(chat_completion.choices[0].message.content)