const ObjectID = require('mongodb').ObjectID;
const Model = require('./Model');

const usersDB = 'users';
const usersTokenDB = 'usersToken';

module.exports = class LoginModel extends Model {

    constructor() {
        super();
    }

    register(_login) {

        return new Promise((resolve, reject) => {
            // Get user from database
            this.DB().collection(usersDB).find({email: _login.email}).limit(1).toArray((err, docs) => {
                if (err != null) {
                    reject(err);
                    return false;
                }
                if (!docs[0]) {

                    let login = {
                        name: _login.name,
                        email: _login.email,
                        password: _login.password,
                        status: _login.status,
                        admin: _login.admin,
                        created_at: new Date(),
                        updated_at: new Date()
                    };

                    this.DB().collection(usersDB).insertOne(login, (err, suc) => {
                        if (err) {
                            reject({error: 'Houve um erro ao inserir usuário'});
                        }
                        let data = suc.ops[0];
                        data.id = data._id;
                        delete data._id;
                        delete data.password;

                        resolve(data);
                    });
                    return true;
                }
                reject({error: 'Ooops... Já existe um usuário com as credenciais de email informada.'});
                return false;
            });
        });
    }

    updatePassword(_login) {
        return new Promise((resolve, reject) => {
            this.DB().collection(usersDB).updateOne(
                {_id: ObjectID(_login.userId)},
                {
                    $set: {
                        password: _login.password,
                        updated_at: new Date(),
                    }
                },
                {upsert: false},
                (err, result) => {
                    if (err != null) {
                        reject(err);
                    }
                    if (result.result.n) {
                        resolve(result.result.n);
                    } else {
                        reject({error: 'Não foi possível atualizar a senha do usuário'})
                    }
                });
        });
    }

    updateLogin(login) {
        return new Promise((resolve, reject) => {
            this.DB().collection(usersDB).updateOne(
                {_id: ObjectID(login.userId)},
                {
                    $set: {
                        name: login.name,
                        email: login.email,
                        status: login.status,
                        admin: login.admin,
                        updated_at: new Date(),
                    }
                },
                {upsert: false},
                (err, result) => {
                    if (err != null) {
                        reject(err);
                    }
                    if (result.result.n) {
                        this.getUser(login.userId).then(user => {
                            resolve(user);
                        }).catch(err => {
                            reject(err);
                        })
                    } else {
                        reject({error: 'Não foi possível atualizar o usuário'})
                    }
                });
        });
    }

    loginUser(_login) {
        return new Promise((resolve, reject) => {
            // Get user from database
            this.DB().collection(usersDB).find({
                email: _login.email,
                password: _login._password
            }).limit(1).toArray((err, docs) => {
                if (err != null) {
                    reject(err);
                    return false;
                }
                if (docs[0]) {
                    docs[0].id = docs[0]._id;
                    delete docs[0]._id;
                    delete docs[0]._id;
                    resolve(docs[0]);
                    return true;
                }
                reject({error: 'Email Ou Senha incorretos, Verifique as credenciais.'});
                return false;
            });
        });
    }

    getUser(_userId) {
        return new Promise((resolve, reject) => {
            this.DB().collection(usersDB).find({
                _id: ObjectID(_userId),
            }).limit(1).toArray((err, docs) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                if (docs[0]) {
                    docs[0].id = docs[0]._id;
                    delete docs[0].password;
                    delete docs[0]._id;
                    resolve(docs[0]);
                } else {
                    reject({error: 'Usuário não encontrado'});
                }
            });
        });
    }

    verifyJwtToken(_userId, _jwtToken) {
        return new Promise((resolve, reject) => {
            this.DB().collection(usersTokenDB).find({
                userId: ObjectID(_userId),
                token: _jwtToken
            }).limit(1).toArray((err, docs) => {
                if (err != null) {
                    reject({error: 'Impossivel verificar token de acesso'});
                    return;
                }
                if (docs[0]) {
                    resolve(docs[0]);
                } else {
                    reject({error: 'Usuário não encontrado'});
                }
            });
        });
    }

    saveJwtToken(_userId, _jwtToken) {
        return new Promise((resolve, reject) => {
            this.DB().collection(usersTokenDB).updateOne(
                {userId: ObjectID(_userId)},
                {$set: {userId: ObjectID(_userId), token: _jwtToken}},
                {upsert: true},
                (err, result) => {
                    if (err != null) {
                        reject({error: 'Impossivel salvar token de acesso'});
                    }
                    resolve(result);
                });
        });
    }

    logout(_userId) {
        return this.saveJwtToken(_userId, '');
    }

};