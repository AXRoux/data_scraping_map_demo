DROP TABLE IF EXISTS scraped_data;

CREATE TABLE scraped_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    url TEXT,
    source TEXT
);