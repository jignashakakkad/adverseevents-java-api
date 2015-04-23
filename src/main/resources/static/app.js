angular.module('AdverseEventsExplorer.main', ['restangular', 'ngResource', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ngToast', 'ui.bootstrap', 'ui.utils', 'ui.router', 'ui.select', 'rxsignal', 'outcomes', 'news', 'drugs', 'mechanisms', 'drugclass', 'indications', 'company', 'aex.utils', 'aex.mocks', 'aex.constants', 'company.services', 'portfolio', 'ngRaven', 'toast.services','angularSimpleSpinner', 'druggroup', 'portfolio.utils', 'ngCsv']);
angular.module('AdverseEventsExplorer.main').value('version', {major: 1, minor: 3, patch: 4, build: 149});

angular.module('AdverseEventsExplorer.main').value('environment', {'server':'production'});

angular.module('AdverseEventsExplorer.main').config(function($stateProvider, $urlRouterProvider) {
    /* Add New States Above */
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                'nav': {
                    templateUrl: 'app/main.nav.html',
                    controller: 'HomeSearchCtrl'
                },
                'search': {
                    templateUrl: 'app/main.search.html',
                    controller: 'HomeSearchCtrl'
                },
                'main': {
                    templateUrl: 'app/main.html',
                    controller: 'HomeCtrl'
                },
                'news@home': {
                    templateUrl: 'app/news/news.list.html',
                    controller: 'DsmCtrl'
                },
                'search@home': {
                    templateUrl: 'app/main.search.html',
                    controller: 'HomeSearchCtrl'

                },
                'footer': {
                    templateUrl: 'app/main.footer.html'

                }
            }
        });

    $urlRouterProvider.otherwise('/');

});

angular.module('AdverseEventsExplorer.main').config(function ($tooltipProvider) {
    $tooltipProvider
        .options({
            placement: 'top',
            animation: false,
            popupDelay: 0
        });
    $tooltipProvider
        .setTriggers({
            'mouseenter': 'mouseleave',
            'click': 'click',
            'focus': 'blur',
            'never': 'mouseleave',
            'show': 'hide',
            'dblcick': 'click'
        });
});
angular.module('AdverseEventsExplorer.main').value('RavenConfig', {
    dsn: 'https://d1ba90fb33d14999b4d182cc48ada4c6@app.getsentry.com/28594', // this should be your raven endpoint URL
    ravenOptions: {
        // Will cause a deprecation warning, but the demise of `ignoreErrors` is still under discussion.
        // See: https://github.com/getsentry/raven-js/issues/73
        ignoreErrors: [
            // Random plugins/extensions
            'top.GLOBALS',
            // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
            'originalCreateNotification',
            'canvas.contentDocument',
            'MyApp_RemoveAllHighlights',
            'http://tt.epicplay.com',
            'Can\'t find variable: ZiteReader',
            'jigsaw is not defined',
            'ComboSearch is not defined',
            'http://loading.retry.widdit.com/',
            'atomicFindClose',
            // Facebook borked
            'fb_xd_fragment',
            // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
            // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
            'bmi_SafeAddOnload',
            'EBCallBackMessageReceived',
            // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
            'conduitPage',
            // Generic error code from errors outside the security sandbox
            // You can delete this if using raven.js > 1.0, which ignores these automatically.
            'Script error.'
        ],
        ignoreUrls: [
            // Facebook flakiness
            /graph\.facebook\.com/i,
            /explorer\.adverseevents\.com\/dev\/rxsignal/ig,

            // Facebook blocked
            /connect\.facebook\.net\/en_US\/all\.js/i,
            // Woopra flakiness
            /eatdifferent\.com\.woopra-ns\.com/i,
            /static\.woopra\.com\/js\/woopra\.js/i,
            // Chrome extensions
            /extensions\//i,
            /^chrome:\/\//i,
            // Other plugins
            /127\.0\.0\.1:4001\/isrunning/i,  // Cacaoweb
            /colin-macpro-ssd830\.local:9002/i,  // Cacaoweb
            /colin-macpro-ssd830\.local:9002/i,  // Cacaoweb
            /192\.168\.1\.99:9002/i,  // Cacaoweb
            /192\.168\.1\.100:9002/i,  // Cacaoweb
            /localhost:9001/i,  // Cacaoweb
            /localhost:9002/i,  // Cacaoweb
            /localhost:9003/i,  // Cacaoweb
            /webappstoolbarba\.texthelp\.com\//i,
            /metrics\.itunes\.apple\.com\.edgesuite\.net\//i
        ]
    }
});
angular.module('AdverseEventsExplorer.main').constant('_START_REQUEST_', '_START_REQUEST_');
angular.module('AdverseEventsExplorer.main').constant('_END_REQUEST_', '_END_REQUEST_');
// ngToast popup config settings. refer here for more: http://tameraydin.github.io/ngToast/
angular.module('AdverseEventsExplorer.main').config(['ngToastProvider', function (ngToast) {
    ngToast.configure({
        verticalPosition: 'top',
        horizontalPosition: 'right',
        maxNumber: 6,
        class: 'info',
        dismissButton: true,
        timeout: 5000
    });
}]);

