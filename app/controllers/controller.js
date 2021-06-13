const User = require('../models/user');
const Parcel = require('../models/parcel');
const Query = require('../models/customerQuery');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const responseHandlier = require('../libs/response/status');
const validator = require('validator');

// to insert user credentials in db
module.exports.register_user = (req, res) => {
    console.log('------Register API call---', req.body);
    // res.status(200).send("api called")

    if (!req.body.email) {
        return responseHandlier.response(false, " Email is required.", res);
    }

    if (!validator.isEmail(req.body.email)) {
        return responseHandlier.response(false, "Please enter valid email address.", res);
    }

    let query = {
        email: req.body.email
    }

    User.findOne(query, function (err, user) {
        if (err) {
            return res.json(err)
        }

        if (user) {
            return responseHandlier.response(false, "This email address has already been registered.", res);
        }

        let newUser = new User({
            email: req.body.email,
            password: req.body.password,
        });
        newUser.save(function (err, user) {
            if (err) {
                res.json(err)
            } else {
                var token = generateToken(user, req);
                res.json({
                    token: token,
                    id: user._id
                });
            }
        });

    });
}


// to authenticate user's credentials in db
module.exports.login = function (req, res) {
    if (!req.body.email) {
        return responseHandlier.response(false, " Email is required.", res);
    }

    if (!validator.isEmail(req.body.email)) {
        return responseHandlier.response(false, "Please enter valid email address.", res);
    }

    let query = {
        email: req.body.email
    }

    User.findOne(query, function (err, user) {
        if (err) {
            return res.json(err)
        }

        if (!user) {
            return responseHandlier.response(false, "Details not recognised, please try again.", res);
        }

        console.log("\n\n\n\n @@ user", user, "\n\n\n\n @")

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
                var token = generateToken(user, req);
                return res.json({
                    token: token,
                    id: user._id,
                    email: user.email
                });
            }
            return responseHandlier.response(false, "The email or password do not match.", res);
        });

    });

}


//to add parcel details in db
module.exports.addParcel = function (req, res) {

    console.log("\n\n\n\n\n\n req.decoded._id", req.decoded._id, "\n\n\n\n\n ")

    let newParcel = new Parcel({
        from: {
            userName: req.body.from.userName,
            email: req.body.from.email,
            mobileNumber: req.body.from.mobileNumber,
            address: req.body.from.address,
            country: req.body.from.country,
            pincode: req.body.from.pincode
        },

        to: {
            userName: req.body.to.userName,
            email: req.body.to.email,
            mobileNumber: req.body.to.mobileNumber,
            address: req.body.to.address,
            country: req.body.to.country,
            pincode: req.body.to.pincode
        },

        packageDetails: {
            pakingType: req.body.packageDetails.pakingType,
            pakingSizeOrUnit: req.body.packageDetails.pakingSizeOrUnit,
            numberOfPackage: req.body.packageDetails.numberOfPackage,
            weightPerPackage: req.body.packageDetails.weightPerPackage,
            dimensionsPerPackage: req.body.packageDetails.dimensionsPerPackage,
            totalPackages: req.body.packageDetails.totalPackages,
            totalWeight: req.body.packageDetails.totalWeight,
            status: req.body.packageDetails.status,
            trackingStatus: req.body.packageDetails.trackingStatus,
            arrivesOn: req.body.packageDetails.arrivesOn,
            deliveredBy: req.body.packageDetails.deliveredBy
        },

        insertedBy: ObjectId(req.decoded._id)
    });

    newParcel.save(function (err, user) {
        if (err) {
            res.json(err)
        } else {
            res.json({
                message: 'Successfully Inserted'
            });
        }
    });

}


//to get all parcel details in db
module.exports.getAllParcel = function (req, res) {

    console.log("\n\n\n\n\n\n req.decoded._id", req.decoded._id, "\n\n\n\n\n ")

    Parcel.find({}, function (err, parcels) {
        if (err) {
            res.json(err)
        } else {
            res.json({
                data: parcels
            });
        }
    });

}


//to get parcel details by id in db
module.exports.getByParcelId = function (req, res) {

    console.log("\n\n\n\n\n\n req.decoded._id", req.decoded._id, "\n\n\n\n\n ", req.query, "\n\n\n\n END@@")

    if (!req.query.parcelId) {
        return responseHandlier.response(false, " Parcel Id is required.", res);
    }

    const parcelId = {
        _id: ObjectId(req.query.parcelId)
    }

    console.log("\n\n\n\n\n parcelId", parcelId)

    Parcel.findOne(parcelId, function (err, parcelDetails) {
        if (err) {
            res.json(err)
        } else {
            res.json({
                data: parcelDetails
            });
        }
    });

}


//to add customer query details in db
module.exports.addCustomerQuery = function (req, res) {

    console.log("\n\n\n\n\n\n req.decoded._id", req.decoded._id, "\n\n\n\n\n ")

    let newQuery = new Query({
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        customerMobileNumber: req.body.customerMobileNumber,
        address: req.body.address,
        queryDescription: req.body.queryDescription,
        queryStatus: req.body.queryStatus,
        insertedBy: ObjectId(req.decoded._id)
    });

    newQuery.save(function (err, query) {
        if (err) {
            res.json(err)
        } else {
            res.json({
                message: 'Successfully Inserted'
            });
        }
    });

}


//to get all customer query details in db
module.exports.getAllCustomerQuery = function (req, res) {

    console.log("\n\n\n\n\n\n req.decoded._id", req.decoded._id, "\n\n\n\n\n ")

    Query.find({}, function (err, Querys) {
        if (err) {
            res.json(err)
        } else {
            res.json({
                data: Querys
            });
        }
    });

}


//to get customer query details by id in db
module.exports.getByQueryId = function (req, res) {

    console.log("\n\n\n\n\n\n req.decoded._id", req.decoded._id, "\n\n\n\n\n ", req.query, "\n\n\n\n END@@")

    if (!req.query.customerQueryId) {
        return responseHandlier.response(false, " Parcel Id is required.", res);
    }

    const customerQueryId = {
        _id: ObjectId(req.query.customerQueryId)
    }

    if (req.query.email) {
        customerQueryId.customerEmail = req.query.email;
    }

    console.log("\n\n\n\n\n customerQueryId", customerQueryId)

    Query.find(customerQueryId, function (err, customerQueryDetails) {
        if (err) {
            res.json(err)
        } else {
            res.json({
                data: customerQueryDetails
            });
        }
    });

}

// common function to generate token
generateToken = function (user, req) {
    user = {
        email: user.email,
        _id: user._id
    }
    return jwt.sign(user, req.app.get('secret'));
}
