import json

f = open("example.json")
data = json.load(f)
for i in data['classifications']:
    print(i)
 
# Closing file
f.close()