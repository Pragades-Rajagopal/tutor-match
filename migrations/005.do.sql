CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    student_id INTEGER,
    course_id INTEGER [],
    _created_on DATETIME NOT NULL,
    _modified_on DATETIME NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users (id)
);