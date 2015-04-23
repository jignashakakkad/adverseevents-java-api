var exports;
var environment = require('./environment.js');

exports.config = {

    framework: 'jasmine2',
    allScriptsTimeout: 90000,
    getPageTimeout: 90000,
    sauceUser: 'adverseevents',
    sauceKey: '4c0a9eb7-6b16-4d8c-b431-ef22efe8958c',
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    // seleniumPort: 4445,

    seleniumJarFile:'node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',
    specs: environment.protractorFiles.specs,
    suites: environment.protractorFiles.suites,

    // Suites can be called at command line runtime: protractor tests/e2e/protractor.conf.js --suite smoke
    multiCapabilities: [{
        'browserName': 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'E2E Test',
        "sauceAdvisor": false,
        // 'version': '39',
        'selenium-version': '2.45.0',
        'chromedriver-version': '2.14',
        'platform': 'OS X 10.8',
        'recordScreenshots': false,
        'recordVideo': false,
        'screenResolution':'1920x1200',
        "disablePopupHandler": true
    }],

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    onPrepare: function() {
        "use strict";

        // Get jasmine reporter for cli
        var SpecReporter = require('jasmine-spec-reporter');

        // Add spec reporter to get rid of crappy dot reporter.
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: false,     // display stacktrace for each failed assertion
            displayFailuresSummary: false, // display summary of all failures after execution
            displaySuccessfulSpec: true,  // display each successful spec
            displayFailedSpec: true,      // display each failed spec
            displayPendingSpec: true,    // display each pending spec
            displaySpecDuration: true,   // display each spec duration
            displaySuiteNumber: true    // display each suite number (hierarchical)
        }));

        // Set our base url
        var _baseUrl = '';

        browser.getProcessedConfig().then(function(config) {
            _baseUrl = config.baseUrl;
        });
        console.log('BASE_URL USED IS: '+_baseUrl);

        // Handle live login scenarios
        if(String(_baseUrl).indexOf('adverseevents.com') !== -1 || String(_baseUrl).indexOf('explorer') !== -1){
            browser.driver.get(_baseUrl + '../login.php');
            browser.driver.findElement(by.id('fakeemail')).click();
            browser.driver.findElement(by.id('email')).sendKeys('e2e@adverseevents.com');
            browser.driver.findElement(by.id('fakepassword')).click();
            browser.driver.findElement(by.id('password')).sendKeys('welcome2015');
            browser.driver.findElement(by.css('button.btn.loginButton')).click();

            // Login takes some time, so wait until it's done.
            // For the test app's login, we know it's done when it redirects to
            // index.html.
            browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                    return /#/.test(url);
                });
            });
        } else {
            // handle localhost
            //if(String(env.baseUrl).split('/').indexOf('localhost') !== -1){
            browser.driver.get(_baseUrl+'#/');
            browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                    return /#/.test(url);
                });
            });

            //}


            // RESERVED FOR OTHER SCENARIOS...
        }

    },


    jasmineNodeOpts: {
        isVerbose: false,
        showTiming: true,
        showColors: true,
        print: function() {},
        includeStackTrace: false,
        defaultTimeoutInterval: 120000
    }

};
