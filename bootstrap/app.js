const DB_CONNECTION_CONFIG = require('../config/database');
const MongoDb = require('../database/MongoDBConnection');
const Postgres = require('../database/PostgresConnection');

let db = null;

const CONNECTION_ENGINE = DB_CONNECTION_CONFIG.default;
const CONNECTION_PARAMS = DB_CONNECTION_CONFIG.connections[DB_CONNECTION_CONFIG.default];

switch (CONNECTION_ENGINE) {

    case 'mongoDB':
        db = new MongoDb();
        db.setConnection(CONNECTION_PARAMS);
        break;
    case 'postgres':
        db = new Postgres();
        db.setConnection(CONNECTION_PARAMS);
        break;

    default:
        throw 'Nenhuma base de dados setada';
}

module.exports = {db};





