/**
 * Created by root on 4/24/16.
 */

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

exports.time = function (time) {
    return Promise.resolve(time).then(
        function onFulfilled(time){
            console.log("Fulfilled" + time);
            resolve(time);
        },
        function onRejected(){
            console.log("rej" + time);
            reject(time);
        }
    );
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
        },
        function onRejected(motor){

        }
    )
}