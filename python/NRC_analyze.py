from nrclex import NRCLex
import os
# lexicon_file = os.path.join(os.getcwd(), 'nrc_en.json') 
# text_object = NRCLex(lexicon_file)

def analyze(file_path):
    f = open(file_path, "r")
    text = f.read()
    # text_object.load_raw_text(text)
    text_object = NRCLex(text)
    return text_object.top_emotions
