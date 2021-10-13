const FormValidator = require('node-input-validator');

const Controller = require('./Controller');
const LoginModel = require('../models/LoginModel');
const EncripterModule = require('../helpers/EncripterModule');

const Login = require('../helpers/Login');

module.exports = class LoginController extends Controller {

    constructor(res) {
        super(res);
        this._loginModel = new LoginModel();
    }

    async register(_req) {
        let params = _req.body;

        let validator = new FormValidator(params, {
            email: 'required|email|minLength:15|maxLength:80',
            name: 'required|minLength:5|maxLength:80',
            password: 'required|minLength:8|maxLength:40',
            admin: 'required|boolean',
            status: 'required|boolean',
        });

        validator.check().then((matched) => {
            let login = new Login("", params.email, params.password, params.name, params.status, params.admin);
            if (!matched) {
                this.error(422, {error: validator.errors});
            } else {
                this._loginModel.register(login).then(data => {
                    this.send(data);
                }).catch(err => {
                    this.error(400, err);
                });
            }
        });
    }

    login(_req) {
        let params = _req.body;

        let validator = new FormValidator(params, {
            email: 'required|email|minLength:15|maxLength:80',
            password: 'required|minLength:8|maxLength:40',
        });

        validator.check().then((matched) => {

            if (!matched) {
                this.error(400, {error: validator.errors});
            } else {

                let login = new Login("", params.email, params.password, params.name, true, params.admin);

                this._loginModel.loginUser(login).then(data => {

                    if (!data.status) {
                        this.error(401, {error: 'Usuário não autenticado'});
                        return false;
                    }

                    delete data.password;
                    data.token = EncripterModule.newJwtToken(data);
                    // save userJwtToken
                    this._loginModel.saveJwtToken(data.id, data.token).then(() => {
                        this.send(data);
                    }).catch(err => {
                        this.error(400, err);
                    });
                }).catch(err => {
                    this.error(422, err);
                });
            }
        });
    }

    recoverPassword(_req) {

        let params = _req.body;

        let validator = new FormValidator(params, {
            userId: 'required|mongoId|minLength:15|maxLength:80',
            password: 'required|minLength:8|maxLength:40',
        });

        validator.check().then((matched) => {

            if (!matched) {
                this.error(400, {error: validator.errors});
            } else {

                let login = new Login(params.userId, '', params.password, '');

                this._loginModel.updatePassword(login).then(data => {
                    this.send({message: 'Senha alterada com sucesso!'});

                }).catch(err => {
                    this.error(422, err);
                });
            }
        });
    }

    logout(_req) {
        this._loginModel.logout(_req.auth.id);
        this.send({message: 'logout'});
    }
};