var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    google: {
        id:    String,
        token: String
    },
    phone: Number,

    reservations: [{type: mongoose.Schema.Types.ObjectId, ref:"reservationModel"}]


}, {collection: "user"});
module.exports = userSchema;