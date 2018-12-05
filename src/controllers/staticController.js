module.exports = {
    index(req,res,next) {
        res.render("static/index");
    },
    dashboard(req,res,next) {
        console.log(req.session);
        res.render("static/dashboard");
    }
}