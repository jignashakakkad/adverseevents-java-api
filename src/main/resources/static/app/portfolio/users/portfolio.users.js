/**
 * @ngdoc service
 * @name portfolio.users.portfolioUserService
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $replace_me
 *
 * */
angular.module('portfolio.users', ['aex.constants', 'ngCookies']);
angular
    .module('portfolio.users')
    .value('API_URL', 'portfolio/public/api')

    // DEBUG LEVEL LOGGING SPECIFIC TO AUTHORIZATION STUFF
    .value('LOG_LEVEL', true)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    })

    .factory('portfolioAuthService', function UserFactory($http, API_URL, AuthTokenFactory, SERVER_SETTINGS, $q) {
        'use strict';
        var FULL_URL = SERVER_SETTINGS.BASE_URL + API_URL;
        return {
            login: login,
            logout: logout,
            getUser: getUser
        };

        function login(username, password) {
            return $http.post(FULL_URL + '/auth/login', {
                username: username,
                password: password
            }).then(function success(response) {
                AuthTokenFactory.setToken(response.data.token);
                return response;
            });
        }

        function logout() {
            AuthTokenFactory.setToken();
        }

        function getUser() {
            if (AuthTokenFactory.getToken()) {
                return $http.get(FULL_URL+'/auth/login');
            } else {
                // window.location.href = '/#/portfolio';
                return $q.reject({data: 'User not authorized (401).', flash: 'Not Authorized.'});
            }
        }
    })
    .factory('AuthTokenFactory', function AuthTokenFactory($window) {
        'use strict';
        var store = $window.localStorage;
        var key = 'auth-token';

        return {
            getToken: getToken,
            setToken: setToken
        };

        /**
         *
         * @returns {*}
         */
        function getToken() {
            return store.getItem(key);
        }

        /**
         *
         * @param token
         */
        function setToken(token) {
            if (token) {
                store.setItem(key, token);
            } else {
                store.removeItem(key);
            }
        }

    })
    .factory('AuthInterceptor', function AuthInterceptor($log, AuthTokenFactory) {
        'use strict';
        return {
            request: addToken

        };

        function addToken(config) {
            var token = AuthTokenFactory.getToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

        function handleResponseError(rejection) {
            if (rejection.status === 400 || rejection.status < 403) {
                $log.warn(['AuthInterceptor', ['handleResponseError', rejection.status, 'NotAuthorized']]);
            }
            if (rejection.status === 500 || rejection.status < 502) {
                $log.warn(['AuthInterceptor', ['handleResponseError', rejection.status, 'NotAuthorized']]);
            }
            if (rejection.status === 400 || rejection.status < 403) {
                $log.warn(['AuthInterceptor', ['handleResponseError', rejection.status, 'NotAuthorized']]);
            }
            $log.debug(rejection);
            //rejection.data = {'flash': 'Unauthorized ' + rejection.status};
            //return rejection;
        }
    }).run()
    .factory('loggedIn', function loggedIn(AuthTokenFactory) {
        'use strict';

        return {
            checkUser: checkUser
        };

        function checkUser() {
            if (AuthTokenFactory.getToken()) {
                return true;
            } else {
                return false;
            }
        }
    });
