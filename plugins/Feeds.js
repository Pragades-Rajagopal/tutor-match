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
                sqlQuery = sql`SELECT * FROM feeds ORDER BY created_on ASC LIMIT ${limit} OFFSET ${offset}`;
            } else if (sort && sort.toLowerCase() === 'asc') {
                sqlQuery = sql`SELECT * FROM feeds ORDER BY created_on ASC`;
            } else if (limit && offset) {
                sqlQuery = sql`SELECT * FROM feeds ORDER BY created_on DESC LIMIT ${limit} OFFSET ${offset}`;
            } else {
                sqlQuery = sql`SELECT * FROM feeds ORDER BY created_on DESC`;
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
     * Custom feeds routes
     */

    app.post(
        '/feed',
        customSwagger.saveFeedSchema,
        saveFeed
    )

    app.get(
        '/feed',
        getFeeds
    )
}
