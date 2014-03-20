'use strict';

var mongoose = require('mongoose'),
    Semester = mongoose.model('Semester'),
    Course = mongoose.model('Course'),
    _ = require('lodash');

/**
 * Find Semester by Id
 */
exports.semester = function(req, res, next, id) {
    Semester.load(id, function(err, semester) {
        if (err) return next(err);
        if (!semester) return next(new Error('Failed to load semester ' + id));
        req.semester = semester;
        next();
    });
};


// ==== Routing ================================================================
exports.create = function(req, res) {
    Semester.create(req.body, function(err, sem) {
        if (err) {
            res.json(500, {
                errors: err.errors,
                semester: sem
            });
        } else {
            res.json(201, sem);
        }
    });
};


exports.update = function(req, res) {
    var semester = req.semester;
    semester = _.extend(semester, req.body);

    semester.save(function(err) {
        if (err) {
            res.json(500, {
                errors: err.errors,
                semester: semester
            });
        } else {
            res.json(200, semester);
        }
    });
};


exports.delete = function(req, res) {
    var semester = req.semester;

    semester.remove(function(err) {
        if (err) {
            res.json(500, {
                errors: err.errors,
                semester: semester
            });
        } else {
            res.json(200, 'Semester Deleted');
        }
    });
};


exports.read = function(req, res) {
    res.json(req.semester);
};


exports.all = function(req, res) {
    Semester.find().sort('-created').populate('createdBy', 'username').exec(function(err, semesters) {
        if (err) {
            res.json(500, {
                errors: err.errors
            });
        } else {
            res.json(semesters);
        }
    });
};

exports.courses = function(req, res) {
    Course.find({semester: req.semester._id}).populate('createdBy', 'username').exec(function(err, courses) {
        if (err) {
            res.json(500, {errors: err.errors});
        } else {
            res.json(courses);
        }
    });
};
