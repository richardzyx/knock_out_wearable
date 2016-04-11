/**
 * Created by root on 4/10/16.
 */
"use strict";
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('test_button', { title: 'KnockOut' });
});

var postPhoton = require('./test_button/postPhoton')

router.use('/', function(req, res, next) {
    next();
});

router.use('/postPhoton', postPhoton);


module.exports = router;