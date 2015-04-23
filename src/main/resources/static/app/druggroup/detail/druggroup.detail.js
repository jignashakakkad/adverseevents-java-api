(function () {
    'use strict';
    angular.module('druggroup.detail', ['common.rxscore','common.nggrid', 'common.tooltip', 'highcharts-ng', 'ngAnimate', 'restangular', 'ui.bootstrap', 'ui.utils', 'ui.router', 'common', 'druggroup.services', 'rxsignal']);
//    angular.module('druggroup.detail', ['ngAnimate','restangular','ui.bootstrap', 'ui.utils', 'ui.router', 'druggroup.services', 'rxsignal']);
    angular.module('druggroup.detail').config(['$stateProvider', function ($stateProvider) {

            // Using a '.' within a state name decflares a child within a parent.
            // So you have a new state 'detail' within the parent 'druggroup' state.
            $stateProvider.state('druggroup.detail', {
                url: '/:id',
                resolve: {
                    DrugGroup: function (drugGroupService, $stateParams) {
                        var d = drugGroupService.getOverview($stateParams.id, $stateParams.type);
                        return d;
                    },
                    Overview: function (drugGroupService, $stateParams) {
                        var d = drugGroupService.getOverview($stateParams.id, $stateParams.type);
                        return d;
                    },
                    Timeline: function (drugGroupService, $stateParams) {
                        //var d = drugGroupService.getTimeline($stateParams.id, $stateParams.type);
                        var d = [];
                        return d;
                    },
                    Regulatory: function (drugGroupService, $stateParams) {
                        var d = drugGroupService.getOverview($stateParams.id, $stateParams.type);
                        return d.$object;
                    },
                    News: function (drugGroupService, $stateParams) {
                        var d = drugGroupService.getNews($stateParams.id, $stateParams.type);
                        return d;
                    },
                    AdverseEvents: function (drugGroupService, $stateParams) {
                        var d = drugGroupService.getAdverseEvents($stateParams.id, $stateParams.type);
                        return d;
                    },
                    Outcomes: function (drugGroupService, $stateParams) {
                        return drugGroupService.getOutcomes($stateParams.id, $stateParams.type);
                    },
                    // commented out until new rxscore formula is ready
                    // Rxscore: function($stateParams, drugGroupService){
                    //     var d = drugGroupService.getRxscore($stateParams.id, $stateParams.type);
                    //     return d;
                    // },
                    RxsignalSummary: function ($stateParams, drugGroupService) {
                        var d = drugGroupService.getRxsignalSummary($stateParams.id, $stateParams.type);
                        return d;
                    },
                    Quarterly: function ($stateParams, drugGroupService) {
                        var d = drugGroupService.getReporting($stateParams.id, $stateParams.type);
                        return d;
                    },
                    DrugGroupCostData: function ($stateParams, drugGroupCostService) {
                        return drugGroupCostService.getDrugGroupCosts($stateParams.type, $stateParams.id);
                    }
                },
                views: {
                    'main@': {
                        templateUrl: 'app/druggroup/detail/druggroup.detail.html',
                        controller: 'DrugGroupDetailCtrl'
                    },
                    'report-header-right@druggroup.detail': {
                    },
                    'nav-tabs@druggroup.detail': {
                        templateUrl: 'app/main.detail.tabs-lg.html',
                        controller: 'TabController'
                    }
                }
            });

            // Overview Tab
            $stateProvider.state('druggroup.detail.overview', {
                url: '/overview',
                views: {
                    'tabcontent': {
                        templateUrl: 'app/druggroup/detail/partial/druggroup.detail.overview.html',
                        controller: "DrugGroupOverviewCtrl"
                    },
                    'regulatory@druggroup.detail.overview': {
                        templateUrl: 'app/druggroup/detail/partial/druggroup.regulatory.tpl.html',
                        controller: function ($scope, Regulatory) {
                            $scope.data_regulatory = Regulatory;
                        }
                    }
                }
            });

            // Monitor tab
            $stateProvider.state('druggroup.detail.monitor', {
                url: '/monitor',
                views: {
                    'tabcontent': {
                        templateUrl: 'app/druggroup/detail/partial/druggroup.detail.monitor.html',
                        controller: 'DrugGroupMonitorCtrl'
                    }
                }
            });

            // Adverse Events
            $stateProvider.state('druggroup.detail.adevents', {
                url: '/adverseevents/:datatype',
                views: {
                    'tabcontent': {
                        templateUrl: 'app/druggroup/detail/partial/druggroup.detail.adevents.html',
                        controller: 'DrugGroupAdEventsCtrl',
//                    controllerAs: 'AdEventCtrl'
                    }
                }
            });

            // RxSingnal-Summary Tab
            $stateProvider.state('druggroup.detail.rxsignal', {
                url: '/rxsignal',
                views: {
                    'tabcontent': {
                        templateUrl: 'app/druggroup/detail/partial/druggroup.detail.rxsignal.html',
                        controller: 'DrugGroupRxsignalSummaryCtrl'
                    }
                }
            });

            // Reporting Tab - (Quarterly)
            $stateProvider.state('druggroup.detail.quarterly', {
                url: '/quarterly',
                views: {
                    'tabcontent': {
                        templateUrl: 'app/druggroup/detail/partial/druggroup.detail.quarterly.html',
                        controller: 'DrugGroupReportingCtrl'
                    }
                }
            });

            // Costs Tab
            $stateProvider.state('druggroup.detail.costs', {
                url: '/cost',
                views: {
                    'tabcontent': {
                        templateUrl: 'app/druggroup/detail/partial/druggroup.detail.cost.html',
                        controller: "DrugGroupCostCtrl"
                    }
                }
            });
            // OutComes Tab
            $stateProvider.state('druggroup.detail.outcomes', {
                url: '/outcomes',
                views: {
                    'tabcontent': {
                        templateUrl: 'app/druggroup/detail/partial/druggroup.detail.outcomes.html',
                        controller: "DrugGroupOutcomesCtrl"
                    },
                }
            });

            // RxScore Tab
            $stateProvider.state('druggroup.detail.rxscore', {
                url: '/rxscore',
                resolve: {
                    RxscoreData: function ($stateParams, SERVER_SETTINGS, $http) {
                        var _units, _id;


                        _units = $stateParams.type.substring(0, 1).toUpperCase();
                        if (_units === 'D') {
                            _units = 'C';
                        }
                        _id = $stateParams.id;

                        return $http({
                            method: 'GET',
                            url: SERVER_SETTINGS.BASE_URL + '/service/service.rxscore.druggroup.v3.php?termCode=' + _id + '&units=' + _units
                        });
                    }
                },
                views: {
                    'tabcontent': {
                        templateUrl: 'app/rxscore/common-druggroup.rxscore.html',
                        controller: 'DrugGroupRxscoreCtrl'
                    }
                }
            });
        }])

})();


