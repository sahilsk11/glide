import pymongo
import passwords
import datetime
import json

client = pymongo.MongoClient(f"mongodb+srv://mac-dev:{passwords.mongo_password()}@cluster0.i7jmt.mongodb.net/resume-scanner?retryWrites=true&w=majority")
db = client["glide"]
collection = db["glideResumes"]


def get_all_entries():
  elements = (collection.find({}))
  return list(elements)

def add_entry(entry):
  remove_dot_from_keys(entry)
  entry["timestamp"] = datetime.datetime.now()
  return collection.insert_one(entry)

def count_documents():
  return collection.count_documents({})

def remove_dot_from_keys(entry):
  if "analysis" in entry:
    if "schools" in entry["analysis"]["requiredInfo"]["checklist"]:
      schools = entry["analysis"]["requiredInfo"]["checklist"]["schools"]
      original_keys = list(schools.keys())
      for school_name in original_keys:
        if "." in school_name:
          new_school_name = school_name.replace(".", " [dot] ")
          schools[new_school_name] = schools.pop(school_name)
    if "positions" in entry["analysis"]["requiredInfo"]["checklist"]:
      positions = entry["analysis"]["requiredInfo"]["checklist"]["positions"]
      original_keys = list(positions.keys())
      for position_name in original_keys:
        if "." in position_name:
          new_position_name = position_name.replace(".", " [dot] ")
          positions[new_position_name] = positions.pop(position_name)
    if "verbScore" in entry["analysis"]["experience"]:
      positions = entry["analysis"]["experience"]["verbScore"]
      original_keys = list(positions.keys())
      for position_name in original_keys:
        if "." in position_name:
          new_position_name = position_name.replace(".", " [dot] ")
          positions[new_position_name] = positions.pop(position_name)
    return entry

if __name__ == "__main__":
  entries = get_all_entries()
  total = 0
  a = 0
  for entry in entries:
    s = max(entry["analysis"]["score"], 0)
    total += s
    if s < 81:
      a += 1
  print(a)

