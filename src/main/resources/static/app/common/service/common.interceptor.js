(function () {
    'use strict';
    function HttpInterceptor($q) {
        return {
            // On request success
            request: function (config) {
                // console.log(config); // Contains the data about the request before it is sent.
                // Return the config or wrap it in a promise if blank.
                return config || $q.when(config);
            },
            // On request failure
            requestError: function (rejection) {
                // console.log(rejection); // Contains the data about the error on the request.
                // Return the promise rejection.
                return $q.reject(rejection);
            },
            // On response success
            response: function (response) {
                // console.log(response); // Contains the data from the response.
                // Return the response or promise.
                return response || $q.when(response);
            },
            // On response failture
            responseError: function (rejection) {
                console.log("here error is :: " + rejection); // Contains the data about the error.
                if (rejection.status = 500) {
//                   alert('500 error');
                    // Raven Capture
                    rejection.data = [];
                    return rejection;
                }
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    }
    angular.module('common.services').service('HttpInterceptor', ['$q', HttpInterceptor]);
})();
