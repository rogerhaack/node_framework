const MongoClient = require('mongodb').MongoClient;

module.exports = class MongoDBConnection {

    constructor() {
        if (!MongoDBConnection.instance) {
            MongoDBConnection.instance = this;
            this._connection = null;
        }
        return MongoDBConnection.instance;
    }

    setConnection(_params) {
        this._connection = new Promise((resolve, reject) => {

            let credentials = '';
            if (_params.username.length > 0 && _params.password.length) {
                credentials = _params.username + ':' + _params.password + '@';
            }
            let conection = 'mongodb' + ((_params.ssl) ? '+srv' : '') + '://' + credentials + _params.host + ((_params.ssl) ? '' : ':' + _params.port);

            MongoClient.connect(conection, {useNewUrlParser: true}, (err, client) => {

                    if (err != null) {
                        // console.log(err);
                        reject(err);
                    }
                    resolve(client);
                }
            );
        });

        this._connection = this._connection.then(client => {
            return client.db(_params.database);
        }).catch(err => {
            return err;
        });
    }

    getConection() {
        return this._connection;
    }

};