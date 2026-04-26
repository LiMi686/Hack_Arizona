from pymongo import MongoClient

MONGO_URI = "mongodb+srv://limi_db_user:5202568742ml@cluster0.rz4get2.mongodb.net/"
DB_NAME   = "hack_arizona"

client = MongoClient(MONGO_URI)
db     = client[DB_NAME]
