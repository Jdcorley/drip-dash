const request = require("request");
const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Device = require("../../src/db/models").Device;
const Property = require("../../src/db/models").Property;
const base = "http://localhost:3000/properties"

describe("routes : properties", () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe("logged in user performing CRUD actions on property", () => {
        beforeEach((done) => {
            request.get({
                url: "http://localhost:3000/auth/fake",
                form: {
                    email: "user@example.com",
                    userId: 1
                }
            }, (err, res, body) => {
                done();
            });
        });

        describe("GET /properties", () => {
            it("should return status code 200 if logged in", (done) => {
                request.get(base, (err,res,body) => {
                    expect(res.statusCode).toBe(200);
                    expect(body).toContain("Add Property");
                    done();
                });
            });
        });

        describe("GET /properties/new", () => {
            it("should render a form for adding a new property", (done) => {
                request.get(`${base}/new`, (err,res,body) => {
                    expect(res.statusCode).toBe(200);
                    expect(body).toContain("Add Property");
                    expect(body).toContain("Address");
                    done();
                });
            });
        });
    });
});