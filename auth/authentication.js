const settings = require('../config.json');
const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(username) {
    const payload = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: username
    };
    return jwt.encode(payload, settings.secretkey);
}

function decodeToken(token, cb) {

    try {
        const payload = jwt.decode(token, settings.secretkey);

        const now = moment().unix();

        if (now > payload.exp) {
            console.log('Token has expired.');
        }

        // Return
        cb(null, payload);

    } catch(err) {
        cb(err, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
};


