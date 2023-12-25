/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');
const mailService = require('../services/mailService');
const otpService = require('../services/otpService');
const loginService = require('../services/loginService');
const middleware = require('../services/middlewareService');
const customSwagger = require('../custom.swagger.json');
const { statusCode, user, emailType } = require('../config/constants');

/** @param {import('fastify').FastifyInstance} app */
module.exports = async (app) => {
    app.log.info('User plugin loaded');
    const { db, sql } = app.platformatic;

    app.platformatic.addEntityHooks('user', {
        save: async (originalSave, options) => {
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            options.input.createdOn = currentTime;
            options.input.modifiedOn = currentTime;
            options.input.isEmailVerified = 0;
            options.input.isMobileVerified = 0;
            options.input.status = 0;
            const email = options.input.email;
            // Hashing the password
            options.input.password = await loginService.hashPass(app, options.input.password);
            const result = await originalSave(options);
            if (result) {
                const result = await otpService.generateOTP(app, email, currentTime);
                await mailService.sendRegistrationOTPEmail(app, email, result, emailType.register);
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
        if (result.statusCode === statusCode.success) {
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
        const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
        const verify = await loginService.verifyPass(app, email, password);
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
        const data = await db.query(sql`
            SELECT first_name || ' ' || last_name AS username,
            email,
            id
            FROM users
            WHERE email = ${email}
            AND _status = 1
        `);
        // Generates JWT and saves in database
        const token = middleware.generateToken(data[0]);
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
     * Reset user password
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    const resetPassword = async (request, response) => {
        const { email, otp, password } = request.body;
        const result = await otpService.validateOTP(app, email, otp);
        console.log(result);
        if (result.statusCode !== statusCode.success) {
            return result;
        }
        const hashPass = await loginService.hashPass(app, password);
        const res = await loginService.resetPassword(app, email, hashPass);
        return res;
    }

    /**
     * Resends OTP to the email
     * @param {*} request 
     * @param {*} response 
     * @returns Triggers email
     */
    const resendOTP = async (request, response) => {
        try {
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            const email = request.body.email;
            const result = await otpService.generateOTP(app, email, currentTime);
            await mailService.sendRegistrationOTPEmail(app, email, result, emailType.resendOtp);
            return {
                statusCode: 200,
                message: 'OTP sent to your registered email address',
                error: null
            };
        } catch (error) {
            return {
                statusCode: 200,
                message: null,
                error: 'Error while resending OTP'
            };
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

    app.post(
        '/reset-password',
        customSwagger.resetPassword,
        resetPassword
    )

    app.post(
        '/resend-otp',
        customSwagger.resendOTPSchema,
        resendOTP
    );
}