angular.module('AdverseEventsExplorer.main').run(function (localStorageService, $rootScope, $log, $q, toastPopup, $window, $location, $state, $cookies, $stateParams, version, Raven, SERVER_SETTINGS) {

    var d;
    var _start;
    var _end;
    var auth = "0", uid = 0, userObj, visit;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$state = $state;

    var build = localStorageService.get('VERSION');

    if (!build){
        localStorageService.clearAll();
        localStorageService.set('VERSION', version);
    } else {
        var storedBuild = d3.sum(_.values(build));
        var currentBuild = d3.sum(_.values(version));

        if(currentBuild !== storedBuild){
            localStorageService.clearAll();
            localStorageService.set('VERSION', version);
            $state.reload();
        }
    }

    function startTimer() {
        return moment();
    }

    function stopTimer() {
        return moment();

    }

    function _diff(_start) {

        //console.log(moment.duration(moment().diff(_start)).as('seconds'));
        return moment.duration(moment().diff(_start)).as('seconds');
    }

    if (SERVER_SETTINGS.DEBUG_LOGGER === true) {
        $rootScope
            .$on('$stateChangeStart', function(event, target, toParams, fromState) {
                var _msg;
                _msg = 'StateChange from: ' + (fromState.name) + ' to: <strong>' + target.name + '</strong>';
                var _pop = {content: _msg, 'class': 'info'};

                toastPopup.log(_pop);
                _start = moment();
                return _start;
            });
        $rootScope
            .$on('$stateNotFound', function(event, target, toParams, fromState) {
                var _msg;
                _msg = 'Unknown State' + target.name;
                var _pop = {content: _msg, 'class': 'info'};
                toastPopup.log(_pop);
            });
        $rootScope
            .$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                console.log(['stateChangeError', error]);
                $state.go(fromState, fromParams, {reload: true}).then(function() {
                    $log.error([fromState, toState, error]);
                    var _msg;
                    _msg = 'Can\'t go there.' + toState.name + ', Error: ' + error.statusText + error.flash + error.data.flash + 'Notification unk.';
                    var _pop = {content: _msg, 'class': 'info'};
                    toastPopup.log(_pop);
                });

            });

        $rootScope
            .$on('$stateChangeSuccess', function(event, target, toParams, fromState) {
                var d = _diff(_start);
                var _msg;
                _msg = 'New state: ' + target.name + ' (' + d + ' sec)';
                var _pop = {content: _msg, 'class': 'info'};
                toastPopup.log(_pop);
            });
    }
    auth = $cookies['aex[\'auth\']'];
    uid = $cookies['aex[\'uid\']'] || 0;
    if (!("1" !== auth || uid === '' || parseInt(uid,10) < 1)) {
//            $window.location = '/login.php';

    } else {
        visit = {};
        if ($stateParams.id) {
            visit.id = $stateParams.id;
        }
        visit.user_id = $cookies['aex[\'uid\']'];
        visit.token = $cookies['aex[\'token\']'];
        visit.auth_key = $cookies['aex[\'token\']'];
        visit.user_id = $cookies['aex[\'uid\']'];
        userObj = angular.fromJson($cookies['aexuser']);
        if (typeof(userObj) === 'object') {

            Raven.setUser({
                user_id: userObj.uid,
                token: $cookies['aex[\'token\']'],
                auth: $cookies['aex[\'auth\']'],
                path: $location.path(),
                company: userObj.org,
                email: userObj.email
            });
        }
        $rootScope.$visit = visit;
        Raven.setTagsContext({path: $location.path()});

        Raven.setTagsContext({releaseFull: version.major + '.' + version.minor + '.' + version.patch});
        Raven.setTagsContext({releaseSub: version.major + '.' + version.minor});
    }

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
