const { otpMessages, statusCode } = require('../config/constants');
module.exports = {
    /**
     * Generates OTP and inserts into OTP table
     * @param {FastifyInstance} app 
     * @param {string} email 
     * @param {time} createdOn
     * @returns {string} generated OTP
     */
    generateOTP: async (app, email, createdOn) => {
        try {
            const { db, sql } = app.platformatic;
            const pin = generatePin();
            await db.query(sql`
                insert into otp (email, pin, created_on)
                values (${email}, ${pin}, ${createdOn})
            `);
            app.log.info(otpMessages.generated);
            return pin;
        } catch (error) {
            app.log.error(otpMessages.generateError);
            app.log.error(error);
        }
    },

    /**
     * Validates OTP for the given email address
     * @param {FastifyInstance} app 
     * @param {string} email 
     * @param {string} otp 
     * @returns {object}
     */
    validateOTP: async (app, email, otp) => {
        try {
            const { db, sql } = app.platformatic;
            const data = await db.query(sql`
                select * from otp 
                where email = ${email}
                order by id desc 
                limit 1 
            `);
            if (!data || data.length === 0) {
                return {
                    statusCode: statusCode.notFound,
                    message: otpMessages.notFound
                };
            }
            if (data && data['0'].pin === otp) {
                app.log.info(otpMessages.validated);
                return {
                    statusCode: statusCode.success,
                    message: otpMessages.validated
                };
            } else {
                app.log.info(otpMessages.notValidated);
                return {
                    statusCode: statusCode.error,
                    message: otpMessages.notValidated
                }
            }
        } catch (error) {
            app.log.error(otpMessages.error);
            app.log.error(error);
            return {
                statusCode: statusCode.serverError,
                message: otpMessages.error
            }
        }
    },

    /**
     * Updates status in User model after email verification
     * @param {FastifyInstance} app 
     * @param {string} email 
     */
    updateVerificationStatus: async (app, email) => {
        try {
            const { db, sql } = app.platformatic;
            await db.query(sql`
                update users
                set is_email_verified = 1,
                _status = 1
                where email = ${email}
            `);
            app.log.info(otpMessages.verified);
        } catch (error) {
            app.log.error(otpMessages.verifyError);
            app.log.error(error);
        }
    }
}

/**
 * Generates a 4 digit number
 * @returns {string} pin
 */
const generatePin = () => {
    const min = 0;
    const max = 9999;
    const rNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const pin = rNum.toString().padStart(4, '0');
    return pin;
}
