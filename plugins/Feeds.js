/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');
const customSwagger = require('../custom.swagger.json');
const { statusCode, feeds } = require('../config/constants');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async (app) => {
    app.log.info('Feeds plugin loaded');
    const { db, sql } = app.platformatic;

    /**
     * Adds feed
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    const saveFeed = async (request, response) => {
        try {
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            const { content, createdBy, createdById } = request.body;
            await db.query(sql`
            INSERT INTO feeds (content, created_by, created_by_id, created_on)
            VALUES (${content}, ${createdBy}, ${createdById}, ${currentTime})
        `);
            app.log.info(feeds.feedAdded);
            return {
                statusCode: statusCode.success,
                message: feeds.feedAdded
            }
        } catch (error) {
            app.log.error(feeds.addFeedError);
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: feeds.addFeedError
            }
        }
    };

    /**
     * Retrieve global feeds
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    const getFeeds = async (request, response) => {
        try {
            const { sort, limit, offset } = request.query;
            let sqlQuery;
            if (sort && sort.toLowerCase() === 'asc' && limit && offset) {
                sqlQuery = sql`
                    SELECT
                        f.*,
                        STRFTIME('%d', created_on) || ' ' || SUBSTR('JanFebMarAprMayJunJulAugSepOctNovDec',
                        1 + 3 * STRFTIME('%m', created_on), -3) as date_
                    FROM
                        feeds f
                    ORDER BY
                        id ASC 
                    LIMIT ${limit} OFFSET ${offset}
                `;
            } else if (sort && sort.toLowerCase() === 'asc') {
                sqlQuery = sql`
                    SELECT
                        f.*,
                        STRFTIME('%d', created_on) || ' ' || SUBSTR('JanFebMarAprMayJunJulAugSepOctNovDec',
                        1 + 3 * STRFTIME('%m', created_on, -3) as date_
                    FROM
                        feeds f
                    ORDER BY
                        id ASC 
                `;
            } else if (limit && offset) {
                sqlQuery = sql`
                SELECT
                    f.*,
                    STRFTIME('%d', created_on) || ' ' || SUBSTR('JanFebMarAprMayJunJulAugSepOctNovDec',
                    1 + 3 * STRFTIME('%m', created_on), -3) as date_
                FROM
                    feeds f
                ORDER BY
                    id DESC
                LIMIT ${limit} OFFSET ${offset}`;
            } else {
                sqlQuery = sql`
                    SELECT
                        f.*,
                        STRFTIME('%d', created_on) || ' ' || SUBSTR('JanFebMarAprMayJunJulAugSepOctNovDec',
                        1 + 3 * STRFTIME('%m', created_on), -3) as date_
                    FROM
                        feeds f
                    ORDER BY
                        id DESC
                `;
            }
            const data = await db.query(sqlQuery);
            return {
                statusCode: statusCode.success,
                message: feeds.getFeeds,
                data: data
            }
        } catch (error) {
            app.log.error(feeds.getFeedsError);
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: feeds.getFeedsError,
                data: {}
            }
        }
    };

    /**
     * Delete a feed
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    const deleteFeed = async (request, response) => {
        try {
            const id = request.params.id;
            await db.query(sql`
                DELETE FROM feeds WHERE id = ${id}
            `);
            return {
                statusCode: statusCode.success,
                message: feeds.deleteFeed,
            }
        } catch (error) {
            app.log.error(feeds.deleteFeedError);
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: feeds.deleteFeedError,
            }
        }
    };

    /**
     * Retrieves user info of the posted feed
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    const getFeedUserData = async (request, response) => {
        try {
            const id = request.params.userid;
            let query;
            const userData = await db.query(sql`
                SELECT email, _type FROM users
                WHERE id = ${id}
            `);
            if (userData && userData.length === 0) {
                return {
                    statusCode: statusCode.notFound,
                    message: feeds.userNotFound,
                    data: {}
                }
            }
            if (userData && userData[0]['_type'] == 'student') {
                query = sql`
                    SELECT
                        id,
                        name,
                        email,
                        REPLACE(interests,
                        ', ',
                        '\n') as interests
                    FROM
                        student_info_vw
                    WHERE
                        id = ${id}
                    `;
            } else if (userData && userData[0]['_type'] == 'tutor') {
                query = sql`
                    SELECT
                        id,
                        name,
                        email,
                        REPLACE(interests,
                        ', ',
                        '\n') as interests,
                        mail_subscription,
                        bio,
                        websites 
                    FROM
                        tutor_info_vw
                    WHERE
                        id = ${id}
                    `;
            }
            var data = await db.query(query);
            data[0].userType = userData[0]['_type'];
            return {
                statusCode: statusCode.success,
                message: feeds.success,
                data: data[0]
            }
        } catch (error) {
            app.log.error(feeds.error);
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: feeds.error,
                data: {}
            }
        }
    };

    /**
     * Custom feeds routes
     */

    app.post(
        '/api/feed',
        customSwagger.saveFeedSchema,
        saveFeed
    )

    app.get(
        '/api/feed',
        customSwagger.getFeedsSchema,
        getFeeds
    )

    app.delete(
        '/api/feed/:id',
        customSwagger.deleteFeedSchema,
        deleteFeed
    )

    app.get(
        '/api/feed-user/:userid',
        customSwagger.feedUserDataSchema,
        getFeedUserData
    )
}
