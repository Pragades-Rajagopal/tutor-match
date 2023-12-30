/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');
const customSwagger = require('../custom.swagger.json');
const { student, statusCode } = require('../config/constants');
const mailService = require('../services/mailService');
const { authenticateToken } = require('../services/middlewareService');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async (app) => {
    app.log.info('Student plugin loaded');
    const { db, sql } = app.platformatic;

    /**
     * Adds students interests
     * @returns {object}
     */
    const saveStudentInterest = async (request, response) => {
        try {
            const { studentId, courseIds } = request.body;
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            const isStudent = await db.query(sql`
                SELECT 1 "check" FROM users
                WHERE id = ${studentId}
                AND _type = 'student'
                AND _status = 1
            `);
            console.log(isStudent);
            if (isStudent && isStudent.length === 0) {
                return {
                    statusCode: statusCode.error,
                    message: student.addIntrstCheckError
                }
            }
            await db.query(sql`
                DELETE FROM students WHERE student_id = ${studentId}
            `);
            for (const i of courseIds) {
                await db.query(sql`
                    INSERT INTO STUDENTS (student_id, course_id, _created_on, _modified_on)
                    VALUES (${studentId}, ${parseInt(i)}, ${currentTime}, ${currentTime})
                `);
            }
            app.log.info(student.interestAdded);
            return {
                statusCode: statusCode.success,
                message: student.interestAdded
            }
        } catch (error) {
            app.log.error(student.addInterestError);
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: student.addInterestError
            }
        }
    };

    /**
     * Retrieves student interests/courses
     * @param {*} request 
     * @param {*} response 
     * @returns {object}
     */
    const getStudentInterests = async (request, response) => {
        const id = request.params.id;
        const data = await db.query(sql`
        SELECT
            s.student_id,
            u.first_name || ' ' || u.last_name as name_,
            u.email,
            u.mobile_no,
            u._type,
            c.id,
            c.name
        FROM
            students s,
            courses c,
            users u
        WHERE
            s.student_id = ${id}
            AND c.id = s.course_id
            AND u.id = s.student_id
            AND c._status = 1
        `);
        if (data && data.length === 0) {
            return {
                statusCode: statusCode.notFound,
                message: student.interestNotFound,
                data: {}
            }
        }
        const feeds = await db.query(sql`
            SELECT * FROM feeds 
            WHERE created_by_id = ${id}
            ORDER BY created_on DESC
        `);
        let values = [];
        for (const i of data) {
            values.push({
                courseId: i.id,
                courseName: i.name
            });
        }
        return {
            statusCode: statusCode.success,
            message: student.getInterest,
            data: {
                student_id: data[0]["student_id"],
                name: data[0]["name_"],
                email: data[0]["email"],
                mobile_number: data[0]["mobile_no"],
                type: data[0]["_type"],
                interests: values,
                feeds: feeds
            },
        }
    };

    /**
     * Retrive tutor list based on student's interests
     * @param {*} request 
     * @param {*} response 
     * @returns {object}
     */
    const getTutorList = async (request, response) => {
        try {
            const student_id = request.params.student_id;
            const tutorLists = await db.query(getTutorListQuery(sql, student_id));
            return {
                statusCode: statusCode.success,
                message: student.fetchTutorListSuccess,
                data: {
                    tutorLists: tutorLists
                }
            }
        } catch (error) {
            app.log.error(student.fetchTutorListError);
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: student.fetchTutorListError,
                data: {}
            }
        }
    }

    /**
     * Sends request to Tutors 
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    const sendRequest = async (request, response) => {
        try {
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            const { studentId, tutorId } = request.body;
            const studentInfo = await db.query(sql`
                SELECT * FROM student_info_vw WHERE ID = ${studentId}
            `);
            const tutorInfo = await db.query(sql`
                SELECT * FROM tutor_info_vw WHERE ID = ${tutorId}
            `);
            if ((studentInfo && studentInfo.length === 0) || (tutorInfo && tutorInfo.length === 0)) {
                return {
                    statusCode: statusCode.error,
                    message: student.infoNotFound
                }
            }
            const isRequestExists = await db.query(sql`
                SELECT 1 "check" FROM tutor_requests
                WHERE tutor_id = ${tutorId}
                AND student_id = ${studentId}
            `);
            if (isRequestExists && isRequestExists.length > 0) {
                return {
                    statusCode: statusCode.error,
                    message: student.requestExists
                }
            }
            const tutorInfo_ = tutorInfo[0];
            const studentInfo_ = studentInfo[0];
            if (tutorInfo_.mail_subscription === 1) {
                await mailService.sendTutorRequest(app, tutorInfo_.email, {
                    name: studentInfo_.name,
                    interests: studentInfo_.interests,
                    mail: studentInfo_.email
                });
            }
            await db.query(sql`
                INSERT INTO tutor_requests (tutor_id, student_id, _created_on) 
                VALUES (${tutorId}, ${studentId}, ${currentTime})
            `);
            app.log.info(student.sendRequestSuccess);
            return {
                statusCode: statusCode.success,
                message: student.sendRequestSuccess
            }
        } catch (error) {
            app.log.error(student.sendRequestError);
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: student.sendRequestError
            }
        }
    }

    /**
     * Custom Student routes
     */

    // app.addHook("preValidation", authenticateToken);
    app.post(
        '/api/student/interest',
        customSwagger.saveStudentSchema,
        saveStudentInterest
    );

    app.get(
        '/api/student/interest/:id',
        customSwagger.getStudentSchema,
        getStudentInterests
    );

    app.get(
        '/api/student/tutor-list/:student_id',
        customSwagger.getTutorListSchema,
        getTutorList
    );

    app.post(
        '/api/student/request',
        customSwagger.sendRequestToTutorSchema,
        sendRequest
    )
}

/**
 * Frames query to retrive tutor list based on student's interests
 * @param {app.platformatic.sql} sql 
 * @param {*} student_id 
 * @returns 
 */
const getTutorListQuery = (sql, student_id) => {
    return sql`
        SELECT
            DISTINCT T.TUTOR_ID,
            U.FIRST_NAME || ' ' || U.LAST_NAME AS tutor_name,
            T.BIO ,
            T.WEBSITES,
            (
            SELECT
                GROUP_CONCAT(C1.NAME,
                ', ')
            FROM
                COURSES C1
            WHERE
                C1.ID IN (
                SELECT
                    T1.COURSE_ID
                FROM
                    TUTORS T1
                WHERE
                    T1.TUTOR_ID = T.TUTOR_ID)) AS courses,
                    s.student_id
        FROM
            TUTORS T,
            USERS U,
            COURSES C,
            students s
        WHERE
            U.ID = T.TUTOR_ID
            AND C.ID = T.COURSE_ID
            AND S.student_id = ${student_id}
            and t.course_id = s.course_id
    `
};
