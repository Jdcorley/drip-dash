module.exports = {
    init(app, session){
        const redis = require("redis");
        const redisStore = require("connect-redis")(session);
        const client = redis.createClient();

        if (process.env.REDIS_URL) {
            app.use(session({
                secret: process.env.cookieSecret,
                store: new redisStore({
                    url: process.env.REDIS_URL,
                    client: client
                }),
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: 1.21e+9 }
            }));
        } else {
            app.use(session({
                secret: process.env.cookieSecret,
                store: new redisStore({
                    host: "localhost",
                    port: 6379,
                    client: client
                }),
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: 1.21e+9 }
            }));
        }
    }
}