(function() {
    'use strict';
    angular.module('druggroup', ['druggroup.detail','druggroup.list','druggroup.services']);
    angular.module('druggroup').config(['$httpProvider', '$stateProvider', function ($httpProvider, $stateProvider) {
        
        // Interceptor for exception handling
//        $httpProvider.interceptors.push('HttpInterceptor');
        
        $stateProvider.state('druggroup', {
            // This abstract state will prepend '/druggroup' onto the urls of all its children.
            url: '/druggroup/:type',
            // With abstract set to true, that means this state can not be explicitly activated.
            // It can only be implicitly activated by activating one of it's children.
            abstract: true,
            views: {
                'nav': {
                    templateUrl: 'app/main.nav.html',
                    controller: 'HomeSearchCtrl'
                },
                'main': {
                    templateUrl: 'app/druggroup/druggroup.html'
                },
                'list@druggroup': {
                    templateUrl: 'app/druggroup/list/druggroup.list.html',
                    controller : 'DrugGroupListCtrl',
                    controllerAs:'ListCtrl'
                },
                'footer@': {
                    templateUrl: 'app/main.footer.html'
                }
            }
        });

        $stateProvider.state('druggroup.list', {
            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/druggroup' (because '/druggroup' + '').
            url: '',
            views: {}
        });
    }])

    .run();

})();