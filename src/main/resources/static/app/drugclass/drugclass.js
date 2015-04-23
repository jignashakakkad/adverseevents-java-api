var aex_drugclass = angular.module('drugclass', ['restangular', 'rxsignal', 'ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate']);

aex_drugclass.config(function ($stateProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('/lev/api');

    RestangularProvider.setRequestInterceptor(function (elem, operation, what) {

        if (operation === 'put') {
            elem._id = elem.id;
            return elem;
        }
        return elem;
    });

    $stateProvider.state('drugclass', {
        // This abstract state will prepend '/drugclass' onto the urls of all its children.
        url: '/drugclass',
        // With abstract set to true, that means this state can not be explicitly activated.
        // It can only be implicitly activated by activating one of it's children.
        'abstract': true,

        views: {
            'nav': {
                templateUrl: 'app/main.nav.html',
                controller: 'HomeSearchCtrl'
            },
            'main': {
                templateUrl: 'app/drugclass/drugclass.html'

            },
            'list@drugclass': {
                templateUrl: 'app/drugclass/drugclass.list.html',
                controller: 'DrugclassListCtrl'
            },
            'footer@': {

                templateUrl: 'app/main.footer.html'

            }

        }


    });
    $stateProvider.state('drugclass.list', {
        // Using an empty url means that this child state will become active
        // when its parent's url is navigated to. Urls of child states are
        // automatically appended to the urls of their parent. So this state's
        // url is '/contacts' (because '/contacts' + '').
        url: '',
        views: {}
    });
// Using a '.' within a state name decflares a child within a parent.
// So you have a new state 'detail' within the parent 'drugclass' state.
    $stateProvider.state('drugclass.detail', {
        url: '/detail/:id',
        stateParams: '@id',
        resolve: {
            Drugclass: function (Restangular, $stateParams) {
                return Restangular.one('drugclass', $stateParams.id).getList('overview');
            },
            Metrics: function (Restangular, $stateParams) {
                return Restangular.one('drugclass', $stateParams.id).getList('metrics');

            }




        },


        views: {
            'main@': {
                templateUrl: 'app/drugclass/drugclass.detail.html',
                controller: 'DrugclassDetailCtrl'
            },
            'report-header-right@drugclass.detail': {

            },
            'nav-tabs@drugclass.detail': {
                templateUrl: 'app/main.detail.tabs.html',
                controller: function ($scope, $rootScope, $state, $sce) {
                    $scope.$on("$stateChangeSuccess", function() {

                        $scope.tabs.forEach(function(tab) {
                            tab.active = $state.is(tab.sref);
                        });
                    });


                    $scope.activetab = $state.current.name;
                    $scope.tabs = [
                        { "heading": 'Overview', "sref": "drugclass.detail.overview", active: false, icon: 'fa fa-th', disabled: false},
                        { "heading": 'Monitor', "sref": "drugclass.detail.monitor", active: false, icon: 'fa fa-newspaper-o', disabled: false},
                      //  { "heading": 'RxSignal', "sref": "drugclass.detail.rxsignal", active: false, icon: 'fa fa-rss', disabled: false},
                        { "heading": 'RxScore', "sref": "drugclass.detail.rxscore", active: false, icon: 'fa fa-bar-chart-o', disabled: false},
                        { "heading": 'Outcomes', "sref": "drugclass.detail.outcomes", active: false, icon: 'fa fa-warning', disabled: false}
                      //  { "heading": 'Cases', "sref": "drugclass.detail.cases", active: false, icon: 'fa fa-group',  disabled: false}
                    ];

                }
            }
        }
    });
    $stateProvider.state('drugclass.detail.overview', {
        url: '/overview',
        resolve: {
            Regulatory: function (Restangular, $stateParams) {
                return Restangular.one('drugclass', $stateParams.id).getList('regulatory');
            },
            Timeline: function (Restangular, $stateParams) {
                return Restangular.one('drugclass', $stateParams.id).customGET('timeline');
            }
        },
        views: {

            'tabcontent': {
                templateUrl: 'app/drugclass/drugclass.detail.overview.html',
                controller: "DrugclassOverviewCtrl"
            },
            'regulatory@drugclass.detail.overview': {
                templateUrl: 'app/drugclass/drugclass-regulatory.tpl.html',
                controller: function ($scope, $rootScope, $state, $sce, Regulatory) {
                    $scope.data_regulatory = Regulatory;
                }

            }


        }
    });

    $stateProvider.state('drugclass.detail.monitor', {
        url: '/monitor',
        resolve: {
            'News': function (Restangular, $stateParams) {
                return Restangular.one('drugclass', $stateParams.id).getList('dsm');
            }

        },
        views: {

            'tabcontent': {
                templateUrl: 'app/news/common-detail.monitor.html',
                controller: function ($scope, News) {
                    $scope.articleContent = News[0];
                    $scope.articleContent.data = $scope.articleContent.posts;

                    $scope.featureName = $scope.Drugclass.aedrug_name;
                    $scope.featureId = $scope.Drugclass.aedrug_id;
                    $scope.featureType = 'drugclass';
                }
            }

        }
    });
    $stateProvider.state('drugclass.detail.outcomes', {
        url: '/outcomes',
        resolve: {
            Outcomes: function (Restangular, $stateParams) {
                return Restangular.one('drugclass', $stateParams.id).getList('outcomes');
            },
            OutcomesChart: function (Restangular, $stateParams) {
                return Restangular.one('drugclass', $stateParams.id).getList('outcomes-chart');
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
            'outcomes-table@drugclass.detail.outcomes': {
                templateUrl: 'app/outcomes/common-detail.outcomes.table.tpl.html',
                controller: "DrugOutcomesCtrl"
            },
            'outcomes-chart@drugclass.detail.outcomes': {
                templateUrl: 'app/outcomes/common-detail.outcomes.chart.tpl.html',
                controller: "DrugOutcomesCtrl"
            }

        }
    });
    $stateProvider.state('drugclass.detail.rxsignal', {
        url: '/rxsignal',
        views: {
            'tabcontent': {
                templateUrl: 'app/drugclass/drugclass.detail.rxsignal.html',
                controller: "DrugRxsignalCtrl"
            },
            'rxsignal-chart-bubble@drugclass.detail.rxsignal': {
                templateUrl: 'app/rxsignal/RxSignalChartCtrlBubble.html',
                controller: "RxsignalBubbleChartCtrl"
            }


        }
    });
    /***
     *
     * RxScore State for DRUGCLASS detail.rxscore - this is pretty heavy duty.
     *
     * **/
    $stateProvider.state('drugclass.detail.rxscore', {
        url: '/rxscore',

        views: {
            'tabcontent': {
                templateUrl: 'app/rxscore/common-detail.rxscore.html',
                controller: 'rxscoreDrugclassCtrl'
            }, 'rxscore-nav@drugclass.detail.rxscore': {

            },  'rxscore-components@drugclass.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-components.tpl.html',
                controller: 'rxscoreDrugclassCtrl'
            },'rxscore-components-chart@drugclass.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-components-chart.tpl.html',
                controller: 'rxscoreDrugclassComponentsChartCtrl'
            }, 'rxscore-comparative-chart@drugclass.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-comparative-chart.tpl.html',
                controller: 'rxscoreDrugclassComparisonChartCtrl'

            }
        }
    });
    $stateProvider.state('drugclass.detail.cases', {
        resolve: {
            Cases: function (Restangular, $stateParams) {
                return Restangular.one('drugclass', $stateParams.id).getList('cases-all');
            }
        },

        views: {
            'tabcontent': {
                templateUrl: 'app/drugclass/drugclass.detail.cases.html',
                controller: "DrugclassCasesCtrl"
            }

        }
    });

    /* Add New States Above */

})
    .controller('DrugclassListCtrl', function ($scope, $http) {

        $scope.ListItems = [];

        var d = $http.get('/lev/api/drugclass/index').success(function (response) {
            $scope.ListItems = response;
        });
        $scope.Title = 'Anatomical Therapeutic Class (ATC) Drug Classification';

    })
    .controller('DrugclassDetailCtrl', function ($scope, $http, Restangular, Drugclass, Metrics, $stateParams) {
        $scope.Drugclass = Drugclass[0];
        $scope.Metrics = Metrics[0];
        $scope.rxscore = false;
        $scope.aedrug_id = $stateParams.id;

    });
/****
 * OLD
 *
 angular.module('drugclass').config(function($stateProvider) {
    $stateProvider.state('classes', {
        url: '/classes',
        templateUrl: 'app/drugclass/drugclass.html',
        views: {
            'nav': {
                templateUrl: 'app/main.nav.html'
            },
            'main': {
                templateUrl: 'app/drugclass/drugclasses.html',
                controller: 'ClassesCtrl'
            },
            'list@classes': {
                templateUrl: 'app/drugclass/list/drugclass.list.html',
                controller: 'ClassesListCtrl'
            },
 'intel@classes': {
                template: "<div class=\"debug row\"><div class=\"col-sm-1\"><small class=\"text-muted\">news@classes</small></div></div>"
 }
 }

 });
 /* Add New States Above */

/**});**/
