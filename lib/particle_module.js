/**
 * Created by root on 4/25/16.
 */
var Particle_all = module.exports = {
    token: 0,
    deviceID: 0,
    set_token: function(tmp_token){
        Particle_all.token = tmp_token;
    },
    set_id: function(tmp_id){
        Particle_all.deviceID = tmp_id;
    }
};