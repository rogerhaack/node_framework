const ConnectionDB = require('../../database/ConnectionDB');

const axios = require('axios');

module.exports = class Model {

    constructor() {
        this._DB = new ConnectionDB().getConnection();

        this._headers = {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }

    DB() {
        return this._DB;
    }

    getHtttp(target) {
        return axios.get(target, {
            headers: this._headers
        });
    }

    _delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

};