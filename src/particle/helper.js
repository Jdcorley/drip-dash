const request = require("request");
const base = "https://api.particle.io/"

module.exports = {
    createUser(email, callback){
        let options =  {
            url: `${base}v1/products/${process.env.PARTICLE_PRODUCT_ID}/customers`,
            form: {
                client_id: process.env.PARTICLE_CLIENT_ID,
                client_secret: process.env.PARTICLE_SECRET,
                email: email,
                no_password: true
            }
        }
        request.post(options, (err, res, body) => {
            if(err) {
                callback(err);
            } else {
                const response = JSON.parse(body);
                callback(null, response);
            }
        })
    },
    getAccessToken(email, callback){
        let options = {
            url: `${base}oauth/token`,
            form: {
                client_id: process.env.PARTICLE_CLIENT_ID,
                client_secret: process.env.PARTICLE_SECRET,
                grant_type: 'client_credentials',
                scope: `customer=${email}`
            }
        }
        request.post(options, (err, res, body) => {
            if(err) {
                callback(err);
            } else {
                const response = JSON.parse(body);
                callback(null, response);
            }
        })
    }
}