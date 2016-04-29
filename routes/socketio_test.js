/**
 * Created by root on 4/24/16.
 */

var particle_function = require('../lib/particle_function');

exports.time_handler = function (time) {
    console.log(time.time);
    return particle_function.time(time.time);
};

exports.error_handler = function () {
    console.log("Socket Disconnected!")
};

exports.toggle_handler = function (data) {
    console.log("toggle handler received:"+data);
    return particle_function.toggle(data.motor);
};