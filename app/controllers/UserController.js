const FormValidator = require('node-input-validator');

const Controller = require('./Controller');
const UserModel = require('../models/UserModel');
const Login = require('../helpers/Login');

module.exports = class UserController extends Controller {

    constructor(res) {
        super(res);
        this.userModel = new UserModel();
    }

    user(_req) {
        this.userModel.getUserById(_req.auth.id).then(data => {
            this.json(data);
        }).catch(err => {
            // console.log(err);
            this.error(400, err);
        });
    }

    userUpdate(_req) {

        let params = _req.body;

        let validator = new FormValidator(params, {
            id: 'required|string|minLength:24|maxLength:24',
            email: 'required|email|minLength:15|maxLength:80',
            name: 'required|minLength:5|maxLength:80',
            admin: 'required|boolean',
            status: 'required|boolean',
        });

        validator.check().then((matched) => {
            if (!matched) {
                this.error(422, {error: validator.errors});
            } else {
                let login = new Login(params.id, params.email, '', params.name, params.status, params.admin);

                this.userModel.userUpdate(login)
                    .then(suc => {
                        this.json(suc);
                    }).catch(err => {

                    console.log(err);
                    this.error(400, err);
                });
            }
        });
    }

    getUserById(_req) {
        let params = _req.params;
        let validator = new FormValidator(params, {
            userId: 'required|string|minLength:24|maxLength:24',
        });

        validator.check().then((matched) => {
            if (!matched) {
                this.error(422, {error: validator.errors});
            } else {
                this.userModel.getUserById(params.userId).then(data => {
                    this.json(data);
                }).catch(err => {
                    // console.log(err);
                    this.error(400, err);
                });
            }
        });
    }

    getAllUsers(_req) {

        this.userModel.getAllUsers(0).then(data => {
            this.json(data);
        }).catch(err => {
            this.error(400, err);
        });
    }

};