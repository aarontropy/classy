'use strict';

// Utilize Lo-Dash utility library
var _ = require('lodash');
var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

var all = {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL,
    templateEngine: 'swig',

    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: 'djkfg0Asd08S*&Dv9s9dkjsDv98vsdjv90',
    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'sessions'
};



module.exports = _.extend(
    all,
    require('./env/' + process.env.NODE_ENV + '.js') || {}
);