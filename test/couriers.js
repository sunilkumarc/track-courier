var server = require('../server.js');
var chai = require('chai');
var expect = chai.expect;
var request = require('request');

describe('Test Couriers Controller', () => {
    before(() => {
        server.startServer(9090);
    });

    after(() => {
        server.stopServer();
    });

    describe('Calling /', () => {
        it('should return 200 status code', (done) => {
            request('http://localhost:9090', (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        })
    });
});
