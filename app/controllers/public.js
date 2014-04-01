'use strict';

var mongoose = require('mongoose'),
    Semesters = mongoose.model('Semester'),
    Courses = mongoose.model('Course');

exports.index = function(req, res){
    res.render('public/index', { title: 'Express' });
};

exports.semesters = function(req, res) {
    Semesters.find({visible: true}).exec(function (err, semesters) {
        console.log(semesters)
        res.render('public/semesters', { semesters: semesters});
    });
   
};

exports.semesterDetail = function(req, res) {
    Courses.find({semester: req.semester._id}).exec(function(err, courses) {
        res.render('public/semester-detail', {semester: req.semester, courses: courses} );
    });
};

exports.courseDetail = function(req, res) {
    res.render('public/course-detail', {semester: req.semester, course: req.course} );
};