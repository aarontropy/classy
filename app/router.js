'use strict';

var pub = require('./controllers/public');
var admin = require('./controllers/admin');
var auth = require('./controllers/auth');
var sem = require('./controllers/semesters');
var users = require('./controllers/users');

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

    app.get('/users', users.all);
    app.post('/users', users.create);
    app.get('/users/:user', users.read);
    app.put('/users/:user', users.update);
    app.del('/users/:user', users.delete);

    app.param('semseterId', sem.semester);
    app.param('userId', users.user);

};