const fs = require('fs');

module.exports = class Controller {

    constructor(res) {
        this._response = res;
    }

    send(res) {
        this._response.send(res);
    }

    json(res) {
        this._response.json(res);
    }

    error(_status, _res) {
        let response = {
            status: _status,
            errors: '',
        };
        if (_res.error) {
            response.errors = _res.error;
            this._response.status(_status).send(response);
        } else {
            response.errors = 'Não foi possivel executar a ação';
            this._response.status(400).send(response);
        }
    }

    deletFile(fileName) {
        try {
            fs.unlinkSync(fileName);
        } catch (err) {
            console.error(err);
        }
    }

    _delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
};
