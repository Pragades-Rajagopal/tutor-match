/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');
const customSwagger = require('../custom.swagger.json');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async (app) => {
    app.log.info('Student plugin loaded');
    const { db, sql } = app.platformatic;

    /**
     * Adds students interests
     * @returns {object}
     */
    const saveStudentInterest = async (request, response) => {
        const { studentId, courseIds } = request.body;
        console.log(courseIds);
        const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
        await db.query(sql`
            INSERT INTO STUDENTS (student_id, course_id, _created_on, _modified_on)
            VALUES (${studentId}, json(${courseIds}), ${currentTime}, ${currentTime})
        `);
        return {
            statusCode: 201,
            message: "Interests added"
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
}
