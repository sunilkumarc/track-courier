var expect  = require("chai").expect;
var request = require("request");

describe("Accounts controller", function() {

  describe("login endpoint", function() {

    var url = "http://localhost:8000/accounts/login";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

});
