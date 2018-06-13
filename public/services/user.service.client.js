(function () {
    angular
        .module("Edena")
        .service("userService", userService);

    function userService($http) {

        var api =  {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername":findUserByUsername,
            "findUserByCredentials": login,
            "updateUser": updateUser,
            "logout": logout,
            "findAllUsers": findAllUsers,
            "checkLogin": checkLogin
        };

        return api;

        function login(username, password) {
            var url = "/userapi/login";
            // /user?username=alice&password=alice
            return $http.post(url, {username: username, password: password});
        }

        function findUserById(userId) {
            var url = "/userapi/user/" + userId;
            return $http.get(url);

        }

        function createUser(user) {
            var url = "/userapi/user";
            return $http.post(url,user);
        }

        function findUserByUsername(username) {
            var url = "/userapi/user?username="+username;
            return $http.get(url);
        }

        function updateUser(userId,user){
            var url = "/userapi/user/" + userId;
            return $http.put(url,user);
        }


        function logout(user) {
            return $http.post("/userapi/logout");
        }

        function findAllUsers() {
            var url = "/userapi/users";
            return $http.get(url);
        }

        function checkLogin() {
            return $http
                .get("/userapi/checkLogin")
                .then(function (response) {
                    return response.data;
                })
        }
    }

})();