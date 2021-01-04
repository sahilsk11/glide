import pymongo
import passwords

client = pymongo.MongoClient("mongodb+srv://mac-dev:${db_password}@cluster0.i7jmt.mongodb.net/${dbName}?retryWrites=true&w=majority")

mydb = client["resume-scanner"]