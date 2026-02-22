from db import db
from passlib.hash import bcrypt

admin_collection = db["admins"]

def create_default_admin():
    if admin_collection.count_documents({}) == 0:
        hashed = bcrypt.hash("supersecret")
        admin_collection.insert_one({"username": "admin", "password": hashed})
        print("Default admin created: username=admin, password=supersecret")