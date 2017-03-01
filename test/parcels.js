var server = require('../server.js');
var chai = require('chai');
var expect = chai.expect;
var request = require('request');
var sinon = require('sinon');
var parcelsDAO = require('../dao/parcelsDAO');
var Promise = require('bluebird');
var getSingleParcel;

describe('Test Couriers Controller', () => {
    before(() => {
        server.startServer(9090);
        getSingleParcel = sinon.stub(parcelsDAO, 'getSingleParcel');
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
        it('should get dummy data for 1', (done) => {
            getSingleParcel.withArgs('1').returns(new Promise((resolve, reject) => {
                resolve({parcel_id: '1'});
            }));

            request('http://localhost:9090/parcels/1',  (error, response, body) => {
                body = JSON.parse(body);
                expect(body.parcel_id).to.equal('1');
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('Calling /parcesls/empty', () => {
        it('should get 204 for \'empty\' parcel id', (done) => {
            getSingleParcel.withArgs('empty').returns(new Promise((resolve, reject) => {
                reject('Parcel doesn\'t exists buddy');
            }));

            request('http://localhost:9090/parcels/empty',  (error, response, body) => {
                expect(response.statusCode).to.equal(204);
                done();
            });
        });
    });
});
