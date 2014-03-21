'use strict';

var pub = require('./controllers/public');
var admin = require('./controllers/admin');
var auth = require('./controllers/auth');

module.exports = function(app, passport) {

    app.get('/', pub.index);
    app.get('/admin/?', admin.dashboard);

    app.post('/login/?', auth.login(passport));

};