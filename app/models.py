import sqlite3

class ScrapedData:
    def __init__(self, id, name, location, description, url, source):
        self.id = id
        self.name = name
        self.location = location
        self.description = description
        self.url = url
        self.source = source

    @staticmethod
    def get_db():
        db = sqlite3.connect('app.db')
        db.row_factory = sqlite3.Row
        return db

    @classmethod
    def get_all(cls):
        db = cls.get_db()
        cursor = db.execute('SELECT * FROM scraped_data')
        return [cls(
            id=row['id'],
            name=row['name'],
            location=row['location'],
            description=row['description'],
            url=row['url'],
            source=row['source']
        ) for row in cursor.fetchall()]

    @classmethod
    def add(cls, name, location, description, url, source):
        db = cls.get_db()
        cursor = db.cursor()
        cursor.execute('''
            INSERT INTO scraped_data (name, location, description, url, source)
            VALUES (?, ?, ?, ?, ?)
        ''', (name, location, description, url, source))
        db.commit()
        return cursor.lastrowid

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'description': self.description,
            'url': self.url,
            'source': self.source
        }