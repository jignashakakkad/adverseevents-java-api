

/**
 * @ngdoc overview
 * @name portfolioManager
 * @description
 * # portfolioManager
 *
 * Main module of the application.
 */

angular.module('portfolio.detail', ['ngCookies','ngSanitize',  'ngGrid', 'FBAngular','ui.bootstrap','xeditable', 'ui.router', 'portfolio.detail.services','aex.constants']);

angular.module('portfolio.detail').config(function($stateProvider, SERVER_SETTINGS){
    //portfolio detail routes
    $stateProvider.state('portfolio.detail', {
        url: '/detail/:id',
        stateParams: '@id',
        resolve: {
            PortfolioObject: function ($stateParams, portfolioService){
                var d = portfolioService.getPortfolio($stateParams.id).get();
                return d;
            },
            Overview: function ($stateParams, portfolioService) {
                var d = portfolioService.getOverview($stateParams.id);
                return d;
            },
            Products: function ($stateParams, portfolioService) {
                var d = portfolioService.getProducts($stateParams.id);
                return d;
            },
            Revenues: function ($stateParams, portfolioService) {
                var d = portfolioService.getDrugDetail($stateParams.id);
                return d;
            },
            DrugOverviewData: function ($stateParams, portfolioService) {
                var d = portfolioService.getDrugOverview($stateParams.id);
                return d;
            },
            CompanyOverviewData: function ($stateParams, portfolioService) {
                var d = portfolioService.getCompanyOverview($stateParams.id);
                return d;
            },
            RxsignalData: function ($stateParams, portfolioService) {
                var d = portfolioService.getRxsignalDetail($stateParams.id);
                return d;
            },
            RxsignalSummaryData: function ($stateParams, portfolioService) {
                var d = portfolioService.getRxsignalSummary($stateParams.id);
                return d;
            },
            QuarterlyData: function ($stateParams, portfolioService) {
                var d = portfolioService.getReporting($stateParams.id);
                return d;
            },
            OutcomesData: function ($stateParams, portfolioService) {
                var d = portfolioService.getOutcomes($stateParams.id);
                return d;
            },
            DrugclassData: function ($stateParams, portfolioService) {
                var d = portfolioService.getDrugclass($stateParams.id);
                return d;
            },
            IndicationData: function ($stateParams, portfolioService) {
                var d = portfolioService.getIndication($stateParams.id);
                return d;
            },
            NewsEventsData: function ($stateParams, portfolioService) {
                var d = portfolioService.getNews($stateParams.id);
                return d;
            },
            RxscoreData: function ($stateParams, portfolioService) {
                var d = portfolioService.getRxscore($stateParams.id);
                return d;
            }
        },
        views: {
            'main@': {
                templateUrl: 'app/portfolio/detail/partials/portfolio.detail.html',
                controller: 'PortfolioDetailCtrl'
            },
            'report-header-right@portfolio.detail': {
                templateUrl: 'app/portfolio/detail/partials/detail-rxscore-badge.html',
                controller: 'RxscoreMeterCtrl'
            },
            'nav-tabs@portfolio.detail': {
                templateUrl: 'app/main.detail.tabs-lg.html'

            }
        }
    });
    $stateProvider.state('portfolio.detail.overview', {
        url: '/overview/:overviewdata',
        views: {
            'tabcontent': {
                templateUrl: 'app/portfolio/detail/partials/portfolio.detail.overview.html',
                controller: 'PortfolioOverviewCtrl'
            },
            'overview-top@portfolio.detail.overview': {
                templateUrl: 'app/portfolio/detail/partials/overview.summary.html',
                controller: 'PortfolioOverviewCtrl'
            },
            'overview-topv2@portfolio.detail.overview': {
                templateUrl: 'app/portfolio/detail/partials/overview.summary-alt.html',
                controller: 'PortfolioOverviewCtrl'
            }
        }
    });
    $stateProvider.state('portfolio.detail.rxsignal-detail', {
        url: '/rxsignal',
        views: {
            'tabcontent': {
                templateUrl: 'app/portfolio/detail/partials/portfolio.detail.rxsignal.html',
                controller: 'PortfolioRxsignalCtrl'
            }
        }
    });
    $stateProvider.state('portfolio.detail.rxsignal-summary', {
        url: '/rxsignal-summary',
        views: {
            'tabcontent': {
                templateUrl: 'app/portfolio/detail/partials/portfolio.detail.rxsignal.summary.html',
                controller: 'PortfolioRxsignalSummaryCtrl'
            }
        }
    });
    $stateProvider.state('portfolio.detail.news', {
        url: '/news',
        views: {
            'tabcontent': {
                templateUrl: 'app/portfolio/detail/partials/portfolio.detail.news.html',
                controller: 'PortfolioNewsCtrl'
            }
        }
    });
    $stateProvider.state('portfolio.detail.reporting', {
        url: '/reporting',
        views: {
            'tabcontent': {
                templateUrl: 'app/portfolio/detail/partials/portfolio.detail.reporting.html',
                controller: 'PortfolioReportingCtrl'
            }
        }
    });
    $stateProvider.state('portfolio.detail.outcomes', {
        url: '/outcomes/:datayear',
        resolve: {
            OutcomesData: function ($stateParams, portfolioService) {
                var d = portfolioService.getOutcomes($stateParams.id);
                return d;
            },
            'AverageOutcomesData': function(portfolioAvgOutcomeService, OutcomesData) {
                return portfolioAvgOutcomeService.getAvgOutcomes(OutcomesData);
            }
         },
        views: {
            'tabcontent': {
                templateUrl: 'app/portfolio/detail/partials/portfolio.detail.outcomes.html',
                controller: 'PortfolioOutcomesCtrl'
            }
        }
    });
    $stateProvider.state('portfolio.detail.rxscore', {
        url: '/rxscore',
        views: {
            'tabcontent': {
                templateUrl: 'app/portfolio/detail/partials/portfolio.detail.rxscore.html',
                controller: 'PortfolioRxscoreCtrl'
            }
        }
    });

    $stateProvider.state('portfolio.detail.indication', {
        url: '/indication',
        views: {

            'tabcontent': {
                templateUrl: 'app/portfolio/detail/partials/portfolio.detail.indication.html',
                controller: 'PortfolioIndicationCtrl'
            }

        }
    });
    $stateProvider.state('portfolio.detail.drugclass', {
        url: '/drugclass',
        views: {

            'tabcontent': {
                templateUrl: 'app/portfolio/detail/partials/portfolio.detail.drugclass.html',
                controller: 'PortfolioDrugclassCtrl'
            }
        }
    });
}).run();
