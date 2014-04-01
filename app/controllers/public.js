'use strict';

var mongoose = require('mongoose'),
    Semesters = mongoose.model('Semester');

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
    res.render('public/semester-detail', {semester: req.semester} );
};

exports.courseDetail = function(req, res) {
    res.render('public/course-detail', {semester: req.semester, course: req.course} );
};