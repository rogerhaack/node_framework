var multer = require('multer');
const upload = multer({dest: './public/temp'});
const middlewares = require('../app/kernel').middlewares;


module.exports = class MakeRoutes {

    constructor(http) {
        this._http = http;
    }

    get(route, controller, middleware = []) {
        this._setMiddleware('get', route, middleware);

        this._http.get('/' + route, (req, res, next) => {
            this._getClass(req, res, next, controller);
        });
    }

    post(route, controller, middleware = []) {
        this._setMiddleware('post', route, middleware);

        this._http.post('/' + route, (req, res, next) => {
            this._getClass(req, res, next, controller);
        });
    }

    postFile(route, fileName, controller, middleware = []) {
        this._setMiddleware('post', route, middleware);

        this._http.post('/' + route, upload.single(fileName), (req, res, next) => {
            this._getClass(req, res, next, controller);
        });
    }

    put(route, controller, middleware = []) {
        this._setMiddleware('put', route, middleware);

        this._http.put('/' + route, (req, res, next) => {
            this._getClass(req, res, next, controller);
        });
    }

    delete(route, controller, middleware = []) {
        this._setMiddleware('delete', route, middleware);

        this._http.delete('/' + route, (req, res, next) => {
            this._getClass(req, res, next, controller);
        });
    }

    _setMiddleware(method, route, middleware) {
        for (let i = 0; i < middleware.length; i++) {
            if (middlewares[middleware[i]]) {
                this._http[method]('/' + route, middlewares[middleware[i]]);
            } else {
                throw new Error('middleware not implemented');
            }
        }
    }

    _getClass(req, res, next, className) {
        let instancia = className.split('@');
        let obj = require('../app/controllers/' + instancia[0]);
        obj = new obj(res);
        obj[instancia[1]](req);
    }
};