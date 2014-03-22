'use strict';

var pub = require('./controllers/public');
var admin = require('./controllers/admin');
var auth = require('./controllers/auth');
var sem = require('./controllers/semesters');

module.exports = function(app, passport) {

    app.get('/', pub.index);
    app.get('/admin/?', auth.requireRole('admin'), admin.dashboard);

    app.post('/login/?', auth.login(passport));
    app.post('/logout/?', auth.logout);


    app.get('/semesters', sem.all);
    app.post('/semesters', sem.create);
    app.get('/semesters/:semesterId', sem.read);
    app.put('/semesters/:semesterId', sem.update);
    app.del('/semesters/:semesterId', sem.delete);


    app.param('semesterId', sem.semester);

};