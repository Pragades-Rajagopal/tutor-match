CREATE TABLE IF NOT EXISTS deactivated_users (
  id INTEGER PRIMARY KEY,
  uid INTEGER,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  password TEXT,
  mobile_no INTEGER,
  is_email_verified INTEGER,
  is_mobile_verified INTEGER,
  _type TEXT,
  _status INTEGER,
  deactivated_on DATETIME,
  usage_days INTEGER
);