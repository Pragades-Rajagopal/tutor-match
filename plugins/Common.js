/// <reference path="../global.d.ts" />
'use strict'
const { courses, statusCode } = require('../config/constants');
const customSwagger = require('../custom.swagger.json');
const moment = require('moment');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async (app) => {
    app.log.info('Common plugin loaded');
    const { db, sql } = app.platformatic;

    app.platformatic.addEntityHooks('course', {
        save: async (originalSave, options) => {
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            options.input.createdOn = currentTime;
            options.input.modifiedOn = currentTime;
            options.input.status = 1;
            const result = await originalSave(options);
            return result;
        }
    });

    /**
     * Retrieves all courses
     * @param {*} request 
     * @param {*} response 
     * @returns {object}
     */
    const getAllCourses = async (request, response) => {
        try {
            const data = await db.query(sql`
                SELECT id, name FROM courses
                WHERE _status = 1
                ORDER BY name ASC
            `);
            return {
                statusCode: statusCode.success,
                message: courses.success,
                data: data
            };
        } catch (error) {
            app.log.error('Error while fetching courses');
            app.log.error(error);
            return {
                statusCode: statusCode.error,
                message: courses.error,
                data: {}
            };
        }
    }

    /**
     * Custom Student routes
     */
    app.get(
        '/api/all-courses',
        customSwagger.getAllCourses,
        getAllCourses
    );
}