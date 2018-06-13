
(function() {
    angular
        .module("Checkin")
        .controller("adminController", adminController)

    function adminController($routeParams,$location,reservationService) {
        //declare controller
        var model = this;

        //declare function
        model.getAllReservations = getAllReservations;
        model.createReservation = createReservation;
        model.deleteReservation = deleteReservation;
        // model.deleteWebsite = deleteWebsite;

        //initial function
        function init() {
            getAllReservations();
        }
        init();

        //functions


        function getAllReservations(){
            reservationService.getAllReservations()
                .then(function (response) {
                   model.reservations = response.data;
                });
        }

        function createReservation(){
            reservationService.createReservation()
                .then(function (response) {
                    var url = "/admin/" + response.data.reservationnumber;
                    $location.url(url);
                });
        }

        function deleteReservation(resvId){
            reservationService.deleteReservation(resvId)
                .then(function (response) {
                    if(response.data == "1")
                        alert("delete success");
                        getAllReservations();
                });
        }



    }

})();