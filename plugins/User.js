/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');
const mailService = require('../services/mailService');
const otpService = require('../services/otpService');
const loginService = require('../services/loginService');
const middleware = require('../services/middlewareService');
const customSwagger = require('../custom.swagger.json');
const { statusCode, user } = require('../config/constants');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async (app) => {
    app.log.info('User plugin loaded');

    app.platformatic.addEntityHooks('user', {
        save: async (originalSave, options) => {
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            options.input.createdOn = currentTime;
            options.input.modifiedOn = currentTime;
            const email = options.input.email;
            // Hashing the password
            options.input.password = await loginService.hashPass(app, options.input.password);
            const result = await originalSave(options);
            if (result) {
                const result = await otpService.generateOTP(app, email);
                await mailService.sendEmail(app, email, result);
            }
            app.log.info(result);
            return result;
        }
    });

    /**
     * Local method - Validates OTP for the user
     * 
     * Calls `validateOTP` method from OTP service
     * @param {*} request 
     * @param {*} response 
     * @returns {object}
     */
    const otpValidator = async (request, response) => {
        const { email, pin } = request.body;
        const result = await otpService.validateOTP(app, email, pin);
        if (result.status === statusCode.success) {
            await otpService.updateVerificationStatus(app, email);
        }
        return result
    }

    /**
     * Local method - Verifies user login and generates token
     * 
     * - Calls `verifyPass` method from Login service
     * @param {*} request 
     * @param {*} response 
     * @returns {object}
     */
    const userLogin = async (request, response) => {
        const { email, password } = request.body;
        const { db, sql } = app.platformatic;
        const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
        const verify = await loginService.verifyPass(app, email, password);
        console.log(verify);
        if (verify === statusCode.notFound) {
            return {
                statusCode: statusCode.notFound,
                message: user.notRegistered,
                token: ""
            }
        } else if (!verify) {
            return {
                statusCode: statusCode.unauthorized,
                message: user.incorrectAuth,
                token: ""
            }
        }
        // Generates JWT and saves in database
        const token = middleware.generateToken(email);
        await db.query(sql`
            DELETE FROM user_login WHERE email = ${email};
            INSERT INTO user_login (email, token, created_on)
            VALUES (${email}, ${token}, ${currentTime})
        `);
        return {
            statusCode: statusCode.success,
            message: "success",
            token: token
        }
    }

    /**
     * Custom User routes
     */
    app.post(
        '/validate-otp',
        customSwagger.validateOTPSchema,
        otpValidator
    );

    app.post(
        '/login',
        customSwagger.loginSchema,
        userLogin
    );
}
