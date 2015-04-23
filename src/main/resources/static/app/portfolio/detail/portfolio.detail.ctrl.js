(function () {
  'use strict';

    angular
    .module('portfolio.detail')
    .controller('PortfolioDetailCtrl', ['$controller', '$scope', '$log', '$location', '$state', '$rootScope', '$stateParams', '$window', 'Restangular', 'PortfolioObject', 'Products', 'Revenues', 'Fullscreen', 'companySummaryService', 'RxscoreData', 'RxsignalSummaryData', 'Overview', 'portfolioService', 'portfolioRxscoreService', 'SERVER_SETTINGS', 'portfolioNameService', 'portfolioIndicationService', 'portfolioOverviewService', PortfolioDetailCtrl]);

    function PortfolioDetailCtrl($controller, $scope, $log, $location, $state, $rootScope, $stateParams, $window, Restangular, PortfolioObject, Products, Revenues, Fullscreen, companySummaryService, RxscoreData, RxsignalSummaryData, Overview, portfolioService, portfolioRxscoreService, SERVER_SETTINGS, portfolioNameService, portfolioIndicationService, portfolioOverviewService) {

        var Portfolio, tickerSymbol;
        $controller('LocalStorageController', {$scope: $scope});
        $scope.PortfolioObject =  PortfolioObject;

        portfolioNameService.setName();
        $scope.portfolioName = portfolioNameService.getName();

        $scope.Overview = portfolioService.getStripped(Overview);
        $scope.Summary = companySummaryService.getSummary(Revenues.slice(0, 8),RxscoreData,$scope.Overview,RxsignalSummaryData);

        if (typeof $scope.Summary.Metrics.metric_average_rxscore != 'undefined') {
            portfolioRxscoreService.pushRxscore($scope.Summary.Metrics.metric_average_rxscore.label);
        } else {
            portfolioRxscoreService.pushRxscore();
        }

        $scope.Products = Products;
        $scope.Revenues = Revenues;
        $scope.Report = {
            Title: ''
        };

        //receive broadcast from portfolio.detail.overview.ctrl
        $scope.$on('overview-state-changed', function(event, args) {
            $scope.overviewdata = args.stateName;
        });

        $scope.localStorageClear = function () {
            if ($window.localStorage) {
                $scope.clearLocalStorage();
                $state.reload();
            }
        };

        if ($scope.Revenues.length) {
            Portfolio = $scope.Revenues[0];
            Portfolio.companyName = $scope.Products[0].parent;
            Portfolio.parent_label = Portfolio.parent;
            Portfolio.companyTicker = Portfolio.parent_ticker;
            Portfolio.id = Portfolio.parent_id;
            $scope.Portfolio = Portfolio;
            tickerSymbol = $scope.Portfolio.companyTicker;
        }

        $scope.tabs = [
            { "heading": 'Overview', "sref": "portfolio.detail.overview({overviewdata:'company'})", active: false, icon: 'fa fa-home', disabled: false},
            { "heading": 'RxSignal Detail', "sref": "portfolio.detail.rxsignal-detail", active: false, icon: 'fa fa-rss', disabled: false},
            { "heading": 'RxSignal Summary', "sref": "portfolio.detail.rxsignal-summary", active: false, icon: 'aexicon-table', disabled: false},
            { "heading": 'Events', "sref": "portfolio.detail.news", active: false, icon: 'fa aexicon-radio-tower', disabled: false},
            { "heading": 'Reporting', "sref": "portfolio.detail.reporting", active: false, icon: 'fa aexicon-pulse', disabled: false},
            { "heading": 'Outcomes', "sref": "portfolio.detail.outcomes({datayear:'cumulative'})", active: false, icon: 'fa fa-warning', disabled: false},
            { "heading": 'RxScore', "sref": "portfolio.detail.rxscore", active: false, icon: 'fa fa-bar-chart-o', disabled: false},
            { "heading": 'Indication', "sref": "portfolio.detail.indication", active: false, icon: 'aexicon-pie', disabled: false},
            { "heading": 'Class', "sref": "portfolio.detail.drugclass", active: false, icon: 'aexicon-pie', disabled: false}
            //{ "heading": 'Class', "sref": "portfolio.detail.drugclass", active: false, icon: 'fa fa-rotate-90 fa-pie-chart', disabled: false}
        ];

        $scope.$on("$stateChangeSuccess", function () {
            Raven.setTagsContext({ state: $state.current.name });
            $scope.tabs.forEach(function (tab) {
                var stateName = $state.current.name;
                tab.active = $state.is(tab.sref) || tab.sref.indexOf(stateName) >= 0;
            });

            if ($location.host() === 'adverseevents.com') {

                var visitor = $rootScope.$visit;
                visitor.state = $state.current.name;
                visitor.id = $stateParams.id;
                visitor.term_name =  $scope.Portfolio.portfolioName;
                $scope.user = {};

                $scope.user.visit = visitor;
                $scope.user.user_id = visitor.user_id;
                $scope.user.id = visitor.user_id;
                $scope.user.auth_key = visitor.token;
                if (!SERVER_SETTINGS.DEBUG_LOGGER){
                    $scope.thisVisit = Restangular.oneUrl('users', 'http://www.adverseevents.com/lev/api/users/' + visitor.id + '/visit');
                    $scope.thisVisit.customPOST($scope.user);
                }
            }

        });
        $scope.goFullscreen = function () {

            // Fullscreen
            if (Fullscreen.isEnabled()) {
                Fullscreen.cancel();
            } else {
                Fullscreen.all();
            }
        };
        $scope.isFullScreen = false;
        $scope.goFullScreenViaWatcher = function() {
            $scope.isFullScreen = !$scope.isFullScreen;
        };
    };
})();
