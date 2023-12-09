const path = require('path');
require('dotenv').config({
    path: path.resolve('./.env'),
});

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

module.exports = {
    /**
     * Triggers an email when a new user is registered
     * @param {FastifyInstance} app 
     * @param {string} email 
     * @param {string} pin
     */
    sendEmail: async (app, email, pin) => {
        try {
            const info = await transporter.sendMail({
                from: process.env.TUTOR_MAIL,
                to: email,
                subject: 'Tutoree - Email verification',
                text: pin,
            });
            app.log.info(info);
        } catch (error) {
            app.log.error(error);
        }
    }
}