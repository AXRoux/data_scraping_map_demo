import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import get_db

def init_db():
    db = get_db()
    with open('schema.sql', 'r') as f:
        db.executescript(f.read())
    print("Database initialized successfully.")

if __name__ == '__main__':
    init_db()