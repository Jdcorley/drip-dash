const request = require("request");
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Device = require("../../src/db/models").Device;
const base = "http://localhost:3000/devices";

describe("routes : devices", () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })

    describe("guest attempting to access devices", () => {
        describe("GET /devices", () => {
            it("should redirect if not logged in", (done) => {
                request.get(base, (err, res, body) => {
                    expect(body).toContain("Sign In");
                    done();
                })
            })
        })
    })

    describe("logged in user performing CRUD actions on device", () => {
        beforeEach((done) => {
            request.get({
                url: "http://localhost:3000/auth/fake",
                form: {
                    email: "user@example.com",
                    userId: 1
                }
            }, (err, res, body) => {
                done();
            })
        })

        describe("GET /devices", () => {
            it("should return status code 200 if logged in", (done) => {
                request.get(base, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(body).toContain("Registered Devices");
                    done();
                })
            })
        })

        describe("GET /devices/new", () => {
            it("should return status code 200 if logged in", (done) => {
                request.get(`${base}/new`, (err, res, body) => {
                    expect(res.statusCode).toBe(200);
                    expect(body).toContain("Device Registration");
                    done();
                })
            })
        })
    })
})