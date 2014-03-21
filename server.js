'use strict';
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    engines = require('consolidate'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    fs = require('fs');


// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config/config');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));

// Config db and bootstrap models
var db = mongoose.connect(config.db);

var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

// use swig and make .html the default view extension
app.engine('html', engines.swig);
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('LAKJOPA*SdygfLUf98dsl230dkKL'));
app.use(express.session());
app.use(function(req, res, next) {
    res.locals.appname = 'Classy';
    next();
});

// Use passport session
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);



// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

// Get the router
require('./app/router')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
