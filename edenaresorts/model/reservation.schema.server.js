var mongoose = require("mongoose");
var reservationSchema = mongoose.Schema({
    reservationnumber: String,
    checkindate:{type:Date, default: Date.now},
    checkoutdate:{type:Date, default: Date.now},
    people: {type:Number, default:1},
    firstname: String,
    lastname: String,
    status: {type: String, enum: ['BOOKED', 'CHECKEDIN', 'CANCELED'], default: "BOOKED"},
    phone: Number,
    email: String,
    stripetoken: String,
    stripecustomerid: String


}, {collection: "reservation"});
module.exports = reservationSchema;