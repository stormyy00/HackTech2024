import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter
import os
import json
import datetime
import calendar

# Use a service account.
cwd = os.getcwd()
# print(cwd)
cred = credentials.Certificate(os.path.join(cwd, "firebase.json"))

app = firebase_admin.initialize_app(cred)

db = firestore.client()

# f = open("./upload/Howard/test.txt")
# text = f.read()
# f.close()

# f = open("./upload/Howard/test.json")
# data = json.load(f)
# f.close()

# # https://www.geeksforgeeks.org/how-to-convert-datetime-to-unix-timestamp-in-python/
# date = datetime.datetime.utcnow()
# utc_time = calendar.timegm(date.utctimetuple())
# print(utc_time)

# new_data = {"source": "text", "text": text, "timestamp": utc_time}
# data.update(new_data)

# doc_ref = db.collection("users").document("howard")

# doc_ref.set({"userMoods": firestore.ArrayUnion([data])})

# data['source'] = "text"
# data['text'] = text
# data['timestamp'] = firestore.SERVER_TIMESTAMP

def upload_text_analysis(doc_id, raw_text, json_analysis):
    date = datetime.datetime.utcnow()
    utc_time = calendar.timegm(date.utctimetuple())
    new_data = {"source": "text", "text": raw_text, "timestamp": utc_time}
    json_analysis.update(new_data)

    doc_ref = db.collection("users").document(doc_id)
    
    doc_ref.update({"userMoods": firestore.ArrayUnion([json_analysis])})
    return True

def upload_audio_analysis(doc_id, raw_text, json_analysis):
    date = datetime.datetime.utcnow()
    utc_time = calendar.timegm(date.utctimetuple())
    new_data = {"source": "audio", "text": raw_text, "timestamp": utc_time}
    json_analysis.update(new_data)

    doc_ref = db.collection("users").document(doc_id)
    
    doc_ref.update({"userMoods": firestore.ArrayUnion([json_analysis])})
    return True

def upload_image_analysis(doc_id, image_url, json_analysis):
    date = datetime.datetime.utcnow()
    utc_time = calendar.timegm(date.utctimetuple())
    new_data = {"source": "image", "timestamp": utc_time, "url": image_url}
    json_analysis.update(new_data)

    doc_ref = db.collection("users").document(doc_id)
    
    doc_ref.update({"userMoods": firestore.ArrayUnion([json_analysis])})
    return True

# upload_text_analysis("howard", text, data)