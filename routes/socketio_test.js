/**
 * Created by root on 4/24/16.
 */
// var io = require('socket.io')(80);
//
// io.on('connection', function (socket) {
//     socket.on('time', function (msg) {
//         console.log(msg);
//     });
//     socket.on('disconnect', function () { });
// });

exports.time_handler = function (time) {
    console.log(time.time)
};

exports.error_handler = function () {
    console.log("Socket Disconnected!")
};