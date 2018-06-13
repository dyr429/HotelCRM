(function () {
    angular
        .module("Checkin")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/templates/checkin.view.client.html",
                 controller: "checkinController",
                controllerAs: "model"
            })

            .when("/thankyou", {
                templateUrl: "views/templates/thankyou.view.client.html"
                // controller: "adminEditController",
                // controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/templates/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model"
            })
            .when("/admin/:resvno", {
                templateUrl: "views/templates/admin-edit.view.client.html",
                controller: "adminEditController",
                controllerAs: "model"
            })


    }

})();
