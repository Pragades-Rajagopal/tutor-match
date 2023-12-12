const path = require('path');
require('dotenv').config({
    path: path.resolve('./.env'),
});

const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * Generates a JSON web token for the given email address
     * @param {string} email 
     * @returns {string}
     */
    generateToken: (email) => {
        const payload = { email: email };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { algorithm: "HS256" });
        return accessToken;
    }
}