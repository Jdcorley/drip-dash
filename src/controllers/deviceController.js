const Particle = require("particle-api-js");
const deviceQueries = require("../db/queries.devices");

module.exports = {
    index(req, res, next){
        deviceQueries.getDevices(req.user.id, (err, devices) => {
            if(err){
                console.log(err);
                res.redirect(500, "static/index");
            } else {
                res.render("devices/index", {devices});
            }
        })
    },
    new(req, res, next){
        res.render("devices/new");
    },
    claim(req, res, next){
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
                    res.redirect("/devices");
                }
            })
        }, function(err){
            console.log('device claim error', err);
            req.flash("error", "Error claiming device.  Ensure device is powered on, connected, and device id is valid");
            res.redirect(req.headers.referer);
        })
    },
    show(req, res, next){
        const particle = new Particle();
        particle.getDevice({
            deviceId: req.params.id,
            auth: req.session.particle_access_token
        })
        .then(
            function(data) {
                const device = data.body;
                res.render("devices/show", {device});
            },
            function(err){
                console.log(err);
                req.flash("error", "Error getting device details. Please try again.");
                res.redirect(rew.header.referer);
            }
        )
    }
}