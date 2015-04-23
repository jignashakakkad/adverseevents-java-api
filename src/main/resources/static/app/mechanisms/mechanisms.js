var aex_indication = angular.module('mechanisms', ['restangular', 'rxsignal', 'ui.bootstrap', 'ui.utils', 'ui.router', 'ngRaven', 'ngAnimate']);

aex_indication.config(function ($stateProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('/lev/api');

    RestangularProvider.setRequestInterceptor(function (elem, operation, what) {

        if (operation === 'put') {
            elem._id = elem.id;
            return elem;
        }
        return elem;
    });

    $stateProvider.state('mechanisms', {
        // This abstract state will prepend '/drugclass' onto the urls of all its children.
        url: '/mechanisms',
        // With abstract set to true, that means this state can not be explicitly activated.
        // It can only be implicitly activated by activating one of it's children.
        'abstract': true,

        views: {
            'nav': {
                templateUrl: 'app/main.nav.html',
                controller: 'HomeSearchCtrl'
            },
            'main': {
                templateUrl: 'app/mechanisms/mechanisms.html'

            },
            'list@mechanisms': {
                templateUrl: 'app/mechanisms/mechanisms.list.html',
                controller: function($scope, $http){
                    $scope.ListItems = [];

                    var d = $http.get('/lev/api/mechanisms/index').success(function (response) {
                        $scope.ListItems = response;
                    });
                    $scope.Title = 'Mechanisms of Action (NDF-RT)';
                }
            },
            'footer@': {

                templateUrl: 'app/main.footer.html'

            }

        }


    });
    $stateProvider.state('mechanisms.list', {
        // Using an empty url means that this child state will become active
        // when its parent's url is navigated to. Urls of child states are
        // automatically appended to the urls of their parent. So this state's
        // url is '/contacts' (because '/contacts' + '').
        url: '',
        views: {}
    });
// Using a '.' within a state name decflares a child within a parent.
// So you have a new state 'detail' within the parent 'indications' state.
    $stateProvider.state('mechanisms.detail', {
        url: '/detail/:id',
        stateParams: '@id',
        resolve: {
            Indication: function (Restangular, $stateParams) {
                return Restangular.one('mechanisms', $stateParams.id).getList('overview');
            },
            Metrics: function (Restangular, $stateParams) {
                return Restangular.one('mechanisms', $stateParams.id).getList('metrics');

            }




        },


        views: {
            'main@': {
                templateUrl: 'app/mechanisms/mechanisms.detail.html',
                controller: 'IndicationsDetailCtrl'
            },
            'report-header-right@mechanisms.detail': {

            },
            'nav-tabs@mechanisms.detail': {
                templateUrl: 'app/main.detail.tabs.html',
                controller: function ($scope, $rootScope, $state, $sce) {
                    $scope.$on("$stateChangeSuccess", function() {

                        $scope.tabs.forEach(function(tab) {
                            tab.active = $state.is(tab.sref);
                        });
                    });


                    $scope.activetab = $state.current.name;
                    $scope.tabs = [
                        { "heading": 'Overview', "sref": "indications.detail.overview", active: false, icon: 'fa fa-th', disabled: false},
                        { "heading": 'Monitor', "sref": "indications.detail.monitor", active: false, icon: 'fa fa-newspaper-o', disabled: false},
                        { "heading": 'RxScore', "sref": "indications.detail.rxscore", active: false, icon: 'fa fa-bar-chart-o', disabled: false},
                        { "heading": 'Outcomes', "sref": "indications.detail.outcomes", active: false, icon: 'fa fa-warning', disabled: false}
                    ];

                }
            }
        }
    });
    $stateProvider.state('mechanisms.detail.overview', {
        url: '/overview',
        resolve: {
            Regulatory: function (Restangular, $stateParams) {
                return Restangular.one('mechanisms', $stateParams.id).getList('regulatory');
            },
            Timeline: function (Restangular, $stateParams) {
                return Restangular.one('mechanisms', $stateParams.id).customGET('timeline');
            }
        },
        views: {

            'tabcontent': {
                templateUrl: 'app/mechanisms/mechanisms.detail.overview.html',
                controller: "MechanismsOverviewCtrl"
            },
            'regulatory@mechanisms.detail.overview': {
                templateUrl: 'app/mechanisms/mechanisms-regulatory.tpl.html',
                controller: function ($scope, $rootScope, $state, $sce, Regulatory) {
                    $scope.data_regulatory = Regulatory;
                }

            }


        }
    });

    $stateProvider.state('mechanisms.detail.monitor', {
        url: '/monitor',
        resolve: {
            'News': function (Restangular, $stateParams) {
                return Restangular.one('mechanisms', $stateParams.id).getList('dsm');
            }

        },
        views: {

            'tabcontent': {
                templateUrl: 'app/news/common-detail.monitor.html',
                controller: function ($scope, News) {
                    $scope.articleContent = News[0];
                    $scope.articleContent.data = $scope.articleContent.posts;

                    $scope.featureName = $scope.Indication.termName;
                    $scope.featureId = $scope.Indication.termID;
                    $scope.featureType = 'indication';
                }
            }

        }
    });
    $stateProvider.state('mechanisms.detail.outcomes', {
        url: '/outcomes',
        resolve: {
            Outcomes: function (Restangular, $stateParams) {
                return Restangular.one('mechanisms', $stateParams.id).getList('outcomes');
            },
            OutcomesChart: function (Restangular, $stateParams) {
                return Restangular.one('mechanisms', $stateParams.id).getList('outcomes-chart');
            },
            Drug: function(){
                return {0:  []};
            }
        },
        views: {
            'tabcontent': {
                templateUrl: 'app/outcomes/common-detail.outcomes.html',
                controller: "DrugOutcomesCtrl"
            },
            'outcomes-table@mechanisms.detail.outcomes': {
                templateUrl: 'app/outcomes/common-detail.outcomes.table.tpl.html',
                controller: "DrugOutcomesCtrl"
            },
            'outcomes-chart@mechanisms.detail.outcomes': {
                templateUrl: 'app/outcomes/common-detail.outcomes.chart.tpl.html',
                controller: "DrugOutcomesCtrl"
            }

        }
    });
    $stateProvider.state('mechanisms.detail.rxsignal', {
        url: '/rxsignal',
        views: {
            'tabcontent': {
                templateUrl: 'app/mechanisms/Indication.detail.rxsignal.html',
                controller: "DrugRxsignalCtrl"
            },
            'rxsignal-chart-bubble@mechanisms.detail.rxsignal': {
                templateUrl: 'app/rxsignal/RxSignalChartCtrlBubble.html',
                controller: "RxsignalBubbleChartCtrl"
            }


        }
    });
    /***
     *
     * RxScore State for Indication detail.rxscore - this is pretty heavy duty.
     *
     * **/
    $stateProvider.state('Indication.detail.rxscore', {
        url: '/rxscore',

        views: {
            'tabcontent': {
                templateUrl: 'app/rxscore/common-detail.rxscore.html',
                controller: 'rxscoreIndicationsCtrl'
            }, 'rxscore-nav@mechanisms.detail.rxscore': {

            },  'rxscore-components@mechanisms.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-components.tpl.html',
                controller: 'rxscoreIndicationsCtrl'
            },'rxscore-components-chart@mechanisms.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-components-chart.tpl.html',
                controller: 'rxscoreIndicationsComponentsChartCtrl'
            }, 'rxscore-comparative-chart@mechanisms.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-comparative-chart.tpl.html',
                controller: 'rxscoreIndicationsComparisonChartCtrl'

            }
        }
    });
    $stateProvider.state('mechanisms.detail.cases', {
        resolve: {
            Cases: function (Restangular, $stateParams) {
                return Restangular.one('mechanisms', $stateParams.id).getList('cases-all');
            }
        },

        views: {
            'tabcontent': {
                templateUrl: 'app/mechanisms/mechanisms.detail.cases.html',
                controller: "MechanismsCasesCtrl"
            }

        }
    });

    /* Add New States Above */

})
    .controller('MechanismsListCtrl', function ($scope, $http) {

        $scope.ListItems = [];

        var d = $http.get('/lev/api/mechanisms/index').success(function (response) {
            $scope.ListItems = response;
        });
        $scope.Title = 'Mechanism of Action (NDF-RT)';

    })
    .controller('MechanismsDetailCtrl', function ($scope, $http, Restangular, Indication, Metrics, $stateParams) {
        $scope.Indication = Indication[0];
        $scope.Metrics = Metrics[0];
        $scope.rxscore = false;
        $scope.aedrug_id = $stateParams.id;

    });
