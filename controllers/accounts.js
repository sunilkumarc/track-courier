var bcrypt = require('bcryptjs');
var models = require('../models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
    models.Accounts.findOne({ where: { username: username}}).then(function(user) {
        if (!user) {
            console.log('Unkown User');
            return done(null, false, {message: 'Unknown User'});
        }

        bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid Password'});
            }
        });
    }).catch(function(err) {
        res.status(500).send("Internal Server Error");
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.username)
});

passport.deserializeUser(function (username, done) {
    models.Accounts.findOne({ where: { username: username}}).then(function(user) {
        done(null, user);
    });
});

module.exports.set = function(app) {
    app.get('/accounts/login', function(req, res) {
        res.status(200).send('You\'ve got to login again!');
    });

    app.get('/accounts/loggedin', function(req, res) {
        res.status(200).send('Logged in dude!');
    });

    app.post('/accounts/login', passport.authenticate('local', {
        successRedirect: '/accounts/loggedin',
        failureRedirect: '/accounts/login'
    }));

    app.get('/accounts/logout', function(req, res) {
        req.logout();
        res.redirect('/accounts/login');
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
            req.session.username = body.username;
            res.status(201).send(account);
        }).catch(function(err) {
            res.status(500).send("Something went wrong. Couldn't save the data.");
        });
    });
}
