from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env file")

client = MongoClient(MONGO_URI)

db = client["admin_portfolio"]

# Collections
resume_collection = db["resumes"]
certificate_collection = db["certificates"]
projects_collection = db["projects"]      # ✅ ADD THIS
admin_collection = db["admins"]
summary_collection = db["summary"]# ✅ ADD THIS
contact_collection = db["contacts"]