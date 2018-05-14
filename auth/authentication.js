const settings = require('../config.json');
const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(id) {
    const payload = {
        exp: moment().add(1, 'hours').unix(),
        iat: moment().unix(),
        userid: id + ''
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


