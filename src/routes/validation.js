module.exports = {
    validateUsers(req, res, next) {
        if(req.method === "POST"){
            req.checkBody("email", "must be valid email").isEmail();
            req.checkBody("password", "must be at least 6 characters in length").isLength({ min: 6});
            req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
        }

        const errors = req.validationErrors();

        if(errors){
            req.flash("error", errors);
            return res.redirect(req.headers.referer);
        } else {
            return next();
        }
    },
    validateDeviceClaim(req, res, next) {
        if(req.method === "POST"){
            req.checkBody("deviceId", "must be 24 chracters in length").isLength({min: 24, max: 24});
        }

        const errors = req.validationErrors();

        if(errors) {
            req.flash("error", errors);
            return res.redirect(req.headers.referer);
        } else {
            return next();
        }
    }
}