'use strict';

exports.index = function(req, res){
    res.render('public-index', { title: 'Express' });
};