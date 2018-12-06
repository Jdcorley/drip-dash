var url = require("url");

module.exports = {
    init(app, session){
        const redis = require("redis");
        const redisStore = require("connect-redis")(session);

        if (process.env.REDIS_URL) {
            var redisURL = url.parse(process.env.REDIS_URL);
            var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
            client.auth(redisURL.auth.split(":")[1]);
            app.use(session({
                secret: process.env.cookieSecret,
                store: new redisStore({
                    url: process.env.REDIS_URL,
                    client: client
                }),
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: 2.52e+7 }
            }));
        } else {
            const client = redis.createClient();
            app.use(session({
                secret: process.env.cookieSecret,
                store: new redisStore({
                    host: "localhost",
                    port: 6379,
                    client: client
                }),
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: 2.52e+7 }
            }));
        }
    }
}