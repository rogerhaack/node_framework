module.exports = {
    middlewares:{
        auth: require('./middlewares/auth'),
        admin: require('./middlewares/admin'),
        status: require('./middlewares/status'),
    }
};