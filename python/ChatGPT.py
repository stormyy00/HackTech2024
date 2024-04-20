import os
from openai import OpenAI
from dotenv import load_dotenv
import json
import requests

text_template = '''
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
  "mood": [
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
image_template = '''
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
  "mood": [
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
Classify the given image:
'''

load_dotenv()
client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)
def text_prompt(text):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": text_template + text,
            }
        ],
        model="gpt-3.5-turbo",
    )
    return json.loads(chat_completion.choices[0].message.content)

def image_prompt(image_url):
  chat_completion = client.chat.completions.create(
      messages=[
          {
              "role": "system",
              "content": image_template
          },
          {
            "role": "user",
            "content": [
              {
                "type": "image_url",
                "image_url": image_url
              },
            ],
          },
      ],
      model="gpt-4-vision-preview",
  )
  return json.loads(chat_completion.choices[0].message.content[7:-4])

cwd = os.getcwd()

# image_prompt("http://apt.howard-zhu.com/files/Howard/test.jpg")