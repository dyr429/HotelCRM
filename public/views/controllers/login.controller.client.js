(function () {
    angular
        .module("Edena")
        .controller("loginController", loginController);

    function loginController($location, $rootScope, userService) {
        var model = this;


        //declare functions
        model.login = login;
        model.register = register;
        model.logout = logout;
        function init() {
            if($rootScope.currentUser === null || $rootScope.currentUser === '' || typeof $rootScope.currentUser === 'undefined'){
                model.headermode = "guest";
            }
            else{
                model.headermode = "user";
            }
        }
        init();


        function login(user) {
            userService.findUserByCredentials(user.username, user.password)
                .then(function(response){
                    var userDoc = response.data;
                    if (!userDoc|| userDoc === false) {
                        model.errorMessage = "wrong username or password";
                    } else {
                        $('#myModal').hide();
                        $('#myModal1').hide();
                        $('.modal-backdrop').hide();
                        $rootScope.currentUser = userDoc;
                        model.headermode = "user";
                        // var url = "/profile"
                        // $location.url(url);
                    }
                }, function() {
                    model.errorMessage = "wrong username or password";
                });

        }



        function register(user, username) {
            console.log(model.recapchaResponse);
            if (username === null || username === '' || typeof username === 'undefined'){
                model.errorRegisterMessage = "username is required";
                return;
            }
            else if (user.password === null || user.password === '' || typeof user.password === 'undefined'){
                model.errorRegisterMessage = "password is required";
                return;
            }
            else if(user.password != user.secondPassword){
                model.errorRegisterMessage = "password do not match";
                return;
            }
            else if(user.firstName === null || user.firstName === '' || typeof user.firstName === 'undefined'){
                model.errorRegisterMessage = "first name is required";
                return;
            }
            else if(user.lastName === null || user.lastName === '' || typeof user.lastName === 'undefined'){
                 model.errorRegisterMessage = "last name is required";
                 return;
            }

            else {
                userService.findUserByUsername(user.username)
                    .then(function (response) {
                        if (!response.data || response.data === "0") {
                            return userService.createUser(user)
                        } else {
                            // model.errorRegisterMessage = "username already exist";
                            alert("this email has been registered");
                            return;
                        }
                    })
                    .then(function(response){
                        if(response && response !== "exist") {
                            login(user);
                        }
                        else if(response !== "exist"){
                            model.errorRegisterMessage = response;//"something goes wrong";
                        }
                    });
            }
        }

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        model.headermode = "guest";
                        $location.url("/");
                    });
        }

    }
})();