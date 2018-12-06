module.exports = {
    init(app){
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");
        const deviceRoutes = require("../routes/devices")

        if(process.env.NODE_ENV === "test") {
            const mockAuth = require("../../spec/support/mock-auth");
            mockAuth.fakeIt(app);
        }
        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(deviceRoutes);
    }
};