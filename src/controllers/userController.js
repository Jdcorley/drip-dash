const userQueries = require("../db/queries.users");
const passport = require("passport");
const particle = require("../particle/helper");

module.exports = {
    signUp(req, res, next) {
        res.render("users/signup");
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
                    req.flash("notice", "You've successfully signed in!")
                    res.redirect("/dashboard");
                })
                particle.createUser(user.email, (err, response) => {
                    if(response.error){
                        console.log(response.error)
                    } else {
                        console.log(response);
                    }
                })
            }
        })
    }
}