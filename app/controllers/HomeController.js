const Controller = require('./Controller');
const HomeModel = require('../models/HomeModel.js');

module.exports = class HomeController extends Controller {

    constructor(res) {
        super(res);
        this._homeModel = new HomeModel(this);
    }

};