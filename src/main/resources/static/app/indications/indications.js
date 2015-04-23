var aex_indication = angular.module('indications', ['restangular', 'rxsignal', 'ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate']);

aex_indication.config(function ($stateProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('/lev/api');

    RestangularProvider.setRequestInterceptor(function (elem, operation, what) {

        if (operation === 'put') {
            elem._id = elem.id;
            return elem;
        }
        return elem;
    });

    $stateProvider.state('indications', {
        // This abstract state will prepend '/drugclass' onto the urls of all its children.
        url: '/indications',
        // With abstract set to true, that means this state can not be explicitly activated.
        // It can only be implicitly activated by activating one of it's children.
        'abstract': true,

        views: {
            'nav': {
                templateUrl: 'app/main.nav.html',
                controller: 'HomeSearchCtrl'
            },
            'main': {
                templateUrl: 'app/indications/indications.html'

            },
            'list@indications': {
                templateUrl: 'app/indications/indications.list.html',
                controller: function($scope, $http){
                    $scope.ListItems = [];

                    var d = $http.get('/lev/api/indications/index').success(function (response) {
                        $scope.ListItems = response;
                    });
                    $scope.Title = 'Indications (NDF-RT)';
                }
            },
            'footer@': {

                templateUrl: 'app/main.footer.html'

            }

        }


    });
    $stateProvider.state('indications.list', {
        // Using an empty url means that this child state will become active
        // when its parent's url is navigated to. Urls of child states are
        // automatically appended to the urls of their parent. So this state's
        // url is '/contacts' (because '/contacts' + '').
        url: '',
        views: {}
    });
// Using a '.' within a state name decflares a child within a parent.
// So you have a new state 'detail' within the parent 'indications' state.
    $stateProvider.state('indications.detail', {
        url: '/detail/:id',
        stateParams: '@id',
        resolve: {
            Indication: function (Restangular, $stateParams) {
                return Restangular.one('indications', $stateParams.id).getList('overview');
            },
            Metrics: function (Restangular, $stateParams) {
                return Restangular.one('indications', $stateParams.id).getList('metrics');

            }




        },


        views: {
            'main@': {
                templateUrl: 'app/indications/indications.detail.html',
                controller: 'IndicationsDetailCtrl'
            },
            'report-header-right@indications.detail': {

            },
            'nav-tabs@indications.detail': {
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
                        //  { "heading": 'RxSignal', "sref": "indications.detail.rxsignal", active: false, icon: 'fa fa-rss', disabled: false},
                        { "heading": 'RxScore', "sref": "indications.detail.rxscore", active: false, icon: 'fa fa-bar-chart-o', disabled: false},
                        { "heading": 'Outcomes', "sref": "indications.detail.outcomes", active: false, icon: 'fa fa-warning', disabled: false}
                        //  { "heading": 'Cases', "sref": "indications.detail.cases", active: false, icon: 'fa fa-group',  disabled: false}
                    ];

                }
            }
        }
    });
    $stateProvider.state('indications.detail.overview', {
        url: '/overview',
        resolve: {
            Regulatory: function (Restangular, $stateParams) {
                return Restangular.one('indications', $stateParams.id).getList('regulatory');
            },
            Timeline: function (Restangular, $stateParams) {
                return Restangular.one('indications', $stateParams.id).customGET('timeline');
            }
        },
        views: {

            'tabcontent': {
                templateUrl: 'app/indications/indications.detail.overview.html',
                controller: "IndicationsOverviewCtrl"
            },
            'regulatory@indications.detail.overview': {
                templateUrl: 'app/indications/indications-regulatory.tpl.html',
                controller: function ($scope, $rootScope, $state, $sce, Regulatory) {
                    $scope.data_regulatory = Regulatory;
                }

            }


        }
    });

    $stateProvider.state('indications.detail.monitor', {
        url: '/monitor',
        resolve: {
            'News': function (Restangular, $stateParams) {
                return Restangular.one('indications', $stateParams.id).getList('dsm');
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
    $stateProvider.state('indications.detail.outcomes', {
        url: '/outcomes',
        resolve: {
            Outcomes: function (Restangular, $stateParams) {
                return Restangular.one('indications', $stateParams.id).getList('outcomes');
            },
            OutcomesChart: function (Restangular, $stateParams) {
                return Restangular.one('indications', $stateParams.id).getList('outcomes-chart');
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
            'outcomes-table@indications.detail.outcomes': {
                templateUrl: 'app/outcomes/common-detail.outcomes.table.tpl.html',
                controller: "DrugOutcomesCtrl"
            },
            'outcomes-chart@indications.detail.outcomes': {
                templateUrl: 'app/outcomes/common-detail.outcomes.chart.tpl.html',
                controller: "DrugOutcomesCtrl"
            }

        }
    });
    $stateProvider.state('indications.detail.rxsignal', {
        url: '/rxsignal',
        views: {
            'tabcontent': {
                templateUrl: 'app/indications/Indication.detail.rxsignal.html',
                controller: "DrugRxsignalCtrl"
            },
            'rxsignal-chart-bubble@indications.detail.rxsignal': {
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
            }, 'rxscore-nav@indications.detail.rxscore': {

            },  'rxscore-components@indications.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-components.tpl.html',
                controller: 'rxscoreIndicationsCtrl'
            },'rxscore-components-chart@indications.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-components-chart.tpl.html',
                controller: 'rxscoreIndicationsComponentsChartCtrl'
            }, 'rxscore-comparative-chart@indications.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-comparative-chart.tpl.html',
                controller: 'rxscoreIndicationsComparisonChartCtrl'

            }
        }
    });
    $stateProvider.state('indications.detail.cases', {
        resolve: {
            Cases: function (Restangular, $stateParams) {
                return Restangular.one('indications', $stateParams.id).getList('cases-all');
            }
        },

        views: {
            'tabcontent': {
                templateUrl: 'app/indications/indications.detail.cases.html',
                controller: "IndicationsCasesCtrl"
            }

        }
    });

    /* Add New States Above */

})
    .controller('IndicationsListCtrl', function ($scope, $http) {

        $scope.ListItems = [];

        var d = $http.get('http://www.adverseevents.com/lev/api/indications/index').success(function (response) {
            $scope.ListItems = response;
        });
        $scope.Title = 'Indications (NDF-RT)';

    })
    .controller('IndicationsDetailCtrl', function ($scope, $http, Restangular, Indication, Metrics, $stateParams) {
        $scope.Indication = Indication[0];
        $scope.Metrics = Metrics[0];
        $scope.rxscore = false;
        $scope.aedrug_id = $stateParams.id;

    });
/****
 * OLD
 *
 angular.module('indications').config(function($stateProvider) {
    $stateProvider.state('classes', {
        url: '/classes',
        templateUrl: 'app/indications/drugclass.html',
        views: {
            'nav': {
                templateUrl: 'app/main.nav.html'
            },
            'main': {
                templateUrl: 'app/indications/drugclasses.html',
                controller: 'ClassesCtrl'
            },
            'list@classes': {
                templateUrl: 'app/indications/list/drugclass.list.html',
                controller: 'ClassesListCtrl'
            },
 'intel@classes': {
                template: "<div class=\"debug row\"><div class=\"col-sm-1\"><small class=\"text-muted\">news@classes</small></div></div>"
 }
 }

 });
 /* Add New States Above */

/**});**/
