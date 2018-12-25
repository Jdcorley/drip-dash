const propertyQueries = require("../db/queries.properties.js");
const deviceQueries = require("../db/queries.devices.js");

module.exports = {
    index(req, res, next){
        propertyQueries.getProperties(req.user.id, (err, properties) => {
            if(err) {
                console.log(err);
                req.flash("error", err);
                res.redirect(req.headers.referer);
            } else {
                res.render("properties/index", {properties});
            }
        })
    },
    new(req, res, next){
        deviceQueries.getDevices(req.user.id, (err, devices) => {
            if(err) {
                console.log(err);
                req.flash("error", err);
                res.redirect(req.headers.referer);
            } else {
                res.render("properties/new", {devices});
            }
        })
    },
    create(req, res, next){
        const property = {
            userId: req.user.id,
            streetAddress: req.body.address,
            streetAddress2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zip,
            deviceId: req.body.device
        }
        propertyQueries.createProperty(property, (err, property) => {
            if(err) {
                console.log(err);
                req.flash("error", err);
                res.redirect(req.headers.referer);
            } else {
                req.flash("Property added successfully.");
                res.redirect("/properties");
            }
        })
    },
    show(req, res, next){
        propertyQueries.showProperty(req.params.id, (err, property) => {
            if(err) {
                console.log(err);
                req.flash("error", err);
                res.redirect(req.headers.referer);
            } else {
                res.render("properties/show", {property});
            }
        })
    },
    destroy(req, res, next){
        propertyQueries.deleteProperty(req, (err, property) => {
            if(err) {
                res.redirect(500, `/properties/${req.params.id}`);
            } else {
                res.redirect(303, `/properties`);
            }
        })
    }
}