'use strict';

var pub = require('./controllers/public');
var admin = require('./controllers/admin');

module.exports = function(app) {

    app.get('/', pub.index);
    app.get('/admin/?', admin.dashboard);

};