const {Pool} = require('pg');

module.exports = class PostgresConnection {

    constructor() {
        if (!PostgresConnection.instance) {
            PostgresConnection.instance = this;
            this._connection = null;
        }
        return PostgresConnection.instance;
    }

    setConnection(_params) {

        this._connection = new Promise((resolve, reject) => {

            if (_params.database.length <= 0 || _params.user.length <= 0 || _params.host.length <= 0 ) {
                reject(false);
            } else {
                const pool = new Pool(_params);
                pool.connect((err, client, release) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(client);
                });
            }

        });

        this._connection = this._connection.then(client => {
            return client;
        }).catch(err => {
            throw "Não foi informado parametros de conexao.";
            // return err;
        });

    }

    getConection() {
        return this._connection;
    }


};