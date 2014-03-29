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


    // ==== API ================================================================
    app.get('/semesters', sem.all);
    app.post('/semesters', sem.create);
    app.get('/semesters/:semesterId', sem.read);
    app.put('/semesters/:semesterId', sem.update);
    app.del('/semesters/:semesterId', sem.delete);
    app.get('/semesters/:semesterId/courses', sem.courses);
    app.get('/semesters/:semesterId/events', sem.courses);

    app.get('/courses', course.all);
    app.post('/courses', course.create);
    app.get('/courses/:courseId', course.read);
    app.put('/courses/:courseId', course.update);
    app.del('/courses/:courseId', course.delete);
    app.get('/courses/:courseId/meetings', course.meetings);

    app.get('/users', users.all);
    app.post('/users', users.create);
    app.get('/users/me', users.me);
    app.get('/users/:user', users.read);
    app.put('/users/:user', users.update);
    app.del('/users/:user', users.delete);

    app.param('semesterId', sem.semester);
    app.param('courseId', course.course);
    app.param('userId', users.user);

};