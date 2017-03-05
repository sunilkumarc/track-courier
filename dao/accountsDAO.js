var models = require('../models');
var bcrypt = require('bcryptjs');
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

registerUser = function(req) {
    return new Promise((resolve, reject) => {
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
            resolve(account);
        }).catch(function(err) {
            console.log(err);
            reject("Something went wrong. Couldn't save the data.");
        });
    });
}

module.exports = {
    registerUser: registerUser
}
