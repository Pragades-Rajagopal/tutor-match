CREATE TABLE IF NOT EXISTS tutors (
    id INTEGER PRIMARY KEY,
    tutor_id INTEGER NOT NULL,
    bio TEXT,
    websites TEXT,
    course_id INTEGER NOT NULL,
    mail_subscription INTEGER CHECK( mail_subscription IN (0, 1) ) NOT NULL DEFAULT 0,
    _created_on DATETIME NOT NULL,
    _modified_on DATETIME NOT NULL,
    FOREIGN KEY (tutor_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS tutor_requests (
    id INTEGER PRIMARY KEY,
    tutor_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    _created_on DATETIME NOT NULL,
    FOREIGN KEY (tutor_id) REFERENCES users (id),
    FOREIGN KEY (student_id) REFERENCES users (id)
);