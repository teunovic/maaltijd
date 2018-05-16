const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const auth = require('../auth/authentication.js');

chai.should();
chai.use(chaiHttp);

const token = auth.encodeToken(1);


describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/studentenhuis')
        .set({'Authorization': 1})
        .send(
            {
                'naam': 'testnaam',
                'adres': 'testadres',
            })

        .end((err,res) =>{
            res.should.have.status(401);
            const error = res.body;
            error.should.have.property('message');
            error.should.have.property('code').equals(1);
            error.should.have.property('datetime');
        });

        done()
    });

    it('should return a studentenhuis when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //

        chai.request(server)
            .post('/api/studentenhuis')
            .set({'Authorization': token})
            .send(
                {
                    'naam': 'testnaam',
                    'adres': 'testadres',
                })

            .end((err,res) =>{
                res.should.have.status(200);
                const error = res.body;
                error.should.have.property('ID');
                error.should.have.property('naam').equals('testnaam');
                error.should.have.property('adres').equals('testadres');
                error.should.have.property('contact');
                error.should.have.property('email');

            });
        done()
    });

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .post('/api/studentenhuis')
            .set({'Authorization': token})
            .send(
                {
                    'adres': 'testadres',
                })

            .end((err,res) =>{
                res.should.have.status(412);
                const error = res.body;
                error.should.have.property('message');
                error.should.have.property('code').equals(1);
                error.should.have.property('datetime');

            });
        done()
    });

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .post('/api/studentenhuis')
            .set({'Authorization': token})
            .send(
                {
                    'naam': 'testnaam',
                })

            .end((err,res) =>{
                res.should.have.status(412);
                const error = res.body;
                error.should.have.property('message');
                error.should.have.property('code').equals(2);
                error.should.have.property('datetime');

            });
        done()
    })
});

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //

        chai.request(server)
            .get('/api/studentenhuis')
            .set({'Authorization': 1})

            .end((err,res) =>{
                res.should.have.status(401);
                const error = res.body;
                error.should.have.property('message');
                error.should.have.property('code').equals(1);
                error.should.have.property('datetime');
            });
        done()
    });

    it('should return all studentenhuizen when using a valid token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //

        chai.request(server)
            .get('/api/studentenhuis')
            .set({'Authorization': token})

            .end((err,res) =>{
                res.should.have.status(200);
                const error = res.body;
                error.should.be.a('array');
                error.body.should.have.property('ID');
                error.body.should.have.property('naam');
                error.body.should.have.property('adres');
                error.body.should.have.property('contact');
                error.body.should.have.property('email');
            });
        done()
    })
});

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    });

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    });

    it('should return an error when using an non-existing huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
});

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    });

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    });

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    });

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
});

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    });

    it('should return a studentenhuis when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    });

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    });

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
});