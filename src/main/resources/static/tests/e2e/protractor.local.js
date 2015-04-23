var exports;
var environment = require('./environment.js');

exports.config = {

    framework: 'jasmine2',

    allScriptsTimeout: 90000,
    getPageTimeout: 90000,
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    //seleniumJarFile:'node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
    specs: environment.protractorFiles.specs,
    suites: environment.protractorFiles.suites,

    multiCapabilities: [{
        'browserName': 'chrome' ,
        'chromeOptions': {
            'args': ['no-sandbox']
        },
        shardTestFiles: true,
        maxInstances: 3
    }],


    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    onPrepare: function() {
        "use strict";



        // Check our base url
        var _baseUrl = '';
        var SpecReporter = require('jasmine-spec-reporter');
        // Add spec reporter to get rid of crappy dot reporter.
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: false,     // display stacktrace for each failed assertion
            displayFailuresSummary: true, // display summary of all failures after execution
            displaySuccessfulSpec: false,  // display each successful spec
            displayFailedSpec: false,      // display each failed spec
            displayPendingSpec: false,    // display each pending spec
            displaySpecDuration: true,   // display each spec duration
            displaySuiteNumber: false    // display each suite number (hierarchical)
        }));

        browser.driver.manage().window().maximize();

        browser.getProcessedConfig().then(function(config) {
            _baseUrl = config.baseUrl;
        });
        console.log('BASE_URL USED IS: '+_baseUrl);

//        // Handle live login scenarios
//        if(String(_baseUrl).indexOf('adverseevents.com') !== -1){
//            browser.driver.get(_baseUrl + '../login.php');
//            browser.driver.findElement(by.id('fakeemail')).click();
//            browser.driver.findElement(by.id('email')).sendKeys('e2e@adverseevents.com');
//            browser.driver.findElement(by.id('fakepassword')).click();
//            browser.driver.findElement(by.id('password')).sendKeys('welcome2015');
//            browser.driver.findElement(by.css('button.btn.loginButton')).click();
//
//            // Login takes some time, so wait until it's done.
//            // For the test app's login, we know it's done when it redirects to
//            // index.html.
//            browser.driver.wait(function() {
//                return browser.driver.getCurrentUrl().then(function(url) {
//                    return /#/.test(url);
//                });
//            });
//        } else {
//            // handle localhost
//            //if(String(env.baseUrl).split('/').indexOf('localhost') !== -1){
//            browser.driver.get(_baseUrl+'#/');
//            browser.driver.wait(function() {
//                return browser.driver.getCurrentUrl().then(function(url) {
//                    return /#/.test(url);
//                });
//            });
//
//            //}
//
//
//            // RESERVED FOR OTHER SCENARIOS...
//        }
//
        // ** Custom Locators *** //
        by.addLocator('link', function (href, parentElement) {
            parentElement = parentElement || document;
            var links = parentElement.querySelectorAll('a');
            return Array.prototype.filter.call(links, function (link) {
                return (link.href && ((link.href === href) || (link.href === (link.baseURI + href))));
            });
        });
    },


    jasmineNodeOpts: {
        isVerbose: false,
        showTiming: true,
        showColors: true,
        includeStackTrace: false,
        defaultTimeoutInterval: 90000
    }

};
