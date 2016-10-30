var bcrypt = require('bcryptjs');
var models = require('../models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({passReqToCallback : true}, function(req, username, password, done) {
        models.Accounts.findOne({ where: { username: username}}).then(function(user) {
            if (!user) {
                console.log('Unkown User');
                return done(null, false, {message: 'Unknown User'});
            }

            bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    req.session.username = req.body.username;
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid Password'});
                }
            });
        }).catch(function(err) {
            return done(null, false);
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
        var body = req.body;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(body.password, salt);

        console.log(body);
        models.Accounts.create({
            username: body.username,
            name: body.name,
            email_id: body.email_id,
            password: hash
        }).then(function(account) {
            console.log('promise.then');
            req.session.username = body.username;
            res.status(201).send(account);
        }).catch(function(err) {
            console.log("promise.catch");
            res.status(500).send("Something went wrong. Couldn't save the data.");
        });
    });
}
