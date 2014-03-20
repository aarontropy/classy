'use strict';

var pub = require('./controllers/public');

module.exports = function(app) {

    app.get('/', pub.index);

};