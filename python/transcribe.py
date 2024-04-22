#!/usr/bin/env python3

import speech_recognition as sr

# obtain path to "english.wav" in the same folder as this script
from os import path

def transcribe(file_path):
    # AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), "/home/howard/HackTech2024/python/debug/test.wav")
    AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), file_path)
    # AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), "french.aiff")
    # AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), "chinese.flac")

    # use the audio file as the audio source
    r = sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)  # read the entire audio file

    # recognize speech using Google Speech Recognition
    try:
        # for testing purposes, we're just using the default API key
        # to use another API key, use `r.recognize_google(audio, key="GOOGLE_SPEECH_RECOGNITION_API_KEY")`
        # instead of `r.recognize_google(audio)`
        output = r.recognize_google(audio)
        print("Google Speech Recognition thinks you said " + output)
        return output
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
        return None
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))
        return None
