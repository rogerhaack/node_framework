const ObjectID = require('mongodb').ObjectID;
const LoginModel = require('./LoginModel');
const Model = require('./Model');

module.exports = class UserModel extends Model {

    constructor() {
        super();
        this._login = new LoginModel();
        this._usersDB = 'users';
    }

    getAllUsers(_offSet) {

        _offSet = parseInt(_offSet);
        const limit = 100;
        _offSet = (_offSet > 0) ? _offSet : 0;
        const skip = (_offSet) * limit;

        return new Promise((resolve, reject) => {
            this.DB().collection(this._usersDB).aggregate([
                {$sort: {_id: -1}},
                {
                    $match: {
                        _id: {$nin: [ObjectID('5d2372379345530004d31066')]}
                    }
                },
                {$skip: skip},
                {$limit: limit},

                {$addFields: {"id": "$_id",}},
                {$project: {"_id": 0, "password": 0}}

            ]).toArray((err, docs) => {
                if (err != null) {
                    reject({error: err});
                    return;
                }
                resolve(docs);
            });
        });
    }

    getUserById(_userId) {
        return this._login.getUser(_userId);
    }

    userUpdate(login) {
        return this._login.updateLogin(login);
    }
};