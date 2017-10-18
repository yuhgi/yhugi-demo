const User = require('./user');
module.exports = {
    getUser:(req) => {
        return req.session.user;
    }
};