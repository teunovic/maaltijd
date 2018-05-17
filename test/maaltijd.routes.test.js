const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const auth = require('../auth/authentication.js');

chai.should();
chai.use(chaiHttp);

const token = auth.encodeToken(1);


describe('Maaltijd API GET', () => {
    it('should throw an error when using invalid roomnumber ', (done) => {

        chai.request(server)
            .get('/api/studentenhuis/x/maaltijd')
            .set({'Authorization': token})

            .end((err, res) => {
                res.should.have.status(404);
                const error = res.body;
                error.should.have.property('message');
                error.should.have.property('code').equals(1);
                error.should.have.property('datetime');
                done();
            });
    });

    it('should throw an error when using invalid roomnumber ', (done) => {

        chai.request(server)
            .get('/api/studentenhuis/x/maaltijd')
            .set({'Authorization': token})

            .end((err, res) => {
                res.should.have.status(404);
                const error = res.body;
                error.should.have.property('message');
                error.should.have.property('code').equals(1);
                error.should.have.property('datetime');
                done();
            });
    });
});

describe('Maaltijd API PUT', () => {
    it('should throw an error when putting with  wrong userid ', (done) => {

        chai.request(server)
            .put('/api/studentenhuis/1/maaltijd/2')
            .set({'Authorization': token})
            .send({
                "ID": 0,
                "naam": "string",
                "beschrijving": "string",
                "ingredienten": "string",
                "allergie": "string",
                "prijs": 0
            })
            .end((err, res) => {
                res.should.have.status(409);
                const error = res.body;
                error.should.have.property('message');
                error.should.have.property('code').equals(1);
                error.should.have.property('datetime');
                done();
            });
    });
});