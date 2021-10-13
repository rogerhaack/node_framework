const EncripterModule = require('./EncripterModule');

module.exports = class Login {

    constructor(userId = '', email = '', password = '', name = '', status = false, admin = false) {
        this._userId = '';
        this._name = '';
        this._email = '';
        this._password = '';
        this._status = '';
        this._admin = '';

        this._userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.status = status;
        this.admin = admin;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = EncripterModule.encrypt(value);
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = this._isBoolean(value);
    }

    get admin() {
        return this._admin;
    }

    set admin(value) {
        this._admin = this._isBoolean(value);
    }

    _isBoolean(_value) {

        if (_value) {

            if (_value === true) {
                return true;
            }

            if (_value === 1) {
                return true;
            }

            if (typeof _value === 'string') {
                if ((_value.toString().toLowerCase() === 'true') || (parseInt(_value) === 1)) {
                    return true;
                }
            }

        }
        return false;
    }
};