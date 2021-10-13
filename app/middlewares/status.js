const LoginModel = require('../models/LoginModel');
const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = function (req, res, next) {

    const loginModel = new LoginModel();

    loginModel.getUser(req.auth.id).then(user => {
        if (user.status) {
            next();
        } else {
            let response = {
                status: 401,
                errors: 'Usuário não autenticado',
            };
            res.status(401).send(response)
        }
    }).catch(err => {
        let response = {
            status: 401,
            errors: 'Usuário não autenticado',
        };
        res.status(401).send(response)
    });
};