(function() {
    angular
        .module("Checkin")
        .controller("adminEditController", adminEditController)

    function adminEditController($routeParams,$location, reservationService, $route) {
        //declare controller
        var model = this;
        model.resvNo = $routeParams["resvno"];
        model.chargeAmount = 0;
        //declare function
        model.updateReservation = updateReservation;
        model.chargeMoney = chargeMoney;

        //  model.createReservation = createReservation;

        //initial function
        function init() {
            getReservationByNo();
        }
        init();

        //functions


        function getReservationByNo(){
            reservationService.getReservationByNo(model.resvNo)
                .then(function (response) {
                   model.resv = response.data;
                    model.formatcheckindate = new Date(model.resv.checkindate);
                    model.formatcheckoutdate = new Date(model.resv.checkoutdate);
                    model.resvId = model.resv._id;
                    if(model.resv.stripecustomerid != null){
                        model.showcharge = true;
                    }else{
                        model.showcharge = false;
                    }

                });
        }

        function updateReservation() {
            model.resv.checkindate = model.formatcheckindate;
            model.resv.checkoutdate = model.formatcheckoutdate;
            reservationService.updateReservation(model.resvId,model.resv)
                .then(function (response) {
                    if(response.data == "1")
                        alert("update success");
                });
        }

        function chargeMoney() {
            if(model.chargeAmount != 0){
            reservationService.chargeMoney(model.resvNo,model.chargeAmount)
                .then(function (response) {
                    if(response.data == "1")
                        alert("charge success");
                });
            }
        }

    }

})();