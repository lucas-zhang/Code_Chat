(function(){
    var app = angular.module('chatApp', ['html-directives', 'user_controller']);
    app.constant('img_path', (function() {
        /*
        var base_path = 'img/';
        var end = '.png';
        var image_names = {
            chat1: 'chat-icon', 
            chat2:'chat-icon2', 
            code: 'code', 
            color: 'color', 
            color2: 'color2', 
            command:'command',
            group: 'group', 
            profile: 'profile'
        };

        for (var key in image_names) {
            if (image_names.hasOwnProperty(key)) {
                image_names[key] = base_path + image_names[key] + end;
            }
        }

        return image_names;
        */
        return 'img/';
    }));



})();
