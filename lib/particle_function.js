/**
 * Created by root on 4/24/16.
 */

var Particle_all = require('./particle_module');
var Particle = require('particle-api-js');
var particle = new Particle();

var motor_status = {
    motor1: 'on',
    motor2: 'on',
    motor3: 'on',
    motor4: 'on',
    motor5: 'on',
    motor6: 'on',
    motor7: 'on',
    motor8: 'on'
};

var time_sequence = {
    '0:05': {name: 'change_rate', argument: '10'},
    '0:07': {name: 'parse_motor', argument: '02010000040001'},
    '0:10': {name: 'change_rate', argument: '40'}
};

exports.time = function (time) {
    return Promise.resolve(time).then(
        function onFulfilled(time){
            if (time in time_sequence){
                console.log("Fulfilled" + time);
                return particle_execute(time);
            }else {
                resolve();
            }
        },
        function onRejected(){
            console.log("rej" + time);
            reject(time);
        }
    );
};

function particle_execute(time){
    return Promise.resolve().then(
        function onFulfilled(){
            console.log(time_sequence[time].name);
            console.log(time_sequence[time].argument);
            var fnPr = particle.callFunction({ deviceId: Particle_all.deviceID, name: time_sequence[time].name, argument: time_sequence[time].argument, auth: Particle_all.token });

            return fnPr.then(function onFulfilled(suc) {
                console.log("fn complete");
                resolve();
            }, function onRej(err){
                console.log(err);
                reject();
            });
        },
        function onRejected(err){
            console.log("Promise particle rejected");
            console.log(err);
        }
    )
};

exports.toggle = function (motor) {
    return Promise.resolve(motor).then(
        function onFulfilled(motor){
            if (motor_status[motor] == 'on'){
                motor_status[motor] = 'off';
            }else {
                motor_status[motor] = 'on'
            }
            console.log("in motor promise: " + motor + " is now " +motor_status[motor]);
            resolve();
        }
    )
};