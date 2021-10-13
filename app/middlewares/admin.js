const LoginModel = require('../models/LoginModel');
const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = function (req, res, next) {

    const loginModel = new LoginModel();
    loginModel.getUser(req.auth.id).then(user => {
        if (user.admin) {
            next();
        } else {
            ErrorResponse.error(res, 403, 'Você não possui permissão para acessar este serviço');
        }
    }).catch(err => {
        ErrorResponse.error(res, 403, 'Você não possui permissão para acessar este serviço');
    });
};