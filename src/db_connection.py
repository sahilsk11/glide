import pymongo
import passwords
import datetime

client = pymongo.MongoClient(f"mongodb+srv://mac-dev:{passwords.mongo_password()}@cluster0.i7jmt.mongodb.net/resume-scanner?retryWrites=true&w=majority")
db = client["resume-scanner"]
collection = db["resumeCollection"]


def get_all_entries():
  elements = (collection.find({}))
  return list(elements)

def add_entry(entry):
  entry["timestamp"] = datetime.datetime.now()
  remove_dot_from_keys(entry)
  print(entry)
  return collection.insert_one(entry)

def count_documents():
  return collection.count_documents({})

def remove_dot_from_keys(entry):
  if "analysis" in entry:
    if "schools" in entry["analysis"]["requiredInfo"]["checklist"]:
      schools = entry["analysis"]["requiredInfo"]["checklist"]["schools"]
      for school_name in schools.keys():
        if "." in school_name:
          new_school_name = school_name.replace(".", " [dot] ")
          schools[new_school_name] = schools.pop(school_name)
    if "positions" in entry["analysis"]["requiredInfo"]["checklist"]:
      positions = entry["analysis"]["requiredInfo"]["checklist"]["positions"]
      for position_name in positions.keys():
        if "." in position_name:
          new_position_name = position_name.replace(".", " [dot] ")
          positions[new_position_name] = positions.pop(position_name)
    if "verbScore" in entry["analysis"]["experience"]:
      positions = entry["analysis"]["experience"]["verbScore"]
      for position_name in positions.keys():
        if "." in position_name:
          new_position_name = position_name.replace(".", " [dot] ")
          positions[new_position_name] = positions.pop(position_name)


if __name__ == "__main__":
  #print(get_all_entries())
  print(count_documents())

