module.exports = {
    /**
     * Generates OTP and inserts into OTP table
     * @param {FastifyInstance} app 
     * @param {string} email 
     * @returns {string} generated OTP
     */
    generateOTP: async (app, email) => {
        try {
            const { db, sql } = app.platformatic;
            const pin = generatePin();
            await db.query(sql`
                insert into otp (email, pin)
                values (${email}, ${pin})
            `);
            app.log.info('OTP generated');
            return pin;
        } catch (error) {
            app.log.error(error);
        }
    },

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
                    status: 404,
                    message: 'Email not found'
                };
            }
            if (data && data['0'].pin === otp) {
                app.log.info('OTP validated');
                return {
                    status: 200,
                    message: 'OTP validated'
                };
            } else {
                app.log.info('OTP not validated');
                return {
                    status: 400,
                    message: 'OTP not validated'
                }
            }
        } catch (error) {
            app.log.error('Error while validating OTP');
            return {
                status: 500,
                message: 'Error while validating OTP'
            }
        }
    },
}

/**
 * Generates a 4 digit number
 * @returns {string} pin
 */
function generatePin() {
    const min = 0;
    const max = 9999;
    const rNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const pin = rNum.toString().padStart(4, '0');
    return pin;
}
