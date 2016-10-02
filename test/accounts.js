var chai  = require("chai");
var expect = chai.expect;
var should = chai.should;
var request = require("request");
var Accounts = require('../models').Accounts;
var Promise = require('bluebird');
// var low = require('lowdb');
// var db = low('db.json');
var sinon = require('sinon');
// var sinonStubPromise = require('sinon-stub-promise');
// sinonStubPromise(sinon);

describe("Accounts controller", function() {

    describe("When called register with request body", () => {
        it("It should mock register endpoint with success", (done) => {
            var account = { username: "test_user", name: "Test User", email_id:"test@gmail.com",password: "test" };
            // var create = sinon.stub(Accounts, 'create').returnsPromise();
            // create.resolves(account);
            // sinon.stub(Accounts, 'create', (req, res) => {
            //    console.log('Inside stubbed method! :D');
            // });
            var sandbox; var accountsStub;
            sandbox = sinon.sandbox.create();
            accountsStub = sandbox.stub(Accounts, 'create');
            accountsStub.returns(Promise.reject(account));

            request.post({
                headers: {'content-type' : 'application/json'},
                url: 'http://localhost:8000/accounts/register',
                body: "{ \"username\": \"test_user2\", \"name\": \"Test User\", \"email_id\":\"test2@gmail.com\", \"password\": \"test\" }"
            }, (err, response, body) => {
                expect(err).to.not.be.ok;
            });

            // Accounts.create().restore();
            accountsStub.restore();
            done();
        })
    });
    /*
    describe("Test Stubbing using sinon.js", function() {
        it("Test Accounts.create", function(done) {
            var create = sinon.stub(Accounts, 'create');
            var account = { username: "test_user", name: "Test User", email_id:"test@gmail.com",password: "test" };
            Accounts.create(account);
            create.restore();
            sinon.assert.calledWith(create, account);
            done();
        });
    });

    beforeEach(function() {
        sinon.stub(Accounts, 'create', function(req, res) {
            db.get('Accounts').push({username: 'test_user', name: 'Test User', email_id: 'test@gmail.com', password: 'test'}).value();
            done(100);
        });
    });

    afterEach(function() {
        Accounts.create().restore();
    });

    describe("Test Stubbing using sinon.js", function() {
        it("Test Accounts.create", function(done) {
            Accounts.create(function(res) {
                expect(res).to.equal(100);
                done();
            });
        });
    });
    */

    /*
    describe("Test Login", function() {
        var url = "http://localhost:8000/accounts/login";
        it("Successful login and expect 302 - success redirect", function(done) {
            request.post({
                headers: {'content-type' : 'application/json'},
                url: 'http://localhost:8000/accounts/login',
                body: "{ \"username\": \"sachin_rt\",\"password\": \"aila\" }"
            }, function(err, response, body) {
                expect(response.statusCode).to.equal(302);
                done();
            });
        });

        it("Failure login and expect 401", function(done) {
            request.post({
                headers: {'content-type' : 'application/json'},
                url: 'http://localhost:8000/accounts/login',
                body: "{ \"username\": \"sachin_rt\",\"password\": \"aila1\" }"
            }, function(err, response, body) {
                expect(response.statusCode).to.equal(401);
                done();
            });
        });
    });

    describe("Test Logout", function() {
        var url = "http://localhost:8000/accounts/logout";
        it("Logout and expect 401", function(done) {
          request(url, function(error, response, body) {
              expect(response.statusCode).to.equal(401);
              done();
          });
      });
    });

    describe("Test Register", function() {
        it("Register existing user and expect 500", function(done) {
            var create = sinon.stub(Accounts, 'create');
            var account = { "username": "test_user", "name": "Test User", "email_id":"test@gmail.com", "password": "test" };
            create.withArgs(account).returns(new Promise((resolve, reject) => {
                console.log("Inside promise!");
                resolve();
                // reject();
            }));

            request.post({
                headers: {'content-type' : 'application/json'},
                url: 'http://localhost:8000/accounts/register',
                body: account
            }, function(err, response, body) {
                // console.log(err);
                // console.log(response.statusCode);
            });

            // sinon.assert.calledWith(create, account);
            done();
        });
    });
    */
});
