/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');
const customSwagger = require('../custom.swagger.json');
const { tutor, statusCode } = require('../config/constants');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async (app) => {
    app.log.info('Tutor plugin loaded');
    const { db, sql } = app.platformatic;

    /**
     * Adds Tutor profile
     * @returns {object}
     */
    const saveTutorProfile = async (request, response) => {
        try {
            const { tutorId, courseIds, bio, websites, mailSubscription } = request.body;
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            const isTutor = await db.query(sql`
                SELECT 1 "check" FROM users
                WHERE id = ${tutorId}
                AND _type = 'tutor'
                AND _status = 1
            `);
            if (isTutor && isTutor.length === 0) {
                return {
                    statusCode: statusCode.error,
                    message: tutor.addIntrstCheckError
                }
            }
            await db.query(sql`
                DELETE FROM tutors WHERE tutor_id = ${tutorId}
            `);
            for (const i of courseIds) {
                await db.query(sql`
                    INSERT INTO tutors (tutor_id, course_id, bio, websites, mail_subscription, _created_on, _modified_on)
                    VALUES (${tutorId}, ${parseInt(i)}, ${bio}, ${websites}, ${mailSubscription}, ${currentTime}, ${currentTime})
                `);
            }
            app.log.info(tutor.profileAdded);
            return {
                statusCode: statusCode.success,
                message: tutor.profileAdded
            }
        } catch (error) {
            app.log.error(tutor.addInterestError);
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: tutor.addInterestError
            }
        }
    };

    /**
     * Retrieves tutor profile
     * @param {*} request 
     * @param {*} response 
     * @returns {object}
     */
    const getTutorProfile = async (request, response) => {
        const id = request.params.id;
        const data = await db.query(sql`
        SELECT
            t.tutor_id ,
            u.first_name || ' ' || u.last_name as name_,
            u.email,
            u.mobile_no,
            u._type,
            c.id,
            c.name
        FROM
            tutors t,
            courses c,
            users u
        WHERE
            t.tutor_id = ${id}
            AND c.id = t.course_id
            AND u.id = t.tutor_id
            AND c._status = 1
        `);
        if (data && data.length === 0) {
            return {
                statusCode: statusCode.notFound,
                message: tutor.interestNotFound,
                data: {}
            }
        }
        const bio = await db.query(sql`
            SELECT t.bio, t.websites, t.mail_subscription
            FROM tutors t
            WHERE t.tutor_id = ${id} 
            LIMIT 1
        `);
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
            message: tutor.getInterest,
            data: {
                tutor_id: data[0]["tutor_id"],
                name: data[0]["name_"],
                email: data[0]["email"],
                mobile_number: data[0]["mobile_no"],
                type: data[0]["_type"],
                bio: bio[0]["bio"],
                websites: bio[0]["websites"],
                mailSubscription: bio[0]["mail_subscription"],
                interests: values,
                feeds: feeds
            },
        }
    };


    const getRequestInfo = async (request, response) => {
        const tutorId = request.params.id;
        const data = await db.query(sql`
            SELECT * FROM tutor_view_requests_vw 
            WHERE tutor_id = ${tutorId}
        `);
        if (data && data.length === 0) {
            return {
                statusCode: statusCode.notFound,
                message: tutor.requestsNotFound,
                data: {}
            }
        }
        return {
            statusCode: statusCode.success,
            message: tutor.requestsFound,
            data: data
        }
    };

    /**
     * Custom Student routes
     */
    app.post(
        '/api/tutor/profile',
        customSwagger.saveTutorProfileSchema,
        saveTutorProfile
    );

    app.get(
        '/api/tutor/profile/:id',
        customSwagger.getTutorProfileSchema,
        getTutorProfile
    );

    app.get(
        '/api/tutor/request/:id',
        getRequestInfo
    )
}
