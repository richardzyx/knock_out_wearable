/**
 * Created by root on 4/10/16.
 */
"use strict";
var express = require('express');
var router = express.Router();

var Particle = require('particle-api-js');
var particle = new Particle();

router.get('/', function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    particle.login({username: username, password: password}).then(
        function onFulfilled(data){
            console.log('API call completed on promise resolve: ', data.body.access_token);
        }
    ).catch(function(err){
        console.log('API call completed on promise fail: ', err);
    });
});

module.exports = router;