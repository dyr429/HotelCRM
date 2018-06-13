var mongoose = require("mongoose");
var reservationSchema = require("./reservation.schema.server");
var reservationModel = mongoose.model("ReservationModel", reservationSchema);


reservationModel.createReservation = createReservation;
reservationModel.updateReservation = updateReservation;
reservationModel.findReservationByReserveNo = findReservationByReserveNo;
reservationModel.findReservationByName = findReservationByName;
reservationModel.getAllReservations = getAllReservations;
reservationModel.deleteReservation = deleteReservation;

module.exports = reservationModel;



function createReservation() {
    var reservationNo = randomString(32,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var reservation = { "type": "BOOKED", "reservationnumber": reservationNo};
    return reservationModel
        .create(reservation)
        .then(function (resv) {
            return resv;
        });
}

function updateReservation(resvId, resv) {
    return reservationModel.updateOne({_id: resvId},
        {$set: resv});
}

function findReservationByReserveNo(resvNumber) {
    return reservationModel.findOne({reservationnumber: resvNumber});
}


function findReservationByName(firstname, lastname) {
    return reservationModel.find({firstname: firstname, lastname: lastname});
}

function getAllReservations() {
    return reservationModel.find();
}

function deleteReservation(resvId) {
    return reservationModel
        .remove({_id: resvId});

}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
