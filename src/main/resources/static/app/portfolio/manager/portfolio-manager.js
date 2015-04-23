/**
 * @ngdoc overview
 * @name portfolioManager
 * @description
 * # portfolioManager
 *
 * Main module of the application.
 */

(function () {
    'use strict';
    angular.module('portfolio.manager', ['ngCookies', 'restangular', 'ui.bootstrap', 'aex.utils', 'xeditable', 'ui.router', 'portfolioManager.services', 'portfolioManager.directives', 'portfolio.manager.service', 'portfolio.users', 'portfolio.listener', 'aex.constants', 'portfolio', 'portfolio.detail', 'portfolio.utils']);
    angular.module('portfolio.manager').config(function ($stateProvider) {
        //portfolio manager routes
        $stateProvider
                .state('portfolio.manager', {
                    url: '/manager',
                    resolve: {
                        portfolioAuthService: 'portfolioAuthService',
                        User: function (portfolioAuthService) {
                            return portfolioAuthService.getUser();
                        },
                        Portfolios: function (portfolioManagerService) {
                            return portfolioManagerService.getPortfolios();
                        }
                    },
                    data: {
                        requiredAuthentication: true
                    },
                    views: {
                        'main@': {
                            templateUrl: 'app/portfolio/manager/portfolio-manager.html',
                            controller: 'PortfolioManagerCtrl'
                        },
                        'no-portfolios@portfolio.manager': {
                            templateUrl: 'app/portfolio/manager/partials/no-portfolios.html'
                        },
                        'create@portfolio.manager': {
                            templateUrl: 'app/portfolio/manager/partials/create.html'
                        }
                    }
                })
                .state('portfolio.manager.edit', {
                    url: '/:portId',
                    stateParams: '@portId',
                    controller: 'portfolioManagerItemsCtrl',
                    resolve: {
                        portfolioAuthService: 'portfolioAuthService',
                        User: function (portfolioAuthService) {
                            return portfolioAuthService.getUser();
                        },
                        Portfolio: function ($stateParams, portfolioManagerService) {
                            return portfolioManagerService.getPortfolio($stateParams.portId);
                        },
                        ExposureIndex: function ($stateParams, portfolioManagerService, portfolioExposureService) {
                            portfolioManagerService.getPortfolio($stateParams.portId).then(function (Portfolio) {
                                portfolioExposureService.indexExposure(Portfolio.contents);
                            });
                        }
                    },
                    views: {
                        'results': {
                            templateUrl: 'app/portfolio/manager/partials/results.html'
                        },
                        'events': {
                            templateUrl: 'app/portfolio/manager/partials/events.html'
                        },
                        'companies': {
                            templateUrl: 'app/portfolio/manager/partials/companies.html'
                        },
                        'drugs': {
                            templateUrl: 'app/portfolio/manager/partials/drugs.html'
                        },
                        'search': {
                            templateUrl: 'app/portfolio/manager/partials/search.html',
                            controller: 'portfolioManagerSearchCtrl'
                        },
                        'dropdown': {
                            templateUrl: 'app/portfolio/manager/partials/dropdown.html'
                        },
                        'copy@portfolio.manager.edit': {
                            templateUrl: 'app/portfolio/manager/partials/copy.html'
                        }
                    }
                });


    }).run(run);

    run.$inject = ['$rootScope', '$state', 'loggedIn'];
    function run($rootScope, $state, loggedIn) {
        $rootScope.$on('$stateChangeStart', function (e, toState) {
            if (!(toState.data)) {
                return;
            }
            if (!(toState.data.requiredAuthentication))
                return;
            var _requiredAuthentication = toState.data.requiredAuthentication;
            if (_requiredAuthentication && !loggedIn.checkUser()) {
                e.preventDefault();
                $state.go('portfolio.login', {notify: false});
            }
            return;
        });
    }
})();