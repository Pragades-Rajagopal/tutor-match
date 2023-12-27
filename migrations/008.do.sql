CREATE TABLE IF NOT EXISTS feeds (
    id INTEGER PRIMARY KEY,
    content TEXT NOT NULL,
    created_by TEXT NOT NULL,
    created_by_id INTEGER NOT NULL,
    created_on DATETIME NOT NULL,
    FOREIGN KEY (created_by_id) REFERENCES users (id)
);