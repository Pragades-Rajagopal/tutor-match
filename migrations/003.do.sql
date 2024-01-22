CREATE TABLE IF NOT EXISTS user_login (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    token TEXT NOT NULL,
    logged_in DATETIME NOT NULL,
    logged_out DATETIME
);