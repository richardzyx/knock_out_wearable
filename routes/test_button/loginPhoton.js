/**
 * Created by root on 4/10/16.
 */
"use strict";
var express = require('express');
var router = express.Router();

var Particle = require('particle-api-js');
var particle = new Particle();

router.use('*', function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    particle.login({username: username, password: password}).then(
        function onFulfilled(data){
            console.log('API call completed on promise resolve: ', data.body.access_token);
            return data.body.access_token;
        }
    ).then(function(token){
        var devicesPr = particle.listDevices({ auth: token });
        devicesPr.then(function onFulfilled(devices){
            console.log('Devices: ', devices);
            return devices;
        }, function(err){
            throw err;
        });

    }).catch(function(err){
        console.log('API call completed on promise fail: ', err);
    });
});

module.exports = router;