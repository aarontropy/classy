'use strict';

var pub = require('./controllers/public');
var admin = require('./controllers/admin');
var auth = require('./controllers/auth');
var sem = require('./controllers/semesters');
var users = require('./controllers/users');
var course = require('./controllers/courses');

module.exports = function(app, passport) {

    app.get('/', pub.index);
    app.get('/admin/', admin.dashboard); //auth.requireRole('admin'), admin.dashboard);

    app.post('/login', auth.login(passport));
    app.post('/logout', auth.logout);

    app.get('/semesters', pub.semesters);
    app.get('/semesters/:semesterId', pub.semesterDetail);;
    app.get('/semesters/:semesterId/:courseId', pub.courseDetail);


    // ==== API ================================================================
    app.get('/api/semesters', sem.all);
    app.post('/api/semesters', sem.create);
    app.get('/api/semesters/:semesterId', sem.read);
    app.put('/api/semesters/:semesterId', sem.update);
    app.del('/api/semesters/:semesterId', sem.delete);
    app.get('/api/semesters/:semesterId/courses', sem.courses);
    app.get('/api/semesters/:semesterId/meetings', sem.meetings);

    app.get('/api/courses', course.all);
    app.post('/api/courses', course.create);
    app.get('/api/courses/:courseId', course.read);
    app.put('/api/courses/:courseId', course.update);
    app.del('/api/courses/:courseId', course.delete);
    app.get('/api/courses/:courseId/meetings', course.meetings);

    app.get('/api/users', users.all);
    app.post('/api/users', users.create);
    app.get('/api/users/me', users.me);
    app.get('/api/users/:userId', users.read);
    app.put('/api/users/:userId', users.update);
    app.del('/api/users/:userId', users.delete);
    app.post('/api/users/:userId/registrations', users.createRegistration);
    app.del('/api/users/:userId/registrations', users.deleteRegistration);

    // ==== PARAMETERS =========================================================
    app.param('semesterId', sem.semester);
    app.param('courseId', course.course);
    app.param('userId', users.user);

};