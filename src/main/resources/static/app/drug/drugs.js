angular.module('drugs', ['common.tooltip', 'common.rxscore','restangular', 'highcharts-ng', 'angularBootstrapNavTree','ngCookies', 'ngSanitize', 'ui.router', 'aex.utils',
    'common.services', 'ui.bootstrap', 'ui.select', 'newsService', 'aex.constants', 'portfolio.listener']);

angular.module('drugs')
    .config(function ($stateProvider, RestangularProvider, SERVER_SETTINGS) {

    RestangularProvider.setBaseUrl(SERVER_SETTINGS.BASE_URL+'lev/api');

    RestangularProvider.setRequestInterceptor(function (elem, operation, what) {

        if (operation === 'put') {
            elem._id = elem.id;
            return elem;
        }
        return elem;
    });

    $stateProvider.state('drugs', {
        // This abstract state will prepend '/drugs' onto the urls of all its children.
        url: '/drugs',
        // With abstract set to true, that means this state can not be explicitly activated.
        // It can only be implicitly activated by activating one of it's children.
        'abstract': true,

        views: {
            'nav': {
                templateUrl: 'app/main.nav.html',
                controller: 'HomeSearchCtrl'
            },
            'main': {
                templateUrl: 'app/drug/drugs.html'

            },
            'list@drugs': {
                templateUrl: 'app/drug/drugs.list.html',
                controller: 'DrugsListCtrl'
            },
            'footer@': {

                templateUrl: 'app/main.footer.html'

            }

        }


    });
    $stateProvider.state('drugs.list', {
        // Using an empty url means that this child state will become active
        // when its parent's url is navigated to. Urls of child states are
        // automatically appended to the urls of their parent. So this state's
        // url is '/contacts' (because '/contacts' + '').
        url: '',
        views: {}
    });
    $stateProvider.state('drugs.rxsignal', {
        // Using an empty url means that this child state will become active
        // when its parent's url is navigated to. Urls of child states are
        // automatically appended to the urls of their parent. So this state's
        // url is '/contacts' (because '/contacts' + '').
        url: '/rxsignal',

        views: {
            'main@':  {
                templateUrl: 'app/drug/drugs.rxsignal.list.html',
                controller: 'DrugsRxsignalListCtrl'
            },
            'list@drugs.rxsignal': {

            }
        }
    });
    $stateProvider.state('drugs.detail', {
        url: '/detail/:id',
        stateParams: '@id',
        resolve: {
            CostsForGrid: function ($stateParams, drugCostsService) {
                return drugCostsService.getGridNumbers($stateParams.id, '/top/10');
            },
            Drug: function (Restangular, $stateParams) {
                var Drugs = Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.RXSCORE_URL+'lev/api/v1');
                });
                return Drugs.one('drugs', $stateParams.id).getList('overview');
            },
            Metrics: function (Restangular, $stateParams) {
                var Drugs = Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'lev/api');
                });
                return Drugs.one('drugs', $stateParams.id).getList('metrics');

            },
            Location: function ($location) {
                return {params: $location.search()};
            },
            Exposure: function (portfolioExposureService, $stateParams){
                return portfolioExposureService.checkExposure($stateParams.id);

            }




        },


        views: {
            'main@': {
                templateUrl: 'app/drug/drug.detail.html',
                controller: 'DrugDetailCtrl'
            },
            'report-header-right@drugs.detail': {
                templateUrl: 'app/rxscore/detail-rxscore-badge.html',
                controller: 'RxscoreChartGaugeCtrl'
            },
            'nav-tabs@drugs.detail': {
                templateUrl: 'app/main.detail.tabs.html',
                controller: function ($scope, Location, $location,$cookies,  $rootScope, Restangular, Drug, $stateParams, $state, $sce, CostsForGrid) {

                    $scope.Drug = Drug[0];

                    $scope.activetab = $state.current.name;
                    $scope.tabs = [
                        { "heading": 'Overview', "sref": "drugs.detail.overview", active: false, icon: 'fa fa-th', disabled: false},
                        { "heading": 'Monitor', "sref": "drugs.detail.monitor", active: false, icon: 'fa fa-newspaper-o', disabled: false},
                        { "heading": 'RxSignal', "sref": "drugs.detail.rxsignal", active: false, icon: 'fa fa-rss', disabled: false},
                        { "heading": 'RxCost', "sref" : "drugs.detail.costs", active: false, icon: 'fa fa-usd', disabled: false},
                        { "heading": 'RxScore', "sref": "drugs.detail.rxscore", active: false, icon: 'fa fa-bar-chart-o', disabled: false},
                        { "heading": 'Outcomes', "sref": "drugs.detail.outcomes", active: false, icon: 'fa fa-warning', disabled: false},
                        { "heading": 'Cases', "sref": "drugs.detail.cases", active: false, icon: 'fa fa-group', disabled: false}
                    ];

                    $scope.costs = CostsForGrid.data;
                    $scope.tabs[3].disabled = ($scope.costs[0] === undefined) ? true : false;
                    $scope.tabs[4].disabled = ($scope.Drug.rxscore.score === "none") ? true : false;

                    $scope.$on("$stateChangeSuccess", function () {
                        Raven.setTagsContext({ state: $state.current.name });
                        $scope.tabs.forEach(function (tab) {
                            tab.active = $state.is(tab.sref);
                        });
                        if ($location.host() !== 'colin-macpro-ssd830.local') {

                            var visitor = $rootScope.$visit;
                            visitor.state = $state.current.name;
                            visitor.id = $stateParams.id;
                            visitor.term_name = $scope.Drug.aedrug_name;
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

                }
            }
        }
    });
    $stateProvider.state('drugs.detail.overview', {
        url: '/overview',
        resolve: {
            Regulatory: function (Restangular, $stateParams) {
                var Drugs = Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'lev/api');
                });
                return Drugs.one('drugs', $stateParams.id).getList('regulatory');
            },
            Timeline: function (Restangular, $stateParams) {
                var Drugs = Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'lev/api');
                });
                return Drugs.one('drugs', $stateParams.id).getList('timeline');
            }
        },
        views: {

            'tabcontent': {
                templateUrl: 'app/drug/drug.detail.overview.html',
                controller: "DrugOverviewCtrl"
            },
            'regulatory@drugs.detail.overview': {
                templateUrl: 'app/drug/drug-regulatory.tpl.html',
                controller: function ($scope, $rootScope, $state, $sce, Regulatory) {
                    $scope.data_regulatory = Regulatory;
                }

            }

        }
    });

    $stateProvider.state('drugs.detail.monitor', {
        url: '/monitor',
        resolve: {
            'News': function (Restangular, $stateParams) {

                var Drugs = Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'lev/api');
                });
                return Drugs.one('drugs', $stateParams.id).getList('dsm');
            }

        },
        views: {

            'tabcontent': {
                templateUrl: 'app/news/common-detail.monitor.html',
                controller: function ($scope, News) {
                    $scope.articleContent = News[0];
                    $scope.articleContent.data = $scope.articleContent.posts;

                    $scope.featureName = $scope.Drug.aedrug_name;
                    $scope.featureId = $scope.Drug.aedrug_id;
                    $scope.featureType = 'drug';
                }
            }

        }
    });
    $stateProvider.state('drugs.detail.outcomes', {
        url: '/outcomes',
        resolve: {
            Outcomes: function (Restangular, $stateParams) {
                var Drugs = Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'lev/api');
                });
                return Drugs.one('drugs', $stateParams.id).getList('outcomes');
            },
            OutcomesChart: function (Restangular, $stateParams) {
                var Drugs = Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'lev/api');
                });
                return Drugs.one('drugs', $stateParams.id).getList('outcomes-chart');
            },
            OutcomesIncidence: function(Restangular, $stateParams){
                var Drugs = Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'lev/api');
                });
                return Drugs.one('drugs',$stateParams.id);
            },
            ResolvedData: function($q, Outcomes, OutcomesChart, OutcomesIncidence, drugOutcomesService){
                return {
                    Outcomes: Outcomes,
                     OutcomesChart: OutcomesChart,
                     OutcomesIncidence: OutcomesIncidence
                        .getList('incidence-outcomes')
                        .then(function (data){
                            var _collection = data.plain();
                            var _totalRow = drugOutcomesService.setTotal(_collection[0]);
                            _collection[0].push(_totalRow);

                             return _collection;
                        })
                };
            },
            JavaAPIData : function ($http, $stateParams) {
                return $http.get("/patientsbydrug/"+$stateParams.id).then(function(data){
                    return data;
                });
//                var Drugs = Restangular.withConfig(function (RestangularConfigurer) {
//                    RestangularConfigurer.setBaseUrl('/');
//                });
//                return Drugs.one('patientsbydrug' ,$stateParams.id);
            }
        },
        views: {
            'tabcontent': {
                templateUrl: 'app/outcomes/common-detail.outcomes.html',
                controller: "DrugOutcomesCtrl"
            },
            /*'outcomes-table@drugs.detail.outcomes': {
             templateUrl: 'app/outcomes/common-detail.outcomes.table.tpl.html',
             controller: "DrugOutcomesCtrl"
             },*/
            'outcomes-chart@drugs.detail.outcomes': {
                templateUrl: 'app/outcomes/common-detail.outcomes.chart.tpl.html',
                controller: "DrugOutcomesCtrl"
            },
            'outcomes-table@drugs.detail.outcomes': {
                templateUrl: 'app/outcomes/common-detail.outcomes-incidence.table.tpl.html',
                controller: "DrugOutcomesCtrl"
            }

        }
    });
    $stateProvider.state('drugs.detail.rxsignal', {
        url: '/rxsignal',
        resolve: {
            GridData: function ($stateParams, Restangular) {
                var RxSignal = Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'lev');
                });
                return RxSignal.one('rxsignal',$stateParams.id).one('events').getList('new');
            },
            GridCols: function ($cookies, $log, $window, localStorageService, $state) {
//                var favoriteCookie = $cookies.gridColsNew;
                var favoriteCookie = localStorageService.get($state.current.name+'.gridCols');
                var colDefs = [
                    { field: 'reac', pinned: true, width: '320', cellClass: "drugName", visible: true,

                        displayName: 'Adverse Event',

                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                        cellTemplate: '<div class="ngCellText""><p>{{row.getProperty(col.field)}}<span popover-append-to-body="true" popover="Designated Medical Event" popover-trigger="mouseenter" class=\'badge dmeBadge btn-danger active\' ng-show="row.getProperty(\'DME\') == \'DME\'">DME</span></p></div>'
                    },
                    { field: 'RxSignal', width: '89', visible: true,

                        displayName: 'RxSignal',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',

                        cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'RxSignal\') == \'Not Active\',\'red\' : row.getProperty(\'RxSignal\') == \'Active\',\'yellow\' : row.getProperty(\'RxSignal\') == \'Watchlist\' }"><p>{{ row.getProperty(col.field) }}</p></div>'
                    },
                    { field: 'IME', width: 95, visible: false,


                        displayName: 'IME Serious',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',

                        cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'IME\') == \'Not Serious\',\'red\' : row.getProperty(\'IME\') == \'Serious\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
                    { field: 'DME', width: 66, visible: false,
                        displayName: 'DME',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',

                        cellTemplate: '<div class= "ngCellText" ng-class="{\'green\' : row.getProperty(\'DME\') == \'Not DME\',\'red\' : row.getProperty(\'DME\') == \'DME\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
                    { field: 'Disease_Related', visible: false, width: 133,
                        displayName: 'Disease Related',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                        cellTemplate: '<div title="Disease Related" class="ngCellText" ng-class="{\'red\' : row.getProperty(\'Disease_Related\') == \'No\',\'green\' : row.getProperty(\'Disease_Related\') == \'Yes\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
                    { field: 'On_Off', width: '125', visible: true,
                        displayName: 'On Label',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',

                        cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'On_Off\') == \'Labeled\',\'red\' : row.getProperty(\'On_Off\') == \'Not Labeled\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
                    { field: 'Section', visible: false, width: 110,
                        displayName: 'Label Section',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                        cellTemplate: '<div class="ngCellText""><p ng-class="{\'text-center\' : row.getProperty(\'Section\') == \'N/A\' }">{{ row.getProperty(col.field) }}</p></div>'},

                    { field: 'ROR', width: 65, cellFilter: 'number:2', visible: true,
                        displayName: 'ROR',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'},
                    { field: 'PRR', width: 65, visible: false, cellFilter: 'number:2',
                        displayName: 'PRR',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'},

                    { field: 'PS', width: '120', cellFilter: 'number', visible: true,
                        displayName: 'Cases',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'},

                    { field: 'PS_PCT', displayName: 'PS PCT', width: 66, cellFilter: 'number:2', visible: false,
                        //cellTemplate: '<div class="ngCellText"  ">{{ row.getProperty(col.field) | number:2}}</div>'},
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                        cellTemplate: '<div class="ngCellText"">{{row.getProperty(col.field) | pctg}}</div>'

                    },

                    { field: 'Total', visible: false, displayName: 'Total Cases', width: 100, cellFilter: 'number',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'},
                    { field: 'Total_PCT', displayName: 'Total PCT', width: 66, visible: false, cellFilter: 'number:2',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                        cellTemplate: '<div class="ngCellText"">{{row.getProperty(col.field) | pctg}}</div>'
                    },
                    { field: 'i2013', displayName: '2013 Incidence ', width: '93', visible: false,
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                        cellTemplate: '<div title="2013 Incidence" class="ngCellText"><p>{{ row.getProperty(col.field) | incidenceFilter }}</p></div>'},
                    { field: 'i2012', displayName: '2012 Incidence', width: '93', visible: false,
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                        cellTemplate: '<div title="2012 Incidence" class="ngCellText"><p>{{ row.getProperty(col.field) | incidenceFilter }}</p></div>'},
                    { field: 'i2011', displayName: '2011 Incidence', width: '93', visible: false,
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                        cellTemplate: '<div title="2011 Incidence" class="ngCellText"><p>{{ row.getProperty(col.field)| incidenceFilter }}</p></div>'},
                    { field: 'iCumulative', displayName: 'Incidence', width: '93', visible: true,
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                        cellTemplate: '<div title="Cumulative Incidence" class="ngCellText"><p>{{ row.getProperty(col.field) | incidenceFilter }}</p></div>'},

                    { field: 'termCode', visible: true,

                        displayName: 'Compare', width: '*',
                        headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',


                        cellTemplate: '<div class="ngCellText text-center" popover-append-to-body="true" title="" popover-placement="right" ' +
                        'popover-trigger=\'click\' ' +
                            'popover-html-unsafe={{formatCompare(row.getProperty(\"reac\").toString(),Drug.indications[0].id,Drug.drugclasses[0].id)}}' + '<button class="btn btn-xs btn-default"><i class="fa fa-table"></i></button>' + '</div>'
                    }

                ];
                var colConfig = [];
                var colDefault = [];


                angular.forEach(colDefs, function (col) {
                    colConfig.push(_.pick(col, 'field', 'visible', 'width', 'headerCellTemplate', 'cellTemplate'));
                    colDefault.push(_.pick(col, 'field', 'visible', 'width', 'headerCellTemplate', 'cellTemplate'));
                });

                if (angular.fromJson(favoriteCookie) !== undefined) {
                    //console.log(angular.fromJson(favoriteCookie)+'....result of ngfromJson(cookie)');
                    colConfig = angular.fromJson(favoriteCookie);
                    var newdef = [];
                    angular.forEach(colDefs, function (def) {
                        angular.forEach(colConfig, function (config) {
                            if (def.field === config.field) {
                                def.visible = config.visible;
                                def.width = config.width;
                            }

                        });
                        newdef.push(def);
                    });
                    gridCols = newdef;
//                    localStorageService.set($state.current.name+'.gridCols',angular.toJson(newdef));
                } else {
//                    $cookies.gridColsNew = angular.toJson(colConfig);
//                    localStorageService.set($state.current.name+'.gridCols',angular.toJson(colDefs));
                    gridCols = colDefs;

                }

                return {user: gridCols, defaults:  colDefault };
            }

        },
        views: {
            'tabcontent': {
                templateUrl: 'app/drug/drug.detail.rxsignal.html',
                controller: "DrugRxsignalCtrl"
            },
            'rxsignal-chart-bubble@drugs.detail.rxsignal': {
                templateUrl: 'app/rxsignal/RxSignalChartCtrlBubble.html',
                controller: "RxsignalBubbleChartCtrl"
            }


        }
    });

    /***
     *
     * RxScore State for Drugs.detail.rxscore - this is pretty heavy duty.
     *
     * Uses directive rxscore-chart-*
     * **/
    $stateProvider.state('drugs.detail.rxscore', {
        url: '/rxscore',
        resolve: {
                   rxscoreModel: function ($rootScope, Drug, RxscoreModel) {
                        var rxScoreModel = new RxscoreModel($rootScope);
                        rxScoreModel.setDrugName(Drug[0].aedrug_name);
                        rxScoreModel.setDrugRxScore(Drug[0].rxscore.value);
                        rxScoreModel.setIndications(Drug[0].indications);
                        rxScoreModel.setMechanisms(Drug[0].mechanisms);
                        rxScoreModel.setDrugClasses(Drug[0].drugclasses);
                        return rxScoreModel;
                    }
        },
        views: {
            'tabcontent': {
                templateUrl: 'app/rxscore/common-detail.rxscore.html',
                controller: 'rxscoreDrugCtrl'
            }, 'rxscore-nav@drugs.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-filter.tpl.html',
                controller: 'rxscoreDrugComparisonNavCtrl'
            }, 'rxscore-components@drugs.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-components.tpl.html',
                controller: 'rxscoreDrugCtrl'
            }, 'rxscore-components-chart@drugs.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-components-chart.tpl.html',
                controller: 'rxscoreDrugComponentsChartCtrl'
            }, 'rxscore-comparative-chart@drugs.detail.rxscore': {
                templateUrl: 'app/rxscore/rxscore-comparative-chart.tpl.html',
                controller: 'rxscoreDrugComparisonChartCtrl'

            }
        }
    });

    // costs State for Drugs.detail.costs

    $stateProvider.state('drugs.detail.costs', {
        url: '/cost',
        resolve: {
            CostScoresForChart: function ($stateParams, drugCostsService) {
                return drugCostsService.getChartNumbers($stateParams.id);
            },
            CostsForPieChart: function ($stateParams, drugCostsService) {
                return drugCostsService.getPieChartNumbers($stateParams.id);
            }
        },
        views: {
            'tabcontent': {
                templateUrl: 'app/drug/drug.detail.costs.html',
                controller: 'costsDrugCtrl'
            }
        }
    });

    $stateProvider.state('drugs.detail.cases', {
        url: '/cases',
        resolve: {
            Cases: function (Restangular, $stateParams, SERVER_SETTINGS) {
                var Drugs = Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'lev/api');
                });
                return Drugs.one('drugs', $stateParams.id).getList('cases-all');
            }
        },

        views: {
            'tabcontent': {
                templateUrl: 'app/drug/drug.detail.cases.html',
                controller: "DrugCasesCtrl"
            }
        }
    });

}).run(function ($rootScope, ngToast, $state) {
    $rootScope
        .$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            ngToast.dismiss();
        });
});
