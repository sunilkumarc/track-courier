var server = require('../server.js');
var chai = require('chai');
var expect = chai.expect;
var request = require('request');
var sinon = require('sinon');
var parcelsDAO = require('../dao/parcelsDAO');
var Promise = require('bluebird');
var getSingleParcel;
var deleteParcel;
var getAllParcels;

describe('Test Couriers Controller', () => {
    before(() => {
        server.startServer(9090);
        getSingleParcel = sinon.stub(parcelsDAO, 'getSingleParcel');
        deleteParcel = sinon.stub(parcelsDAO, 'deleteParcel');
        getAllParcels = sinon.stub(parcelsDAO, 'getAllParcels');
        updateParcel = sinon.stub(parcelsDAO, 'updateParcel');
        insertParcel = sinon.stub(parcelsDAO, 'insertParcel');
    });

    after(() => {
        server.stopServer();
    });

    describe('Calling GET /', () => {
        it('should return 200 status code', (done) => {
            request('http://localhost:9090', (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        })
    });

    describe('Calling GET /parcesls/1', () => {
        it('should get dummy data for 1, status : 200', (done) => {
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

    describe('Calling GET /parcesls/empty', () => {
        it('should get 204 for \'empty\' parcel id, status : 204', (done) => {
            getSingleParcel.withArgs('empty').returns(new Promise((resolve, reject) => {
                resolve(null);
            }));

            request('http://localhost:9090/parcels/empty',  (error, response, body) => {
                expect(response.statusCode).to.equal(204);
                done();
            });
        });
    });

    describe('Calling GET /parcesls/all/ids', () => {
        it('should get 2 dummy records [{parcel_id: 1}, {parcel_id: 2}], status : 200', (done) => {
            getAllParcels.withArgs().returns(new Promise((resolve, reject) => {
                resolve([{parcel_id: '1'}, {parcel_id: '2'}]);
            }));

            request('http://localhost:9090/parcels/all/ids',  (error, response, body) => {
                body = JSON.parse(body);
                expect(body[0].parcel_id).to.equal('1');
                expect(body[1].parcel_id).to.equal('2');
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('should get no records, status : 204', (done) => {
            getAllParcels.withArgs().returns(new Promise((resolve, reject) => {
                resolve(null);
            }));

            request('http://localhost:9090/parcels/all/ids',  (error, response, body) => {
                expect(response.statusCode).to.equal(204);
                done();
            });
        });
    });

    describe('Calling DELETE /parcesls/1', () => {
        it('should delete dummy data for 1 and return \'Deleted Successfully\', status : 200', (done) => {
            deleteParcel.withArgs('1').returns(new Promise((resolve, reject) => {
                resolve({parcel_id: '1'});
            }));

            request.delete('http://localhost:9090/parcels/1',  (error, response, body) => {
                expect(body).to.equal('Deleted Successfully');
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('Calling DELETE /parcesls/2', () => {
        it('should not find parcel 2 and should return \'Couldn\'t find the parcel\', status : 400', (done) => {
            deleteParcel.withArgs('2').returns(new Promise((resolve, reject) => {
                resolve(null);
            }));

            request.delete('http://localhost:9090/parcels/2',  (error, response, body) => {
                expect(body).to.equal('Couldn\'t find the parcel');
                expect(response.statusCode).to.equal(400);
                done();
            });
        });
    });

    describe('Calling PUT /parcesls/1', () => {
        it('should dummy update parcel with id 1, status : 200', (done) => {
            updateParcel.withArgs({}, '1').returns(new Promise((resolve, reject) => {
                resolve('Updated Successfully');
            }));

            request.put('http://localhost:9090/parcels/1',  (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal('Updated Successfully');
                done();
            });
        });
    });

    describe('Calling PUT /parcesls/empty', () => {
        it('should result in bad request, status : 400', (done) => {
            updateParcel.withArgs({}, 'empty').returns(new Promise((resolve, reject) => {
                reject('Parcel not present');
            }));

            request.put('http://localhost:9090/parcels/empty',  (error, response, body) => {
                expect(response.statusCode).to.equal(400);
                expect(body).to.equal('Parcel not present');
                done();
            });
        });
    });

    describe('Calling POST /parcels', () => {
        it('should imitate data insert, status : 200', (done) => {
            insertParcel.withArgs({parcel_id: '1'}).returns(new Promise((resolve, reject) => {
                resolve({parcel_id: '1'});
            }));

            var options = {
                            uri: 'http://localhost:9090/parcels',
                            method: 'POST',
                            json: { parcel_id: '1' }
                        };

            request(options,  (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(body.parcel_id).to.equal('1');
                done();
            });
        });
    });
});
