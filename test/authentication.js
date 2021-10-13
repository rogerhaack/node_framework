const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

let url = "http://localhost:3005";

describe('/GET Search user information', () => {
    it('return 401', (done) => {
        chai.request(url)
            .get('/api/v1/user')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('status').eql(401);
                res.body.should.have.property('errors').eql('Usuário não autenticado');
                done();
            });
    });
});