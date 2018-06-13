(function () {
    angular
        .module("Edena")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.view.client.html"
                 // controller: "loginController",
                 // controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/templates/user/profile.view.client.html",
                 controller: "profileController",
                 controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model"
            })
            .when("/payment", {
                templateUrl: "views/payment.view.client.html"
                // controller: "homeController",
                // controllerAs: "model"
            })
            .when("/order", {
                templateUrl: "views/order.view.client.html"
                // controller: "homeController",
                // controllerAs: "model"
            })
            .when("/terms", {
                templateUrl: "views/terms.view.client.html"
                // controller: "homeController",
                // controllerAs: "model"
            })
            .when("/collections", {
                templateUrl: "views/templates/rooms/collections.view.client.html"
                // controller: "homeController",
                // controllerAs: "model"
            })
            .when("/aboutus", {
                templateUrl: "views/templates/universal/aboutus.view.client.html"
                // controller: "homeController",
                // controllerAs: "model"
            })
            .when("/contact", {
                templateUrl: "views/templates/universal/aboutus.view.client.html"
                // controller: "homeController",
                // controllerAs: "model"
            })
            .when("/urban", {
                templateUrl: "views/collection1.view.client.html"
                // controller: "homeController",
                // controllerAs: "model"
            })
            .when("/park", {
                templateUrl: "views/collection2.view.client.html"
                // controller: "homeController",
                // controllerAs: "model"
            })

        function checkLogin(userService, $q, $location) {
            var deferred = $q.defer();
            userService
                .checkLogin()
                .then(function (user) {
                    if(user === '0') {
                        deferred.reject();
                        $location.url("/");
                    } else {
                        deferred.resolve(user);
                    }
                })
            return deferred.promise;
        }


    }

})();
