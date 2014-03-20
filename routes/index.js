'use strict';
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('public-index', { title: 'Express' });
};