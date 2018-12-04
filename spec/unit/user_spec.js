const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {
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

    describe("#create()", () => {
        it("should should create a user with a valid email and password", (done) => {
            User.create({
                email: "user@example.com",
                password: "123456"
            })
            .then((user) => {
                expect(user.email).toBe("user@example.com");
                expect(user.id).toBe(1);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a user with an invalid email or password", (done) => {
            User.create({
                email: "Hello",
                password: "123456"
            })
            .then((user) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Validation error: must be a valid email");
                done();
            });
        });

        it("should not create a user with an email address already taken", (done) => {
            User.create({
                email: "user@example.com",
                password: "123456"
            })
            .then((user) => {
                User.create({
                    email: "user@example.com",
                    password: "123456"
                })
                .then((user) => {
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Validation error");
                    done();
                });
            });
        });
    });
});