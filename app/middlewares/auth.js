const EncripterModule = require('../helpers/EncripterModule');
const LoginModel = require('../models/LoginModel');

module.exports = function (req, res, next) {

    let jwtToken = req.headers['x-access-token'];
    let jwtTokenValided = EncripterModule.jwtVerify(jwtToken);

    if (jwtTokenValided) {
        let loginModel = new LoginModel();
        loginModel.verifyJwtToken(jwtTokenValided.id, jwtToken).then(s => {

            delete jwtTokenValided.iat;
            delete jwtTokenValided.exp;

            req.auth = jwtTokenValided;
            next();
        }).catch(err => {
            let response = {
                status: 401,
                errors: 'Usuário não autenticado',
            };
            res.status(401).send(response)
        });

    } else {
        let response = {
            status: 401,
            errors: 'Usuário não autenticado',
        };
        res.status(401).send(response)
    }
};