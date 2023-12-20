/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');
const customSwagger = require('../custom.swagger.json');
const { student, statusCode } = require('../config/constants');

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
            console.log(courseIds);
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
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
            app.log.info(student.addInterestError);
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
            SELECT c.name 
            FROM students s, courses c
            WHERE s.student_id = ${id} 
            AND c.id = s.course_id
            AND c._status = 1
        `);
        if (data && data.length === 0) {
            return {
                statusCode: statusCode.notFound,
                message: student.interestNotFound,
                data: []
            }
        }
        let values = [];
        for (const i of data) {
            values.push(i.name);
        }
        return {
            statusCode: statusCode.success,
            message: student.getInterest,
            data: values,
        }
    };


    /**
     * Custom Student routes
     */
    app.post(
        '/student-interest',
        customSwagger.saveStudentSchema,
        saveStudentInterest
    );

    app.get(
        '/student-interest/:id',
        customSwagger.getStudentSchema,
        getStudentInterests
    );
}
