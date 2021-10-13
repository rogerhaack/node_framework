module.exports = class ErrorResponse {

    static error(_res, _status, _message) {
        let error = {
            status: _status,
            errors: _message,
        };
        _res.status(_status).send(error);
    }
};