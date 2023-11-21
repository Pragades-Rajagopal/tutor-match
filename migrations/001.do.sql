CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  mobile_no INTEGER NOT NULL UNIQUE,
  is_email_verified INTEGER CHECK( is_email_verified IN (0, 1) ) NOT NULL DEFAULT 0,
  is_mobile_verified INTEGER CHECK( is_mobile_verified IN (0, 1) ) NOT NULL DEFAULT 0,
  _type TEXT CHECK( _type IN ('student', 'tutor') ) NOT NULL,
  _status INTEGER CHECK( _status IN (0, 1) ) NOT NULL DEFAULT 1,
  _created_on DATETIME NOT NULL,
  _modified_on DATETIME NOT NULL
);
