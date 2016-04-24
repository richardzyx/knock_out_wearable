/**
 * Created by root on 4/24/16.
 */

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