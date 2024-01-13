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
        select
            *
        from
            (
            select
                u.id ,
                u.first_name || ' ' || u.last_name as name_,
                u.email,
                u.mobile_no,
                u._type,
                t.bio,
                t.websites,
                c.id as course_id,
                c.name as course_name
            from
                users u
            full outer join tutors t 
                            on
                t.tutor_id = u.id
            full outer join courses c 
                                on
                t.course_id = c.id
                and c._status = 1
            )
        where
            _type = 'tutor'
            and id = ${id}
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
        console.log(bio);
        const feeds = await db.query(sql`
        SELECT f.*,
            STRFTIME('%d', created_on) || ' ' || SUBSTR('JanFebMarAprMayJunJulAugSepOctNovDec',
            1 + 3 * STRFTIME('%m', created_on), -3) as date_
        FROM feeds f
        WHERE created_by_id = ${id}
        ORDER BY created_on DESC
        `);
        let values = [];
        if (data[0]["course_id"] !== null) {
            for (const i of data) {
                values.push({
                    courseId: i.course_id,
                    courseName: i.course_name
                });
            }
        }
        return {
            statusCode: statusCode.success,
            message: tutor.getInterest,
            data: {
                tutor_id: data[0]["id"],
                name: data[0]["name_"],
                email: data[0]["email"],
                mobile_number: data[0]["mobile_no"],
                type: data[0]["_type"],
                bio: bio.length > 0 ? bio[0]["bio"] : "",
                websites: bio.length > 0 ? bio[0]["websites"] : "",
                mailSubscription: bio.length > 0 ? bio[0]["mail_subscription"] : 0,
                interests: values,
                feeds: feeds
            },
        }
    };


    const getRequestInfo = async (request, response) => {
        const tutorId = request.params.id;
        const data = await db.query(sql`
            select
                v.tutor_id,
                v.student_id ,
                v.name ,
                v.email ,
                v.mobile_no ,
                REPLACE(v.interests,
                ', ',
                '\n') as interests
            from
                tutor_view_requests_vw v
            where tutor_id = ${tutorId}
        `);
        if (data && data.length === 0) {
            return {
                statusCode: statusCode.notFound,
                message: tutor.requestsNotFound,
                data: {
                    studentList: []
                }
            }
        }
        return {
            statusCode: statusCode.success,
            message: tutor.requestsFound,
            data: {
                studentList: data
            }
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
