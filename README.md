# Inspiration

Inspired by BeReal and Life360, we envisioned a homegrown community where checking in on your friends' mental health is as easy as 1, 2, 3.

# What It Does

Our app allows users to share a snapshot of their current feelings. Rather than a direct approach, it provides a space for users to take a selfie and express themselves in a personal journal style. Whether you're having a rough time at work, feeling nervous about a competition, or excited for a vacation, you can 'rant' it out.

## Screenshots

![Audio Upload](/moodscreenshots/AudioUpload.PNG "Audio Upload Feature")
![Detailed Mood](/moodscreenshots/DetailedMood.PNG "Detailed Mood View")
![Mood Logo](/moodscreenshots/MoodLogo.png "Mood App Logo")
![Stat Check](/moodscreenshots/StatCheck.PNG "Mood Statistics")
![View Friends Mood](/moodscreenshots/ViewFriendsMood.PNG "Viewing Friends' Mood")

# How We Built It

We utilized React Native to enable cross-platform functionality across iOS, Android, and web platforms.
We integrated Firebase for authentication, database management, and data storage.
We used a personal server to process videos and images and return confidence ratios for various moods.

# Challenges We Ran Into

Setting up a web server was challenging as we were accustomed to the seamless experience provided by REST APIs. The shift to HTTP introduced several difficulties, necessitating meticulous data entry validation. Additionally, only one of us had prior experience with React Native, which introduced nuances and bottlenecks that significantly slowed our progress.

# Accomplishments That We're Proud Of

We developed an application that addresses an increasingly important need. We worked cohesively and effectively as a team, with each member contributing significantly. This project proved to be one of the most synergistic team efforts we've experienced, successfully integrating database management and artificial intelligence to create a platform that encourages supportive social interactions.

# What We Learned

We recognized the value of experience. Our limited familiarity with React Native transformed trivial tasks—such as recording audio, sending videos, and handling navigation—into complex challenges that were time-consuming to resolve.

# What's Next

We plan to enhance our application by:

- Implementing a machine learning algorithm to analyze voice tones for mood prediction.
- Adding features to identify patterns in users' moods across different days of the week, which could offer insights into emotional well-being.
- Developing tools to help users monitor their own and their friends' mental health, ensuring a robust support system is always available.
- Adding the ability to directly reach out in application.
