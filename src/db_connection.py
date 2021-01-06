import pymongo
import passwords

client = pymongo.MongoClient(f"mongodb+srv://mac-dev:{passwords.mongo_password()}@cluster0.i7jmt.mongodb.net/resume-scanner?retryWrites=true&w=majority")
db = client["resume-scanner"]
collection = db["resumeCollection"]


def get_all_entries():
  elements = (collection.find({}))
  return list(elements)

def add_entry(entry):
  return collection.insert_one(entry)

def count_documents():
  return collection.count_documents({})

if __name__ == "__main__":
  #print(get_all_entries())
  print(count_documents())

