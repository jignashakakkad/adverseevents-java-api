/**
 * @ngdoc service
 * @name portfolio.directives.portfolio.directivesService
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $replace_me
 *
 * */


angular.module('portfolio.directives',['ui.router', 'ngSanitize']);
angular.module('portfolio.directives').directive('showDuringResolve', function($rootScope) {

    return {
        link: function(scope, element) {

            element.addClass('ng-hide');

            var unregister = $rootScope.$on('$stateChangeStart', function() {
                element.removeClass('ng-hide');
            });
            $rootScope.$on('$stateChangeSuccess', function() {
                element.addClass('ng-hide');
            });
            scope.$on('$destroy', unregister);
        }
    };
});
angular.module('portfolio.directives').directive('hideDuringResolve', function($rootScope) {

    return {
        link: function(scope, element) {

            element.addClass('ng-show');

            var unregister = $rootScope.$on('$stateChangeStart', function() {
                element.removeClass('ng-show');
            });


            scope.$on('$destroy', unregister);
        }
    };
});
angular.module('portfolio.directives').directive('resolveLoader', function($rootScope, $timeout) {

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="alert alert-success ng-hide"><strong>Welcome!</strong> Content is loading, please hold.</div>',
        link: function(scope, element) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                if (fromState){
                    return;
                }

                $timeout(function() {
                    element.removeClass('ng-hide');
                });
            });

            $rootScope.$on('$stateChangeSuccess', function() {
                element.addClass('ng-hide');
            });
        }
    };
});
angular.module('portfolio.directives').directive('tabSetter', function ($timeout) {
    return function (scope, element, attributes) {
        // logic to check if current state = current tab should go here
        $timeout(function(){
            var classToRemove = attributes["tabSetter"];
            element.removeClass(classToRemove);
        });  
    };
});