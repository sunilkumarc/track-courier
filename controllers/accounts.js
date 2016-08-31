var bcrypt = require('bcryptjs');
var models = require('../models');

module.exports.set = function(app) {
    app.get("/account/details", function(req, res) {
        res.status(200).send("Account Details Page");
    });

    app.post('/accounts/register', function(req, res) {
        var body = req.body;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(body.password, salt);

        models.Accounts.create({
            username: body.username,
            name: body.name,
            email_id: body.email_id,
            password: hash
        }).then(function(account) {
            res.status(201).send(account);
        }).catch(function(err) {
            res.status(500).send("Something went wrong. Couldn't save the data.");
        });
    });
}
