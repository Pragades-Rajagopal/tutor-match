/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');
const mailService = require('../services/mailService');
const otpService = require('../services/otpService');
const customSwagger = require('../custom.swagger.json');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async (app) => {
    app.log.info('User plugin loaded');

    app.platformatic.addEntityHooks('user', {
        save: async (originalSave, options) => {
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            options.input.createdOn = currentTime;
            options.input.modifiedOn = currentTime;
            const email = options.input.email;
            const result = await originalSave(options);
            if (result) {
                const result = await otpService.generateOTP(app, email);
                await mailService.sendEmail(app, email, result);
            }
            app.log.info(result);
            return result;
        }
    });

    const otpValidator = async (request, response) => {
        const result = await otpService.validateOTP(app, request.body.email, request.body.pin);
        return result
    }

    app.post(
        '/validate-otp',
        customSwagger.validateOTPSchema,
        otpValidator
    )
}
