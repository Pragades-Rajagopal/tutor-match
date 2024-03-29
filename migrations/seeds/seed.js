'use strict'
const path = require('path');
require('dotenv').config({
    path: path.resolve('./.env'),
});
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

module.exports = async function seed({ entities, db, sql }) {
    const courses = [
        'Programming Language-Java',
        'Programming Language-Python',
        'Programming Language-C/C++',
        'Programming Language-Javascript',
        'Fullstack Web Development',
        'Fullstack Mobile Development',
        'Database-Postgresql',
        'Database-MySQL',
        'Database-Oracle PL/SQL',
        'NoSQL-MongoDB',
        'MERN stack',
        'MEAN stack',
        'Data Structures and Algorithms',
        'Mathematics-Statitics and Probability',
        'Data Science with Python',
        'Data Science with R',
        'Data Analysis',
        'Big Data',
        'Mechanical Engineering',
        'Chemical Engineering',
        'Electrical and Electronics Engineering',
        'Electronics and Communication Engineering',
        'Biotechnology',
        'Bioengineering',
        'Physics',
        'Chemistry',
        'Mathematics',
        'Biology',
        'English-Grammar and Vocabulary',
        'English',
        'Tamil',
        'Hindi',
        'Sanskrit',
        'History',
        'Geography',
        'Politics',
        'Ethics',
        'Moral Science',
        'General Knowledge',
        'Physical Training',
        'Yoga and Meditation',
        'Spiritual session',
        'Civil Service'
    ];
    for (const i of courses) {
        await db.query(sql`
        INSERT INTO courses (
        name, 
        _status, 
        _created_on,
        _modified_on)
        VALUES (
        ${i}, 
        1,
        datetime(),
        datetime()
        );
    `);
    }

    // Seed admin user
    await db.query(sql`
        INSERT
        INTO
        users
        (
            first_name,
            last_name,
            email,
            password,
            mobile_no,
            is_email_verified,
            is_mobile_verified,
            "_type",
            "_status",
            "_created_on",
            "_modified_on"
        ) VALUES (
        'admin',
        '001',
        ${ADMIN_EMAIL},
        ${ADMIN_PASSWORD},
        0000000000,
        1,
        1,
        'tutor',
        1,
        DATETIME(),
        DATETIME());
    `);
}
