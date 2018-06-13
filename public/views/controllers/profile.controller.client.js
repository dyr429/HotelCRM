(function () {
    angular
        .module("Edena")
        .controller("profileController", profileController);

    function profileController($location, $rootScope, userService, user) {
        var model = this;
        model.mode = "view";
        //declare functions
        model.switchEdit = switchEdit;
        model.updateProfile = updateProfile;
        function init() {
            model.user = user;
        }
        init();

        function switchEdit() {
            model.mode = "edit";
        }
        function updateProfile() {
            userService.updateUser(model.user._id, model.user)
                .then(function (response) {
                    if(response.data != "0"){
                        model.mode = "view";
                    }else{
                        alert("update failed");
                    }
                })
        }

        function login(user) {
            userService.findUserByCredentials(user.username, user.password)
                .then(function(response){
                    var userDoc = response.data;
                    if (!userDoc|| userDoc === false) {
                        model.errorMessage = "wrong username or password";
                    } else {
                        $('#myModal').hide();
                        $('.modal-backdrop').hide();
                        $rootScope.currentUser = userDoc;
                        var url = "/profile"
                        $location.url(url);
                    }
                }, function() {
                    model.errorMessage = "wrong username or password";
                });

        }

        function toggle() {
            if(model.flag == true) {
                model.flag = false;
            } else {
                model.flag = true;
            }
        }


        function register(user, username) {
            if (username === null || username === '' || typeof username === 'undefined'){
                model.errorRegisterMessage = "username is required";
                return;
            }
            else if (user.password === null || user.password === '' || typeof user.password === 'undefined'){
                model.errorRegisterMessage = "password is required";
                return;
            }
            else if (user.password === user.secondPassword) {
                userService.findUserByUsername(user.username)
                    .then(function (response) {
                        if (!response.data || response.data === "0") {
                            return userService.createUser(user);
                        } else {
                            model.errorRegisterMessage = "username already exist";
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
            } else {
                model.errorMessage = "password do not match";
                return;
            }
        }

    }
})();