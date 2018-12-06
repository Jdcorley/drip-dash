const Particle = require("particle-api-js");
const deviceQueries = require("../db/queries.devices");

module.exports = {
    showDevices(req,res,next){
        res.render("devices/index");
    },
    claimDevice(req, res, next){
        const particle = new Particle();
        particle.claimDevice({
            deviceId: req.body.deviceId,
            auth: req.session.particle_access_token
        })
        .then(function(data){
            console.log('device claim data:', data.body);
            if(!data.body.id) {
                req.flash("notice", "You have already claimed that device.");
                return res.redirect(req.headers.referer);
            }
            const device = {
                deviceId: data.body.id,
                productId: data.body.product_id,
                userId: req.user.id
            }
            deviceQueries.createDevice(device, (err) => {
                if(err) {
                    console.log(err);
                    req.flash("error", err);
                    res.redirect(req.headers.referer);
                } else {
                    req.flash("notice", "Device successfully claimed!");
                    res.redirect(req.headers.referer);
                }
            })
        }, function(err){
            console.log('device claim error', err);
            req.flash("error", "Error claiming device.  Ensure device is powered on, connected, and device id is valid");
            res.redirect(req.headers.referer);
        })
    }
}