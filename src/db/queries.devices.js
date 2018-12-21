const Device = require("./models").Device;

module.exports = {
    createDevice(device, callback){
        return Device.create(device)
        .then((device) => {
            callback(null, device);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getDevices(userId, callback){
        return Device.all({where: {userId: userId}})
        .then((devices) => {
            callback(null, devices);
        })
        .catch((err) => {
            callback(err);
        })
    }
}