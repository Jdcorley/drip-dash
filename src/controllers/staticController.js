module.exports = {
    index(req,res,next) {
        res.render("static/index");
    },
    dashboard(req,res,next) {
        res.render("static/dashboard");
    }
}