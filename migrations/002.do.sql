CREATE TABLE IF NOT EXISTS otp (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    pin TEXT NOT NULL,
    created_on DATETIME NOT NULL
);