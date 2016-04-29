/**
 * Created by root on 4/24/16.
 */

var Particle_all = require('./particle_module');

var Particle = require('particle-api-js');
var particle = new Particle();
var Converter = require("csvtojson").Converter;
var converter = new Converter({checkType: false});
var _ = require ("underscore");
var tmp_time_json;


converter.fromFile("./public/test_csv_black1.csv",function(err,result){
    if (err){
        console.log(err);
    }else{
        // console.log(result);
        tmp_time_json = _.groupBy(result, function(obj){ return obj.Time; });
        // console.log(tmp_time_json);
    }
});


var motor_status = {
    motor00: 'on',
    motor01: 'on',
    motor02: 'on',
    motor03: 'on',
    motor04: 'on',
    motor05: 'on',
    motor06: 'on',
    motor07: 'on',
    motor08: 'on'
};

// var time_sequence = {
//     '0:05': {name: 'change_rate', argument: '10'},
//     '0:06': {name: 'parse_motor', argument: '02010000040001'},
//     '0:07': {name: 'change_rate', argument: '40'}
// };

exports.time = function (time) {
    return Promise.resolve(time).then(
        function onFulfilled(time){
            if (time in tmp_time_json){
                var to_execute = [];
                var function_json = _.groupBy(tmp_time_json[time], function(obj){return obj.Name});
                console.log(function_json);
                _.each(function_json, function(value, key){
                    var tmp_name_argument = {name: key, argument: ''};
                    _.each(value, function(obj){
                        var motor = "motor" + obj.MotorID;
                        console.log(motor);
                        if(motor_status[motor] == 'on') {
                            tmp_name_argument.argument += obj.String + '/';
                        }
                    });
                    if(tmp_name_argument.argument != ''){
                        to_execute.push(tmp_name_argument);
                    }
                });
                return particle_execute(to_execute);
            }else {
                resolve();
            }
        },
        function onRejected(){
            // Almost impossible to see this message
            console.log("rej" + time);
        }
    );
};

function particle_execute(to_execute){
    return Promise.resolve(to_execute).then(
        function onFulfilled(to_execute){
            console.log(to_execute);
            var promise_array = [];
            var p_fun = function(name_argument){return particle_call(name_argument)};
            _.each(to_execute, function(name_argument){
                promise_array.push(p_fun(name_argument));
            });
            return Promise.all(promise_array);
        },
        function onRejected(err){
            console.log("Promise particle rejected");
            throw err;
        }
    ).catch(function(err){
        console.log("particle execute error");
        console.log(err);
        throw err;
    }).then(function(result){
        console.log("response successfully");
        return result;
    });
}

function particle_call(name_argument){
    return Promise.resolve(name_argument).then(
        function onFulfilled(name_argument) {
            console.log("someone called particle call function");
            var fnPr = particle.callFunction({
                deviceId: Particle_all.deviceID,
                name: name_argument.name,
                argument: name_argument.argument,
                auth: Particle_all.token
            });

            return fnPr.then(function onFulfilled(suc) {
                console.log("fn complete");
                resolve();
            }, function onRej(err) {
                console.log("particle call error");
                // console.log(err);
                throw err;
            });
        }
    )
}

exports.toggle = function (motor) {
    return Promise.resolve(motor).then(
        function onFulfilled(motor){
            console.log("received motor:" + motor);
            motor = motor.substr(0, motor.length-1) + '0' + motor.substr(motor.length-1);
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