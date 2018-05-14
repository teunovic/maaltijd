let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

chai.should();
chai.use(chaiHttp);