'use strict';
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var engines = require('consolidate');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));

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
    res.locals.appname = "Classy";
    next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

// Get the router
require('./app/router')(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
