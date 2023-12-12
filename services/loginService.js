const { loginService, user, statusCode } = require('../config/constants');
const bcrypt = require('bcrypt');
const salt = 10;

module.exports = {
    /**
     * Hashes password
     * @param {FastifyInstance} app
     * @param {string} password
     * @returns {string} Hashed Password
     */
    hashPass: async (app, password) => {
        try {
            const genSalt = await bcrypt.genSalt(salt);
            const hash = await bcrypt.hash(password, genSalt);
            app.log.info(loginService.hash.success);
            return hash;
        } catch (error) {
            app.log.error(loginService.hash.error);
            app.log.error(error);
        }
    },

    /**
     * Verifies the password for user login
     * @param {FastifyInstance} app 
     * @param {string} email 
     * @param {string} password 
     * @returns {boolean}
     */
    verifyPass: async (app, email, password) => {
        try {
            const { db, sql } = app.platformatic;
            const data = await db.query(sql`
                select password from users 
                where email = ${email}
                and _status = 1
            `);
            if (!data || data.length === 0) {
                app.log.info(user.notRegistered);
                return statusCode.notFound;
            }
            const result = await bcrypt.compare(password, data[0].password);
            app.log.info(loginService.verification.success);
            return result;
        } catch (error) {
            app.log.error(loginService.verification.error);
            app.log.error(error);
            return false;
        }
    }
}
