const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const parcelSchema = new Schema({

    from: {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        }
    },

    to: {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        }
    },

    packageDetails: {
        pakingType: {
            type: String,
            enum: ['yourPacking', 'medtradersPacking'],
            default: 'yourPacking'
        },
        pakingSizeOrUnit: {
            type: String,
            enum: ['kg/cm', 'lb/in'],
            default: 'kg/cm'
        },
        numberOfPackage: {
            type: Number,
            default: 1
        },
        weightPerPackage: {
            type: Number,
            default: 1
        },
        dimensionsPerPackage: {
            type: Number,
            required: true
        },
        totalPackages: {
            type: Number,
            default: 1
        },
        totalWeight: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'delied', 'returned', 'completed'],
            required: true
        },
        trackingStatus: {
            type: String,
            enum: ['shipped', 'outForDelivery', 'delivered'],
            required: true
        },
        arrivesOn: {
            type: Date,
            required: true
        },
        deliveredBy: {
            type: Date,
            required: true
        }
    },

    insertedBy: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("parcel", parcelSchema, "parcels");