const crypto = require('crypto');
const jwt = require('jsonwebtoken');


module.exports = class EncripterModule {

    constructor() {

    }

    static encrypt(_text) {
        return crypto.createHmac('sha256', process.env.SECRETJWT).update(_text).digest('hex');
    }

    static compare(_text, _hash) {
        let textHash = crypto.createHmac('sha256', process.env.SECRETJWT).update(_text).digest('hex');
        if (hash.localeCompare(textHash, _hash) === 0) {
            return true;
        } else {
            return false;
        }
    }

    static newJwtToken(_data) {
        return jwt.sign(_data, process.env.SECRETJWT, {
            expiresIn: 60 * 60 * 24 // expires in 24 Horas
        });
    }

    static jwtVerify(_jwt) {
        return jwt.verify(_jwt, process.env.SECRETJWT, (err, decoded) => {
            if (err) {
                return false;
            }
            return decoded;
        });
    }
};