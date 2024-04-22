## Inspiration

## What it does

## How we built it
react

### Backend
The backend API for our project was built using Python and Flask. API calls are made from our mobile app that upload image and audio data to our Flask server. If the data is an audio file, the audio gets transcribed by a Google service and then fed into ChatGPT for sentiment analysis. If the data is an image, then ChatGPT is then prompted to do sentiment analysis on the image. The processed sentiment data is then stored in firebase.

## Challenges we ran into

### Backend
This was my first time using Flask and it had a bit of a learning curve. It was also my first time using the ChatGPT API. We ran into challenges interfacing with my Flask API since headers between our front and back end were not synced.

## Accomplishments that we're proud of

## What we learned

## What's next for ISO KNOCK Coachella 2024
