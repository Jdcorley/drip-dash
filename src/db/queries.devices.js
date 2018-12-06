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
    }
}