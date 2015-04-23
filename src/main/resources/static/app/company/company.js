angular.module('company', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'aex.utils', 'company.services', 'ngGrid', 'FBAngular','portfolio.listener','aex.constants', 'common']);

angular.module('company').config(function ($stateProvider) {
    $stateProvider
        .state('company', {
            url: '/company',
            'abstract': true,
            views: {
                'nav': {templateUrl: 'app/main.nav.html', controller: 'HomeSearchCtrl'},
                'main': {templateUrl: 'app/company/company.html'},
                'footer@': {templateUrl: 'app/main.footer.html'}
            }
        });
    $stateProvider
        .state('company.list', {
            url: '',
            views: {
                'list@company': {
                    templateUrl: 'app/company/list/company.list.html',
                     controller: 'CompanyListCtrl'
                }

            },
            resolve: {
                List: function(companyService){
                        return companyService.getAll();
                    }
                }

        })
        .state('company.detail', {
            url: '/{id:[0-9]{1,4}-[0-9]{1,4}}',
            resolve: {
                Overview: function ($stateParams, companyService) {
                    var d = companyService.getOverview($stateParams.id);
                    return d;
                },
                Products: function ($stateParams, companyService) {
                    var d = companyService.getProducts($stateParams.id);
                    return d;
                },
                Revenues: function ($stateParams, companyService) {
                    var d = companyService.getRevenues($stateParams.id);
                    // not a promise
                    return d;
                },
                RxsignalData: function ($stateParams, companyService) {
                    var d = companyService.getRxsignalDetail($stateParams.id);
                    // promise
                    return d;
                },
                RxsignalSummaryData: function ($stateParams, companyService) {
                    var d = companyService.getRxsignalSummary($stateParams.id);
                    return d;
                },
                QuarterlyData: function ($stateParams, companyService) {
                    var d = companyService.getReporting($stateParams.id);
                    return d;
                },
                OutcomesData: function ($stateParams, companyService) {
                    var d = companyService.getOutcomes($stateParams.id);
                    return d;
                },
                DrugclassData: function ($stateParams, companyService) {
                    var d = companyService.getDrugclass($stateParams.id);
                    return d;
                },
                IndicationData: function ($stateParams, companyService) {
                    var d = companyService.getIndication($stateParams.id);
                    return d;
                },
                NewsEventsData: function ($stateParams, companyService) {
                    var d = companyService.getNews($stateParams.id);
                    return d;
                },
                RxscoreData: function ($stateParams, companyService) {
                    var d = companyService.getRxscore($stateParams.id);
                    return d;
                },
                Exposure: function (portfolioExposureService, $stateParams){
                    return portfolioExposureService.checkExposure($stateParams.id);

                }
            },
            views: {
                'main@': {
                    templateUrl: 'app/company/detail/company.detail.html',
                    controller: 'CompanyDetailCtrl'
                },
                'report-header-right@company.detail': {
                    templateUrl: 'app/company/detail/partials/company-detail-rxscore-badge.html',
                    controller: 'CompanyRxscoreMeterCtrl'
                },
                'nav-tabs@company.detail': {
                    templateUrl: 'app/main.detail.tabs-lg.html'
                    // controller: 'CompanyDetailCtrl'
                }
            }
        });
    $stateProvider.state('company.detail.overview', {
        url: '/overview',
        controller: 'CompanyOverviewCtrl',
        views: {
            'tabcontent': {
                templateUrl: 'app/company/detail/partials/company.detail.overview.html',
                controller: 'CompanyOverviewCtrl'
            },
            'overview-top@company.detail.overview': {
                templateUrl: 'app/company/detail/partials/overview.summary.html'
                // line below causing controller to be run a second time
                // controller: 'CompanyOverviewCtrl'
            },
            'overview-topv2@company.detail.overview': {
                templateUrl: 'app/company/detail/partials/overview.summary-alt.html'
                // line below causing controller to be run a third time
                // controller: 'CompanyOverviewCtrl'
            }
        }
    });
    $stateProvider.state('company.detail.rxsignal', {
        url: '/rxsignal',

        views: {
            'tabcontent': {
                templateUrl: 'app/company/detail/partials/company.detail.rxsignal.html',
                controller: 'CompanyRxsignalCtrl'
            }
        }
    });
    $stateProvider.state('company.detail.rxsignal-summary', {
        url: '/rxsignal-summary',
        views: {
            'tabcontent': {
                templateUrl: 'app/company/detail/partials/company.detail.rxsignal.summary.html',
                controller: 'CompanyRxsignalSummaryCtrl'
            }
        }
    });
    $stateProvider.state('company.detail.news', {
        url: '/news',
        views: {
            'tabcontent': {
                templateUrl: 'app/company/detail/partials/company.detail.news.html',
                controller: 'CompanyNewsCtrl'
            }
        }
    });
    $stateProvider.state('company.detail.reporting', {
        url: '/reporting',
        views: {
            'tabcontent': {
                templateUrl: 'app/company/detail/partials/company.detail.reporting.html',
                controller: 'CompanyReportingCtrl'
            }
        }
    });
    $stateProvider.state('company.detail.outcomes', {
        url: '/outcomes/:datayear',
        views: {
            'tabcontent': {
                templateUrl: 'app/company/detail/partials/company.detail.outcomes.html',
                controller: 'CompanyOutcomesCtrl'
            }
        }
    });
    $stateProvider.state('company.detail.rxscore', {
        url: '/rxscore',
        views: {
            'tabcontent': {
                templateUrl: 'app/company/detail/partials/company.detail.rxscore.html',
                controller: 'CompanyRxscoreCtrl'
            }
        }
    });

    $stateProvider.state('company.detail.indication', {
        url: '/indication',
        views: {

            'tabcontent': {
                templateUrl: 'app/company/detail/partials/company.detail.indication.html',
                controller: 'CompanyIndicationCtrl'
            }

        }
    });
    $stateProvider.state('company.detail.drugclass', {
        url: '/drugclass',
        views: {

            'tabcontent': {
                templateUrl: 'app/company/detail/partials/company.detail.drugclass.html',
                controller: 'CompanyDrugclassCtrl'
            }
        }
    });

});
