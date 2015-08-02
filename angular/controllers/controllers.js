(function() {
    var app = angular.module('user_controller', []);

    function userFactory($http) {
        var user = {};
        user.username = null;
        user.firstName = null;
        user.lastName = null;
        user.email = null;
        user.loggedIn = false;

        $http.get('/user_data')
            .success(function (data, config){
                console.log("success");
                if (data['loggedIn']) {
                    user.username = data['username'];
                    user.firstName = data['firstName'];
                    user.lastName = data['lastName'];
                    user.email = data['email'];
                    user.loggedIn = true;
                }
            })
            .error(function() {
                console.log('an error occurred while fetching user data from angular factory');
            });
        console.log(user);
        return user;

    };

    app.factory('User', userFactory);


    function userCtrl(User) {
        this.user = User;

    };

    
    app.controller('UserCtrl', userCtrl);

})();