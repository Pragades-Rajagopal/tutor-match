CREATE TABLE IF NOT EXISTS user_login (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    token TEXT NOT NULL,
    created_on DATETIME NOT NULL
);