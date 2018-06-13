
(function() {
    angular
        .module("Checkin")
        .factory("reservationService", reservationService);
    function reservationService($http) {


        var api = {
            "createReservation"   : createReservation,
            "getAllReservations" : getAllReservations,
            "updateReservation" : updateReservation,
            "getReservationByNo": getReservationByNo,
            "deleteReservation": deleteReservation,
            "checkIn": checkIn,
            "chargeMoney": chargeMoney

        };
        return api;


        function createReservation() {
            var url = "/reservationapi/create";
            return $http.post(url);
        }

        function getAllReservations() {
            var url = "/reservationapi/all";
            return $http.get(url);
        }


        function updateReservation(resvId,newresv) {
            var url = "/reservationapi/resv/" + resvId;
            return $http.put(url,newresv);
        }


        function getReservationByNo(resvNo) {
            var url = "/reservationapi/byresvno/" + resvNo;
            return $http.get(url);
        }

        function deleteReservation(resvId) {
            var url = "/reservationapi/resv/" + resvId;
            return $http.delete(url);
        }

        function checkIn(resv) {
            var url = "/reservationapi/charge"
            return $http.post(url,resv);
        }

        function chargeMoney(resvNo, amount) {
            var url = "/reservationapi/chargemoney/" + resvNo + "/" + amount;
            return $http.get(url);
        }





        function findUserById(userid) {
            return $http.get("/api/user/"+ userid);
            // for(var u in users){
            //     var _user = users[u];
            //     if(_user._id === userid){
            //         return _user;
            //     }
            // }
            // return null;
        }
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
            // for(var u in users){
            //     var _user = users[u];
            //     if(_user.username === username){
            //         return _user;
            //     }
            // }
            // return null;

        }
        function findUserByCredentials(username,password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);

        }

        function updateUser(userid, user) {
            var url = "/api/user/" + userid;
            return $http.put(url,user);


        }
        function deleteUser(userid) {
            var url = "/api/user/" + userid;
            return $http.delete(url);

        }
    }
})();

