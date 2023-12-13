CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    _status INTEGER CHECK( _status IN (0, 1) ) NOT NULL DEFAULT 1,
    _created_on DATETIME NOT NULL,
    _modified_on DATETIME NOT NULL
);