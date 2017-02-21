var server = require('../server.js');
var chai = require('chai');
var expect = chai.expect;
var request = require('request');
var sinon = require('sinon');
var models = require('../models');
var Promise = require('bluebird');

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

    describe('Calling /parcesls/1', () => {
        it('should not call orignal method', (done) => {
            var findOne = sinon.stub(models.Parcels, 'findOne');
            var parcel = {'parcel_id': '1'};
            findOne.withArgs(parcel).returns(new Promise((resolve, reject) => {
                console.log('Inside Promise');
                resolve();
            }));

            request('http://localhost:9090/parcels/1',  (error, response, body) => {
                done();
            });
        });
    });
});
