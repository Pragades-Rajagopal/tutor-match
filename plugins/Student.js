/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async (app) => {
    app.log.info('Student plugin loaded');

    app.platformatic.addEntityHooks('student', {
        save: async (originalSave, options) => {
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            options.input.createdOn = currentTime;
            options.input.modifiedOn = currentTime;
            options.input.courseId = JSON.stringify(options.input.courseId.split(','));
            const result = await originalSave(options);
            return result;
        }
    });
}
