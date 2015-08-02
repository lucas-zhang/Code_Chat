 (function(){  
    var app = angular.module('html-directives', []);
    var rootPath = 'views/templates';
    var ext = '.ejs';
    app.directive('navbarLoggedIn', function(){
        return {
            restrict: 'E',
            templateUrl: rootPath + '/navbar_loggedIn' + ext
        };
    });

    app.directive('navbarLoggedOut', function(){
        return {
            restrict: 'E',
            templateUrl: rootPath + '/navbar_loggedOut' + ext
        };
    });

    app.directive('loginBox', function(){
        return {
            restrict: 'E',
            templateUrl: rootPath + '/login_box' + ext
        };
    });
    app.directive('welcomeMessage', function(){
        return {
            restrict: 'E',
            templateUrl: rootPath + '/welcome_message' + ext
        };
    });

    app.directive('bottomFooter', function(){
        return {
            restrict: 'E',
            templateUrl: rootPath + '/footer' + ext
        };
    });
    app.directive('appDescription', function(){
        return {
            restrict: 'E',
            templateUrl: rootPath + '/app_description' + ext
        };
    });
    app.directive('mainFeatures', function(){
        return {
            restrict: 'E',
            templateUrl: rootPath + '/main_features' + ext
        };
    });

    app.directive('otherFeatures', function(){
        return {
            restrict: 'E',
            templateUrl: rootPath + '/other_features' + ext
        };
    });

    app.directive('headTemplate', function(){
        return {
            restrict: 'E',
            templateUrl: rootPath + '/head_template' + ext
        };
    });
})();