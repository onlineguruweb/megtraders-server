var User = require('../../models/user');
var jwt = require('jsonwebtoken');

module.exports.checkHeader = function (req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).json({
            error: 'Not Authorised!'
        });
    }

    if (req.headers.authorization.indexOf("JWT ") != 0) {
        return res.status(403).json({
            error: 'Not a valid token!'
        });
    }

    jwt.verify(req.headers.authorization.split("JWT ")[1], req.app.get('secret'), function (err, decoded) {
        if (err) {
            return res.status(403).json({
                error: 'Sorry something went wrong with token!'
            });
        }

        User.findOne({
            "_id": decoded._id
        }).exec(function (err, user) {
            if (err) {
                return res.status(403).json({
                    error: 'Invalid User!'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    });

}
