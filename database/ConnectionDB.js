module.exports = class ConnectionDB {

    constructor(_connection) {
        if (!ConnectionDB.instance) {
            ConnectionDB.instance = this;
            this._connection = null;
        }
        return ConnectionDB.instance;
    }

    setConnection(_connection) {
        this._connection = _connection;
    }

    getConnection() {
        return this._connection;
    }
};