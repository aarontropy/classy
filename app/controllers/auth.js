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


exports.requireRole = function(role) {
    return function(req, res, next) {
        if (req.user && req.user.roles && req.user.roles.indexOf(role) !== -1) {
            next();
        } else {
            res.send(403);
        }
    }
}

