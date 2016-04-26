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

    // .then(function(devices){
    //     device_id = devices.body[0].id;
    //     // var fnPr = particle.callFunction({ deviceId: device_id, name: 'change_rate', argument: '10', auth: token });
    //     res.render('test_button', { title: 'KNOCKOUT' , message: device_id});
    //     // resolve();
    //     // return device_id;
    //     // return fnPr.then(function(suc) {
    //     //     console.log("fn0 complete");
    //     //     return device_id;
    //     // });
    // })
    // .then(function(device_id){
    //     var fnPr = particle.callFunction({ deviceId: device_id, name: 'change_rate', argument: '40', auth: token });
    //
    //     return fnPr.then(function(suc) {
    //         console.log("fn0 complete");
    //         return device_id;
    //     });
    // }).then(function(device_id){
    //     var fnPr2 = particle.callFunction({ deviceId: device_id, name: 'parse_motor', argument: '02010000040001', auth: token });
    //
    //     return fnPr2.then(function(suc) {
    //         console.log("fn1 complete");
    //         res.render('test_button', { title: 'KNOCKOUT' , message: JSON.stringify(suc)});
    //     }, function(err) {
    //         throw err;
    //     });
    // })
});


module.exports = router;