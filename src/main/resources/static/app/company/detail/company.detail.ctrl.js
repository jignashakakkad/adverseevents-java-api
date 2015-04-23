(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyDetailCtrl', ['$scope', '$controller', '$location', '$state', '$rootScope', '$stateParams', '$window', 'Overview', 'RxscoreData', 'RxsignalSummaryData', 'companyRxscoreService', 'companyService', 'companySummaryService', 'Restangular', 'Products', 'Revenues', 'Fullscreen', 'SERVER_SETTINGS', 'Exposure', 'toastPopup', CompanyDetailCtrl]);

    function CompanyDetailCtrl($scope, $controller, $location, $state, $rootScope, $stateParams, $window, Overview, RxscoreData, RxsignalSummaryData, companyRxscoreService, companyService, companySummaryService, Restangular, Products, Revenues, Fullscreen, SERVER_SETTINGS, Exposure, toastPopup) {

        var Company, tic;
        $controller('LocalStorageController', {$scope: $scope});
        $scope.Products = Products;
        $scope.Revenues = Revenues;
        $scope.Report = {
            Title: ''
        };
        if (Exposure) {
            toastPopup.showToast("<span class='toasty-text'>This company is present in one or more of your Portfolios</span>");
        }
        $scope.Overview = companyService.getStripped(Overview);
        $scope.Summary = companySummaryService.getSummary(Revenues.slice(0, 8), RxscoreData, $scope.Overview, RxsignalSummaryData);

        if (typeof $scope.Summary.Metrics.metric_average_rxscore != 'undefined') {
            companyRxscoreService.pushRxscore($scope.Summary.Metrics.metric_average_rxscore.label);
        } else {
            companyRxscoreService.pushRxscore();
        }

        $scope.localStorageClearAll = function () {
            $scope.clearLocalStorage("company.detail");
            $state.reload();
        };

        if ($scope.Revenues.length) {
            Company = $scope.Revenues[0];
            Company.companyName = $scope.Products[0].parent;
            Company.parent_label = Company.parent;
            Company.companyTicker = Company.parent_ticker;
            Company.id = Company.parent_id;
            $scope.Company = Company;
            tic = $scope.Company.companyTicker;
        }

        $scope.tabs = [
            {"heading": 'Overview', "sref": "company.detail.overview", active: false, icon: 'fa fa-home', disabled: false},
            {"heading": 'RxSignal Detail', "sref": "company.detail.rxsignal", active: false, icon: 'fa fa-rss', disabled: false},
            {"heading": 'RxSignal Summary', "sref": "company.detail.rxsignal-summary", active: false, icon: 'aexicon-table', disabled: false},
            {"heading": 'Events', "sref": "company.detail.news", active: false, icon: 'fa aexicon-radio-tower', disabled: false},
            {"heading": 'Reporting', "sref": "company.detail.reporting", active: false, icon: 'fa aexicon-pulse', disabled: false},
            {"heading": 'Outcomes', "sref": "company.detail.outcomes({datayear:'cumulative'})", active: false, icon: 'fa fa-warning', disabled: false},
            {"heading": 'RxScore', "sref": "company.detail.rxscore", active: false, icon: 'fa fa-bar-chart-o', disabled: false},
            {"heading": 'Indication', "sref": "company.detail.indication", active: false, icon: 'aexicon-pie', disabled: false},
            {"heading": 'Class', "sref": "company.detail.drugclass", active: false, icon: 'aexicon-pie', disabled: false}
        ];

        $scope.$on("$stateChangeSuccess", function () {
            Raven.setTagsContext({state: $state.current.name});
            $scope.tabs.forEach(function (tab) {
                var stateName = $state.current.name;
                tab.active = $state.is(tab.sref) || tab.sref.indexOf(stateName) >= 0;
            });

            if ($scope.Company != null) {

                var visitor = $rootScope.$visit;
                visitor.state = $state.current.name;
                visitor.id = $stateParams.id;
                visitor.term_name = $scope.Company.companyName;
                $scope.user = {};

                $scope.user.visit = visitor;
                $scope.user.user_id = visitor.user_id;
                $scope.user.id = visitor.user_id;
                $scope.user.auth_key = visitor.token;

                if (!SERVER_SETTINGS.DEBUG_LOGGER) {
                    $scope.thisVisit = Restangular.oneUrl('users', 'http://www.adverseevents.com/lev/api/users/' + visitor.id + '/visit');
                    $scope.thisVisit.customPOST($scope.user);
                }
                $scope.thisVisit.customPOST($scope.user);
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
        $scope.goFullScreenViaWatcher = function () {
            $scope.isFullScreen = !$scope.isFullScreen;
        };
    };
})();
