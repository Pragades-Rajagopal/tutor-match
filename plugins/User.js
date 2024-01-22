/// <reference path="../global.d.ts" />
'use strict'

const moment = require('moment');
const mailService = require('../services/mailService');
const otpService = require('../services/otpService');
const loginService = require('../services/loginService');
const middleware = require('../services/middlewareService');
const customSwagger = require('../custom.swagger.json');
const { statusCode, user, emailType, otpMessages } = require('../config/constants');

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
            id,
            _type
            FROM users
            WHERE email = ${email}
            AND _status = 1
        `);
        // Generates JWT and saves in database
        const token = middleware.generateToken(data[0]);
        await db.query(sql`
            DELETE FROM user_login WHERE email = ${email};
            INSERT INTO user_login (email, token, logged_in)
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
            const userExists = await db.query(sql`
                SELECT * FROM users
                WHERE email = ${email}
                AND _status = 1
            `);
            if (userExists && userExists.length === 0) {
                return {
                    statusCode: statusCode.notFound,
                    message: otpMessages.notFound,
                    error: null
                };
            }
            const result = await otpService.generateOTP(app, email, currentTime);
            await mailService.sendRegistrationOTPEmail(app, email, result, emailType.resendOtp);
            return {
                statusCode: statusCode.success,
                message: otpMessages.otpSent,
                error: null
            };
        } catch (error) {
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: null,
                error: otpMessages.otpSentError
            };
        }
    }

    /**
     * Verifies user login and logs out
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    const userLogout = async (request, response) => {
        try {
            const email = request.body.email;
            const currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            const data = await db.query(sql`
                SELECT * FROM user_login WHERE email = ${email}
            `);
            if (data && data.length === 0) {
                return {
                    statusCode: statusCode.error,
                    message: user.userLoginNotFound
                }
            }
            await db.query(sql`
                UPDATE user_login 
                SET logged_out = ${currentTime}
                WHERE email = ${email}
            `);
            return {
                statusCode: statusCode.success,
                message: user.userlogoutSuccess
            }
        } catch (error) {
            app.log.error(user.userlogoutError);
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: user.userlogoutError
            }
        }
    }

    /**
     * Custom User routes
     */
    app.post(
        '/api/validate-otp',
        customSwagger.validateOTPSchema,
        otpValidator
    );

    app.post(
        '/api/login',
        customSwagger.loginSchema,
        userLogin
    );

    app.post(
        '/api/reset-password',
        customSwagger.resetPassword,
        resetPassword
    )

    app.post(
        '/api/resend-otp',
        customSwagger.resendOTPSchema,
        resendOTP
    );

    app.post(
        '/api/logout',
        customSwagger.logoutSchema,
        userLogout
    );
}
