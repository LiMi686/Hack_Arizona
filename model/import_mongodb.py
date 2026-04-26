import pandas as pd
from pymongo import MongoClient

MONGO_URI = "mongodb+srv://limi_db_user:5202568742ml@cluster0.rz4get2.mongodb.net/"
DB_NAME   = "hack_arizona"

client = MongoClient(MONGO_URI)
db     = client[DB_NAME]

tables = [
    "cohorts",
    "coordinators",
    "participants",
    "baseline_assessments",
    "weekly_checkins",
    "chapter_confidence",
    "attendance",
    "dashboard_activity",
    "risk_scores",
    "risk_events",
    "interventions",
]

for name in tables:
    df = pd.read_csv(f"data/{name}.csv")
    records = df.to_dict(orient="records")
    col = db[name]
    col.drop()
    col.insert_many(records)
    print(f"Imported {name}: {len(records)} documents")

client.close()
print("Done.")
