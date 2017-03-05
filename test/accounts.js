var server = require('../server.js');
var chai = require('chai');
var expect = chai.expect;
var request = require('request');
var sinon = require('sinon');
var accountsDAO = require('../dao/accountsDAO');
var Promise = require('bluebird');
var registerUser;

describe('Test Accounts Controller', () => {
    before(() => {
        server.startServer(9090);
        registerUser = sinon.stub(accountsDAO, 'registerUser');
    });

    after(() => {
        server.stopServer();
    });


    // describe('Calling POST /accounts/register', () => {
    //     it('should imitate user data insert, status : 200', (done) => {
    //         registerUser.withArgs({ username: 'test', name: 'test', email_id: 'test', password: 'test' }).returns(new Promise((resolve, reject) => {
    //             resolve({ username: 'test', name: 'test', email_id: 'test', password: 'test' });
    //         }));
    //
    //         var options = {
    //                         uri: 'http://localhost:9090/accounts/register',
    //                         method: 'POST',
    //                         json: { username: 'test', name: 'test', email_id: 'test', password: 'test' }
    //                     };
    //
    //         request(options,  (error, response, body) => {
    //             expect(response.statusCode).to.equal(200);
    //             expect(body.username).to.equal('test');
    //             expect(body.name).to.equal('test');
    //             done();
    //         });
    //     });
    // });
});
