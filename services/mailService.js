const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "{MAIL_USER}",
        pass: "{MAIL_PASS}",
    }
});

module.exports = {
    sendEmail: async (app, email) => {
        try {
            const info = await transporter.sendMail({
                from: "{MAIL_USER}",
                to: email,
                subject: 'Test mail',
                text: 'Hello there!',
            });
            app.log.info(info);
        } catch (error) {
            app.log.error(error);
        }
    }
}