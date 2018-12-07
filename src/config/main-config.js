require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport-config");
const redisConfig = require('./redis-config');
const enforce = require("express-sslify");


module.exports = {
    init(app, express){
        if(process.env.ssl !== "true"){
            app.use(enforce.HTTPS({ trustProtoHeader: true }));
            console.log("https");
        }
        app.set("views", viewsFolder);
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(expressValidator());
        app.use(express.static(path.join(__dirname, "..", "assets")));
        redisConfig.init(app, session);
        app.use(flash());
        passportConfig.init(app);
        app.use((req,res,next) => {
            res.locals.currentUser = req.user;
            res.locals.active = req.path.split('/')[1];
            next();
        })
    }
};