'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Find User by Id
 */
exports.user = function(req, res, next, id) {
    User.load(id, function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + id));
        req.user = user;
        next();
    });
};


// ==== Routing ================================================================
exports.create = function(req, res) {
    User.create(req.body, function(err, sem) {
        if (err) {
            res.json(500, {
                errors: err.errors,
                user: sem 
            });
        } else {
            res.json(201, sem);
        }
    });
};


exports.update = function(req, res) {
    var user = req.user;
    user = _.extend(user, req.body);

    user.save(function(err) {
        if (err) {
            res.json(500, {
                errors: err.errors,
                user: user
            });
        } else {
            res.json(200, user);
        }
    });
};


exports.delete = function(req, res) {
    var user = req.user;

    user.remove(function(err) {
        if (err) {
            res.json(500, {
                errors: err.errors,
                user: user
            });
        } else {
            res.json(200, 'User Deleted');
        }
    });
};


exports.read = function(req, res) {
    res.json(req.article);
};


exports.all = function(req, res) {
    User.find({}, '-hashed_password -salt').sort('username').exec(function(err, users) {
        if (err) {
            res.json(500, {
                errors: err.errors
            });
        } else {
            res.json(users);
        }
    })
};
