(function(){
    var app = angular.module('chatApp', []);
    app.constant('indexImages', (function() {
        var base_path = '../assets/img/';
        var end = '.png';
        var image_names = {
            chat1: 'chat-icon', 
            chat2:'chat-icon2', 
            code: 'code', 
            color: 'color', 
            color2: 'color2', 
            command: 'command',
            group: 'group', 
            profile: 'profile'
        };

        for (var key in image_names) {
            if (image_names.hasOwnProperty(key)) {
                image_names[key] = base_path + image_names[key] + end;
            }
        }

        return image_names;
    }));


    app.directive('navbar', function(){
        return {
            restrict: 'E',
            templateUrl: 'navbar.html'
        };
    });

    app.directive('loginBox', function(){
        return {
            restrict: 'E',
            templateUrl: 'login_box.html'
        };
    });

    app.directive('bottomFooter', function(){
        return {
            restrict: 'E',
            templateUrl: 'footer.html'
        };
    });
    app.directive('appDescription', function(){
        return {
            restrict: 'E',
            templateUrl: 'app_description.html'
        };
    });
    app.directive('mainFeatures', function(){
        return {
            restrict: 'E',
            templateUrl: 'main_Features.html'
        };
    });

    app.directive('otherFeatures', function(){
        return {
            restrict: 'E',
            templateUrl: 'main_Features.html'
        };
    });

    app.directive('headTemplate', function(){
        return {
            restrict: 'E',
            templateUrl: 'head_template.html'
        };
    });
})();
