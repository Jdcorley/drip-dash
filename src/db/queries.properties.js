const Property = require("../db/models/index").Property;

module.exports = {
    createProperty(property, callback){
        return Property.create(property)
        .then((property) => {
            callback(null, property);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getProperties(userId, callback){
        return Property.all({where: {userId: userId}})
        .then((properties) => {
            callback(null, properties);
        })
        .catch((err) => {
            callback(err);
        })
    },
    showProperty(id, callback){
        return Property.findById(id)
        .then((property) => {
            callback(null, property);
        })
        .catch((err) => {
            callback(err);
        })
    }
}