const userQueries = require("../db/queries.users");
const passport = require("passport");
const particle = require("../particle/helper");

module.exports = {
    signUp(req, res, next) {
        res.render("users/signup");
    },
    signInForm(req, res, next) {
        res.render("users/signin");
    },
    create(req, res, next){
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        };
        userQueries.createUser(newUser, (err, user) => {
            if(err){
                req.flash("error", err);
                res.redirect("/users/signup");
            } else {
                passport.authenticate("local")(req, res, () => {
                    particle.createUser(user.email, (err, response) => {
                        req.session.particle_access_token = response.access_token;
                        req.session.particle_refresh_token = response.refresh_token;
                        req.flash("notice", "You've successfully signed in!")
                        res.redirect("/dashboard");
                    })
                })
            }
        })
    },
    signIn(req, res, next) {
        passport.authenticate("local")(req, res, () => {
            if(!req.user) {
                req.flash("notice", "Sign in failed. Please try again.")
                res.redirect("/users/signin");
            } else {
                particle.getAccessToken(req.user.email, (err, response) => {
                    req.session.particle_access_token = response.access_token;
                    req.session.particle_refresh_token = response.refresh_token;
                    req.flash("notice", "You've successfully signed in!");
                    res.redirect("/dashboard");
                })
            }
        })
    },
    signOut(req, res, next) {
        req.logout();
        res.redirect("/");
        req.session.destroy();
    }
}