const sequelize = require("../../src/db/models/index").sequelize;
const Property = require("../../src/db/models").Property;
const User = require("../../src/db/models").User;
const Device = require("../../src/db/models").Device;

describe("Property", () => {
    beforeEach((done) => {
        this.user;
        this.device;
        sequelize.sync({force: true})
        .then(() => {
            User.create({
                email: "user@example.com",
                password: "123456"
            })
            .then((user) => {
                this.user = user;
                Device.create({
                    userId: this.user.id,
                    deviceId: "1e0032123447343149111039",
                    productId: 7050
                })
                .then((device) => {
                    this.device = device;
                    done();
                })
            })
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })

    describe("#create()", () => {
        it("should create a property associated with a user and device", (done) => {
            Property.create({
                streetAddress: "123 Drip St",
                city: "Waterbury",
                state: "CT",
                zipCode: "06701",
                userId: this.user.id,
                deviceId: this.device.id,
            })
            .then((property) => {
                expect(property.id).toBe(1);
                expect(property.streetAddress).toBe("123 Drip St");
                expect(property.userId).toBe(this.user.id);
                expect(property.deviceId).toBe(this.device.id);
                done()
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })
    })
})

