var passport = require('passport');
var accounts = require('../dao/accountsDAO');

module.exports.set = function(app) {
    app.get('/accounts/isloggedin', function(req, res) {
        if(req.session.username)
            res.status(200).send('Hurray!');
        else
            res.status(401).send('User not logged in.');
    });

    app.post('/accounts/login', passport.authenticate('local'), function(req, res) {
        res.status(200).send(req.user);
    });

    app.get('/accounts/logout', function(req, res) {
        req.session.destroy();
        res.status(200).send('Logout Successful');
    });

    app.post('/accounts/register', function(req, res) {
        accounts.registerUser(req).then((account) => {
            if (account != null) {
                res.status(200).send(account);
            }
        }).catch((err) => {
            res.status(500).send(err);
        });
    });
}
