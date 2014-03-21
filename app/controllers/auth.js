'use strict';

exports.login = function(passport) {
    return function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            // passport.authenticate is middleware, so we need to invoke it after creating it
            // Additionally, res.json needs to be returned
            if (err || !user) { return res.json(401, {error: 'Username or password invalid'}); }

            req.logIn(user, function(err) {
                if (err) { return res.json(401, {error: 'Username or password invalid'}); }
                return res.json(user);
            });
        })(req, res, next);
    };
};

exports.logout = function(req, res) {
    req.logout();
    res.json({message: 'Logout successful'});
};

