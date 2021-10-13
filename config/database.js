module.exports = {
    default: 'mongoDB',
    connections: {
        mongoDB: {
            'driver': 'mongoDB',
            'host': 'localhost',
            'port': '27017',
            'database': 'teste',
            'username': '',
            'password': '',
            'charset': 'utf-8',
            'ssl': false
        },
        postgres: {
            'user': 'postgres',
            'host': 'localhost',
            'database': 'postgres',
            'password': '',
            'port': 5432,
        }
    }
};