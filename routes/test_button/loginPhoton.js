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
    var token;
    particle.login({username: username, password: password}).then(
        function onFulfilled(data){
            console.log('API call completed on promise resolve: ', data.body.access_token);
            token = data.body.access_token;
            return token;
        }
    ).then(function(token){
        var devicesPr = particle.listDevices({ auth: token });
        return devicesPr.then(function onFulfilled(devices){
            console.log('Devices: ', devices.body[0].id);
            return devices;
        }, function(err){
            throw err;
        });
    }).then(function(devices){
        var device_id = devices.body[0].id;
        var fnPr = particle.callFunction({ deviceId: device_id, name: 'click', argument: 'string', auth: token });

        return fnPr.then(function(data) {
            console.log('Function called succesfully:', data);
            res.render('test_button', { title: 'KNOCKOUT' , message: JSON.stringify(data)});
        }, function(err) {
            console.log('An error occurred:', err);
            throw err;
        });
    }).catch(function(err){
        console.log('API call completed on promise fail: ', err);
    });
});

module.exports = router;