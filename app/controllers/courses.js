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
        // Expose the mongoose model, not the document
        req.course = new Course(course);
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
    // The $update method of an angular $resource instance
    // will take the data returned from a successful update
    // and replace the $scope.{object} with the returned data.
    // Thus, whatever is returned from this function with status
    // 200 will be the new $scope.course object in the angular app.
    //
    // This function EXPECTS the entire course object to be
    // sent in the request body and returns the entire object.
    var course = _.extend(req.course, req.body),
        courseObject = course.toObject(),
        updates = _.pick(courseObject, function(val, key) {
            return key.charAt(0) !== '_';
        });

    console.log(courseObject);

    course.update(updates, function(err, n, raw) {
        if (err) {
            res.json(500, err);
        } else {
            res.json(200, courseObject);
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
    
    // Mongoose document methods toObject() and toJSON() will 
    // remove empty fields from the object.  Setting the option
    // mimimize to false prevents this.

    // res.json uses JSON.stringify() to create the JSON response
    // stringify() will use an object's toJSON method (if it has 
    // one). Thus, we need to take care of that before calling json()
    var course = req.course.toObject({minimize: false});
    res.json(course);
};

exports.meetings = function(req, res) {
    req.course.getMeetings(function(err, meetings) {
        res.json(meetings);
    });
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
