const path = require('path');
require('dotenv').config({
    path: path.resolve('./.env'),
});

const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const fs = require('fs');
const constants = require('../config/constants');

const templatePath = path.resolve(__dirname, '../', 'public/view', 'otp.html');

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
            const finalTemplate = getTemplate(email, pin);
            const info = await transporter.sendMail({
                from: process.env.TUTOR_MAIL,
                to: email,
                subject: constants.email.verificationSubject,
                html: finalTemplate,
            });
            app.log.info(constants.email.messages.sent);
            app.log.info(info);
        } catch (error) {
            app.log.error(constants.email.messages.triggerError);
            app.log.error(error);
        }
    }
}

/**
 * Generates html template to email trigger
 * @param {string} email 
 * @param {string} pin 
 * @returns html file
 */
const getTemplate = (email, pin) => {
    const file = fs.readFileSync(templatePath, { encoding: 'utf-8' });
    const template = hbs.compile(file);
    const variables = {
        email: email,
        otp: pin,
    }
    return template(variables);
}