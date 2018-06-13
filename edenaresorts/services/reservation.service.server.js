var app = require("../../express");
var stripe = require("stripe")("sk_test_D8L9ZFyO3IkOkIEOXWwbV18Z");

var reservationModel = require("../model/reservation.model.server");

//post
app.post("/reservationapi/create", createReservation);
app.post("/reservationapi/charge", chargeCard);
//get
app.get("/reservationapi/byresvno/:resvno", findReservationByReserveNo);
app.get("/reservationapi/byname/:firstname/:lastname", findReservationByName);
app.get("/reservationapi/all", getAllReservations);
app.get("/reservationapi/chargemoney/:resvno/:amount", chargeMoney)
//put
app.put("/reservationapi/resv/:resvid", updateReservation);
//delete
app.delete("/reservationapi/resv/:resvid", deleteReservation);


function chargeMoney(req,res) {
    var resvNo = req.params.resvno;
    var amount = req.params.amount;

    reservationModel.findReservationByReserveNo(resvNo)
        .then(function (resv) {
            return stripe.charges.create({
                amount: amount,
                currency: "usd",
                customer: resv.stripecustomerid,
            });
        })
        .then(function (charge) {
                res.send("1");
        },function (err) {
            res.send(err);
        })


}


function chargeCard(req,res) {

    var token = req.body.stripetoken;
    var resv = req.body;

    // Create a Customer:
    stripe.customers.create({
        source: token,
        email: resv.email
    }).then(function(customer) {
        resv.stripecustomerid = customer.id;
        return stripe.charges.create({
            amount: 100,
            currency: "usd",
            description: "Room charge",
            capture: false,
            customer: customer.id,
        });
    }).then(function(charge) {
            resv.status = "CHECKEDIN";
            resv.depositeid = charge.id;
            reservationModel
                .updateReservation(resv._id,resv)
                .then(function (resv) {
                    res.send("1");
                }, function (err) {
                    res.send("0");
                });

    },function (err) {
        res.send(err.message);
    });

// YOUR CODE (LATER): When it's time to charge the customer again, retrieve the customer ID.
//     stripe.charges.create({
//         amount: 1500, // $15.00 this time
//         currency: "usd",
//         customer: customerId,
//     });

}


function createReservation(req,res) {
    reservationModel
        .createReservation()
        .then(function (resv) {
            res.json(resv);
        });
}


function findReservationByReserveNo(req,res) {
    var resvNo = req.params.resvno;
    reservationModel
        .findReservationByReserveNo(resvNo)
        .then(function (resv) {
            res.json(resv);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}


function findReservationByName(req,res) {
    var firstname = req.params.firstname;
    var lastname = req.params.lastname;
    reservationModel
        .findReservationByName(firstname,lastname)
        .then(function (resv) {
            res.json(resv);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}


function updateReservation(req, res){
    var resvId = req.params.resvid;
    var newResv = req.body;
    reservationModel
        .updateReservation(resvId,newResv)
        .then(function (resv) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function getAllReservations(req,res) {
    reservationModel
        .getAllReservations()
        .then(function (resv) {
            res.json(resv);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteReservation(req, res) {
    var resvId = req.params.resvid;
    reservationModel
        .deleteReservation(resvId)
        .then(function (resv) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

