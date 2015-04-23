angular.module('portfolio', ['ui.bootstrap', 'ui.router', 'aex.utils', 'xeditable', 'portfolio.directives','portfolio.manager', 'portfolio.detail', 'portfolio.users', 'portfolio.utils']);

angular.module('portfolio').config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('portfolio', {
        url: '/portfolio',
        'abstract': true,
        views: {
            'nav': {
                templateUrl: 'app/main.nav.html',
                controller: 'HomeSearchCtrl',
            },

            'footer@': {templateUrl: 'app/main.footer.html'}
        },
        resolve:{
            Users: 'portfolioAuthService'

        }
    });
    $stateProvider.state('portfolio.login', {
        url: '',
        views: {
            'main@': {
                templateUrl: 'app/portfolio/portfolio.login.html',
                resolve: {
                    CheckLoggedIn: function ($state, loggedIn) {
                        var _loggedIn = loggedIn.checkUser();
                        if (_loggedIn) {
                            $state.go('portfolio.manager');
                        }
                    }
                },
                controller: function PortfolioLoginCtrl($scope, $state, $log, $cookies, $cookieStore, portfolioAuthService, loggedIn, toastPopup, portfolioNameService) {
                    portfolioNameService.setName();
                    $scope.portfolioName = portfolioNameService.getName();
                    var vm = $scope;
                    vm.getUser = portfolioAuthService.getUser;
                    vm.login = login;
                    // use
                    vm.username = $cookies['user_email'] || null;
                    vm.userpassword = $cookies['user_pass'] || null;
                    vm.userLoggedIn = loggedIn.checkUser();
                    // end
                    if ($cookies['user_pass']){
                        portfolioAuthService
                            .login($cookies['user_email'], $cookies['user_pass'])
                            .then(function success(response) {
                                vm.User = response.data.User[0];
                                $state
                                    .go('portfolio.manager')
                                    .then(function transition(event, fromState, toState){
                                        // $log.info('stateBuilder completed.');
                                    });

                            }, handleLoginError);

                    }

                    if (vm.userLoggedIn) {
                        $state.go('portfolio.manager');
                    }

                    function login() {
                        portfolioAuthService
                            .login(vm.username, vm.password)
                            .then(function success(response) {
                                vm.User = response.data.User[0];
                                $state
                                    .go('portfolio.manager')
                                    .then(function transition(event, fromState, toState){
                                        // $log.info('stateBuilder completed.');
                                    });

                            }, handleLoginError);
                    }

                    function logout() {
                        portfolioAuthService.logout();
                        vm.User = null;
                    }

                    function handleLoginError(response) {
                        $log.debug(response);
                        toastPopup.loginError(
                            '<h5>Could not load Portfolios.</h5>Reason: ' +
                            response.data.flash ||
                            response.flash ||
                            response.data.error ||
                                response.statusText
                        );
                        return response;
                    }

                }

            }
        }
    });

}).run(function ($rootScope, editableOptions,$log) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    //console.log(['MODULE_INITIALIZATION','portfolio.users','running']);

});
