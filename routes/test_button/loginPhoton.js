/**
 * Created by root on 4/10/16.
 */
"use strict";
var express = require('express');
var router = express.Router();

var Particle = require('particle-api-js');
var particle = new Particle();
var Particle_all = require('../../lib/particle_module');

router.use('*', function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    return particle.login({username: username, password: password}).then(
        function onFulfilled(data){
            console.log('API call completed on promise resolve: ', data.body.access_token);
            Particle_all.set_token(data.body.access_token);
            return data.body.access_token;
        }
    ).then(function(token){
        var devicesPr = particle.listDevices({ auth: token });
        return devicesPr.then(function onFulfilled(devices){
            console.log('Devices: ', devices.body[0].id);
            Particle_all.set_id(devices.body[0].id);
            return devices.body[0].id;
        }, function(err){
            throw err;
        });
    }).then(function(device_id){
        res.render('test_button', { title: 'KNOCKOUT' , message: device_id});
    }).catch(function(err){
        console.log('API call completed on promise fail: ', err);
    });
});


module.exports = router;