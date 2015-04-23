/**
 * Created by cerdman on 1/7/15.
 */
// Karma configuration
// Generated on Tue Dec 16 2014 23:47:16 GMT-0800 (PST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app.js': ['coverage'],
            'app/*.js': ['coverage'],
            'app/drug/drugs.js': ['coverage'],
            'app/company/company.js': ['coverage'],
            'app/drugclass/drugclass.js': ['coverage'],
            'app/mechanisms/mechanisms.js': ['coverage'],
            'app/news/*.js': ['coverage'],
            'app/lib/aex.utils.js': ['coverage'],
            'app/lib/aex.mocks.js': ['coverage'],
            'app/indications/indications.js': ['coverage'],
            'app/core/*.js': ['coverage'],
            'app/aex/*.js': ['coverage'],
            'app/rxscore/*.js': ['coverage'],
            'common/**/*.js': ['coverage']
        },

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [

            "bower_components/jquery/jquery.js",
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/sinonjs/sinon.js',
            'tests/fixtures/grunt-auth-cookies.js',
            'vendor/highstock.js',
            'bower_components/d3/d3.js',
            'bower_components/raven-js/dist/raven.js',
            'bower_components/lodash/dist/lodash.underscore.js',
            'vendor/c3.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/angular-ui-utils/ui-utils.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-ui-select/dist/select.js',
            'vendor/angular-ui/ng-grid/ng-grid-2.0.12.debug.custom.js',
            'bower_components/raven-js/plugins/angular.js',
            'bower_components/restangular/dist/restangular.js',
            'bower_components/angular-fullscreen/src/angular-fullscreen.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-cookies/angular-cookies.min.js',
            'bower_components/ui-router-extras/release/ct-ui-router-extras.min.js',
            'bower_components/highcharts-ng/dist/highcharts-ng.min.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
            'bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
            'bower_components/ngtoast/dist/ngToast.js',
            'bower_components/angular-xeditable/dist/js/xeditable.js',
            'bower_components/angular-simple-spinner/angular_simple_spinner.js',
            'app/lib/aex.utils.js',
            'app/lib/aex.mocks.js',
            'app/lib/aex.constants.js',
            'app/core/dataservice.js',
            'app/rxsignal/rxsignal.js',
            'app/rxsignal/rxsignal-chart-controller.js',
            'common/services/rxsignalService.js',
            'common/services/dsmService.js',
            'common/directives/popoverHtmlUnsafe/popoverHtmlUnsafe.js',
            'app/common/common.js',
            'app/common/service/common.services.js',
            'app/common/controller/common.tab.controller.js',
            'app/common/service/common.tab.service.js',
            'app/common/rxscore/rxscore.common.js',
            'app/common/service/common.tooltip.service.js',
            'app/common/service/common.interceptor.js',
            'common/services/dsmService.js',
            'app/outcomes/outcomes.js',
            'app/news/news.js',
            'app/indications/indications.js',
            'app/mechanisms/mechanisms.js',
            'app/events/events.js',
            'app/list.js',
            'app/users/users.js',
            'app/drug/drugs.js',
            'app/indications/indications-controller.js',
            'vendor/argusoft/selectize.js',
            'app/drugclass/drugclass.js',
            'app/drugclass/drugclass.detail.overview.js',
            'app/indications/indications.detail.overview.js',
            'app/indications/indications.list.js',
            'app/drugclass/drugclass.list.js',
            'app/drugclass/drugclass.detail.cases.js',
            'app/indications/indications.detail.cases.js',
            'app.js',
            'app/main.js',
            'app/news/news.js',
            'app/news/news.controller.js',
            'app/drug/drugs.js',
            'app/drug/drugs.list.js',
            'app/drug/drug.detail.js',
            'app/drug/drug.detail.overview.js',
            'app/drug/drug.detail.monitor.js',
            'app/drug/drug.detail.outcomes.js',
            'app/drug/drug.detail.rxsignal.js',
            'app/drug/drug.detail.rxscore.js',
            'app/drug/drug.detail.cases.js',
            'app/rxscore/rxscore-chart-gauge.js',
            'app/mechanisms/mechanisms.list.js',
            'common/filters/PropsFilter.js',
            'common/filters/incidenceFilter.js',
            'common/filters/to_trusted.js',
            'common/services/overviewService.js',
            'common/directives/showHide.js',
            'app/drug/drug-timeline.js',
            'app/company/company.js',
            'app/company/service/company.services.js',
            'common/directives/chart-rxscore-drug.js',
            'common/directives/MappedNames.js',
            'common/filters/toHtmlList.js',
            'common/filters/casesFilter.js',
            'common/services/toastService.js',
            'common/filters/filterMultiple.js',
            'common/filters/filterUnique.js',
            'app/rxscore/rxscore.js',
            'app/drug/RxscoreDrugController.js',
            'app/drug/RxscoreDrugChartController.js',
            'app/company/company.detail-controllers.js',
            'app/company/service/tooltipService.js',
            'app/company/filter/titleCase.js',
            'app/drug/drug-timeline.js',
            'app/company/company.js',


            'app/portfolio/manager/services/portfolio.manager.service.js',
            'app/portfolio/manager/services/port-service.js',
            'app/portfolio/portfolio-directives.js',

            'app/portfolio/users/portfolio.users.js',
            'app/portfolio/utils/portfolio.utils.module.js',
            'app/portfolio/manager/portfolio-manager-directives.js',
            'app/portfolio/listener/portfolio.listener.module.js',
            'app/portfolio/manager/services/new-port-service.js',
            'app/portfolio/manager/portfolio-manager.js',

            'app/portfolio/detail/services/portfolio-detail-services.js',
            'app/portfolio/detail/portfolio-detail.js',
            'app/portfolio/detail/portfolio-controllers.js',


            'app/portfolio/portfolio.js',
            'app/druggroup/service/druggroup.services.js',
            'app/druggroup/list/druggroup.list.js',
            'app/druggroup/detail/druggroup.detail.js',


            {pattern: 'app/druggroup/**/*.js', included: true},
            {pattern: 'app/drug/**/*.js', included: true},
            {pattern: 'app/lib/*.js', included: true},
            {pattern: 'app/common/controller/*.js', included: true},
            {pattern: 'app/common/plugin/*.js', included: true},
            {pattern: 'common/filters/*.js', included: true},

            {pattern: 'app/**/*spec.js', included: true},
            {pattern: 'app/company/**/*spec.js', included: true},
            {pattern: 'app/drug/**/*spec.js', included: true},
            {pattern: 'vendor/**/*.js', included: false},
            {pattern: 'app/portfolio/**/*spec.js', included: true}

        ],

        // list of files to exclude
        exclude: ['app/druggroup/**/*mock*.js'],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['junit','progress',  'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DISABLE,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        plugins: ['karma-html2js-preprocessor', 'karma-junit-reporter', 'karma-jasmine','karma-coverage', 'karma-phantomjs-launcher'],
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        junitReporter: {
            outputFile: 'tests/test-results.xml',
            suite: ''
        },
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
