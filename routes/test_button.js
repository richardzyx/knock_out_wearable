/**
 * Created by root on 4/10/16.
 */
"use strict";
var express = require('express');
var router = express.Router();

var postPhoton = require('./test_button/postPhoton');
var loginPhoton = require('./test_button/loginPhoton')

router.use('/', function(req, res, next) {
    next();
});

router.use('/postPhoton', postPhoton);
router.use('/loginPhoton', loginPhoton);

module.exports = router;