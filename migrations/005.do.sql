CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    _created_on DATETIME NOT NULL,
    _modified_on DATETIME NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users (id)
);