const connectionDataBase = require('./bootstrap/app');
const app = require('./config/custom-express')();
require("dotenv-safe").load();

global.__basedir = __dirname;

connectionDataBase.db.getConection().then(connectionDBResult => {

    // // Singleton class for every models classes ;
    const ConnectionDB = require('./database/ConnectionDB');
    const connectionDB = new ConnectionDB();
    connectionDB.setConnection(connectionDBResult);

    const router = require('./routes/Routes');
    router(app);

    app.listen((process.env.PORT || 3005), () => console.log('Listening on port ' + (process.env.PORT || 3005)));

}).catch(err => {
    console.log('Não foi possivel conectar ao banco de dados');
    console.log(err);
});

