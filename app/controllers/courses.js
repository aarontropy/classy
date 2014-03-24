'use strict';

var mongoose = require('mongoose'),
    Course = mongoose.model('Course'),
    _ = require('lodash');

/**
 * Find Course by Id
 */
exports.course = function(req, res, next, id) {
    Course.load(id, function(err, course) {
        if (err) return next(err);
        if (!course) return next(new Error('Failed to load course ' + id));
        req.course = course;
        next();
    });
};


// ==== Routing ================================================================
exports.create = function(req, res) {
    Course.create(req.body, function(err, sem) {
        if (err) {
            res.json(500, {
                errors: err.errors,
                course: sem
            });
        } else {
            res.json(201, sem);
        }
    });
};


exports.update = function(req, res) {
    var course = req.course;
    course = _.extend(course, req.body);

    course.save(function(err) {
        if (err) {
            res.json(500, {
                errors: err.errors,
                course: course
            });
        } else {
            res.json(200, course);
        }
    });
};


exports.delete = function(req, res) {
    var course = req.course;

    course.remove(function(err) {
        if (err) {
            res.json(500, {
                errors: err.errors,
                course: course
            });
        } else {
            res.json(200, 'Course Deleted');
        }
    });
};


exports.read = function(req, res) {
    res.json(req.course);
};


exports.all = function(req, res) {
    Course.find().sort('-created').populate('createdBy', 'username').exec(function(err, courses) {
        if (err) {
            res.json(500, {
                errors: err.errors
            });
        } else {
            res.json(courses);
        }
    });
};
