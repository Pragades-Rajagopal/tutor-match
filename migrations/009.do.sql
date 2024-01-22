CREATE INDEX users_id_idx ON users(id);
CREATE INDEX otp_email_idx ON otp(email);
CREATE INDEX students_student_id_idx ON students(student_id);
CREATE INDEX tutors_tutor_id_idx ON tutors(tutor_id);
CREATE INDEX tutor_requests_tutor_id_idx ON tutor_requests(tutor_id);
CREATE INDEX tutor_requests_student_id_idx ON tutor_requests(student_id);
CREATE INDEX feeds_id_idx ON feeds(id);