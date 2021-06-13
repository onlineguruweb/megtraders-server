const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerQuerySchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerMobileNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    queryDescription: {
        type: String,
        required: true
    },
    queryStatus: {
        type: String,
        enum: ['active', 'incomplete', 'resolved'],
        default: 'active'
    },
    insertedBy: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("customerQuery", customerQuerySchema, "customerQuerys");
