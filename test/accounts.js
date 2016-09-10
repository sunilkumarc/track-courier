var expect  = require("chai").expect;
var request = require("request");

describe("Accounts controller", function() {
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
            request.post({
                headers: {'content-type' : 'application/json'},
                url: 'http://localhost:8000/accounts/register',
                body: "{ \"username\": \"test_user\", \"name\": \"Test User\", \"email_id\":\"test@gmail.com\",\"password\": \"test\" }"
            }, function(err, response, body) {
                expect(response.statusCode).to.equal(500);
                done();
            });
        });
    });
});
