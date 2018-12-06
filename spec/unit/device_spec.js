const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Device = require("../../src/db/models").Device;

describe("Device", () => {
    beforeEach((done) => {
        this.user;
        sequelize.sync({force: true})
        .then(() => {
            User.create({
                email: "user@example.com",
                password: "123456"
            })
            .then((user) => {
                this.user = user;
                done();
            })
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })

    describe("#create()", () => {
        it("should create a device with a valid id", (done) => {
            Device.create({
                userId: this.user.id,
                deviceId: "1e0032123447343149111039",
                productId: 7050
            })
            .then((device) => {
                expect(device.id).toBe(1);
                expect(device.userId).toBe(this.user.id);
                expect(device.deviceId).toBe("1e0032123447343149111039");
                expect(device.productId).toBe(7050);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })
    })
})