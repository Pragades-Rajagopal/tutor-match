/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');
const mailService = require('../services/mailService');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async function (app) {
    app.log.info('User plugin loaded');

    app.platformatic.addEntityHooks('user', {
        save: async (originalSave, options) => {
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            options.input.createdOn = currentTime;
            options.input.modifiedOn = currentTime;
            const email = options.input.email;
            await mailService.sendEmail(app, email);
            return await originalSave(options);
        }
    });
}
