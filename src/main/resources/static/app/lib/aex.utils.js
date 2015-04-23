angular.module('aex.utils', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate']);

angular.module('aex.utils').config(function ($stateProvider) {

    /* Add New States Above */

});
angular.module('aex.utils').factory('rxsignalDataService', function () {

    var rxsignalDataService =  {} ;


    rxsignalDataService.gridData = undefined;
    rxsignalDataService = this;
    var setGridData = function(d){
     this.rxsignalGridData = d;
    };

    var getGridData = function(){
      return this.rxsignalGridData;
    };

    return {'setGrid': setGridData, 'getGrid': getGridData };

}).factory('utilService', function () {

    var utilFunctions = {};

    utilFunctions.normalizeStringForMatch = function(s){

            function filter(c) {
                switch (c) {
                    case 'æ':
                    case 'ä':
                        return 'ae';

                    case 'å':
                        return 'aa';

                    case 'á':
                    case 'à':
                    case 'ã':
                    case 'â':
                        return 'a';

                    case 'ç':
                    case 'č':
                        return 'c';

                    case 'é':
                    case 'ê':
                    case 'è':
                    case 'ë':
                        return 'e';

                    case 'î':
                    case 'ï':
                    case 'í':
                        return 'i';

                    case 'œ':
                    case 'ö':
                        return 'oe';

                    case 'ó':
                    case 'õ':
                    case 'ô':
                        return 'o';

                    case 'ś':
                    case 'š':
                        return 's';

                    case 'ü':
                        return 'ue';

                    case 'ù':
                    case 'ú':
                        return 'u';

                    case 'ß':
                        return 'ss';

                    case 'ё':
                        return 'е';

                    default:
                        return c;
                }
            }

            var normalized = '', i, l;
            //added if statement to avoid errors on empty input
            if (s) {
                s = s.toLowerCase();
                for (i = 0, l = s.length; i < l; i += 1) {
                    normalized += filter(s.charAt(i));
                }
            }
        return normalized;
        };


    utilFunctions.collectionToArray= function(objAsArray){
        var newArray = [];
        if (typeof(objAsArray) === 'object'){
            //console.log(objAsArray);
            angular.forEach(objAsArray, function(obj){
                var newObj = {};
                newArray.push(obj);
            });
        } else if(typeof(objAsArray) === 'object'){
            newArray = objAsArray;
        }

        return newArray;
    };

    utilFunctions.colors = {
        sevenQual: ['#e41a1c',
        '#377eb8',
        '#4daf4a',
        '#984ea3',
        '#ff7f00',
        '#ffff33',
        '#a65628'],
        sevenRed: ['#ffffb2',
            '#fed976',
            '#feb34c',
            '#fd8d3c',
            '#fc4e2a',
            '#e33a1c',
            '#b11026'
        ],
        tenHighCharts: ['#2f7ed8',
            '#0d233a',
            '#8bbc21',
            '#910000',
            '#1aadce',
            '#492970',
            '#f28f43',
            '#77a1e5',
            '#c42525',
            '#a6c96a'
        ]};

    utilFunctions.formatter = {};

    utilFunctions.formatter.gender = function(g){
        switch(g){
            case 'M':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Male', id: 1};
            case 'Male':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Male', id: 1};
            case 'F':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Female', id: 2};
            case 'Female':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Female', id: 2};

            case 'NS':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Unknown', id: 3};

            case 'Unk':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Unknown', id: 3};



        }
    };

    utilFunctions.formatter.outcomes =  function(d){
        switch (d){
            case 'HO':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Hospitalization'};
            case 'Hospitalization - Initial or Prolonged':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Hospitalization'};
            case 'DE':
                return {color: utilFunctions.colors.tenHighCharts[8], 'name': 'Death'};
            case 'Death':
                return {color: utilFunctions.colors.tenHighCharts[8], 'name': 'Death'};
            case 'RI':
                return {color: utilFunctions.colors.tenHighCharts[9], 'name': 'Required Intervention'};
            case 'Required Intervention to Prevent Permanent Impairment/Damage':
                return {color: utilFunctions.colors.tenHighCharts[9], 'name': 'Required Intervention'};
            case 'LT':
                return {color: utilFunctions.colors.tenHighCharts[0], 'name': 'Life-threatening'};
            case 'Life-Threatening':
                return {color: utilFunctions.colors.tenHighCharts[0], 'name': 'Life-threatening'};
            case 'OT':
                return {color: utilFunctions.colors.tenHighCharts[5], 'name': 'Other serious'};
            case 'Other':
                return {color: utilFunctions.colors.tenHighCharts[5], 'name': 'Other serious'};
            case 'DS':
                return {color: utilFunctions.colors.tenHighCharts[4], 'name': 'Disability'};
            case 'Disability':
                return {color: utilFunctions.colors.tenHighCharts[4], 'name': 'Disability'};
            case 'CA':
                return {color: utilFunctions.colors.tenHighCharts[7], 'name': 'Congenital Anomaly'};
            case 'Congenital Anomaly':
                return {color: utilFunctions.colors.tenHighCharts[7], 'name': 'Congenital Anomaly'};
            case 'NS':
                return {color: utilFunctions.colors.tenHighCharts[2], 'name': 'Not Stated'};
            case 'Not Stated':
                return {color: utilFunctions.colors.tenHighCharts[2], 'name': 'Not Stated'};
            case "1":
                return {color: utilFunctions.colors.tenHighCharts[2], 'name': 'All Outcomes'};
            case "Total":
                return {color: utilFunctions.colors.tenHighCharts[2], 'name': 'Total'};

        }
    };

    utilFunctions.formatter.drugCosts =  function(d){
        switch (d){
            case 'HO':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Hospitalization'};
            case 'Hospitalization - Initial or Prolonged':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Hospitalization'};
        }


    };

    utilFunctions.formatter.reporters =  function(d){
        switch (d){
            case 'MD':
                return {color: utilFunctions.colors.tenHighCharts[6], 'name': 'Physician', 'is_professional': true};

            case 'PH':
                return {color: utilFunctions.colors.tenHighCharts[7], 'name': 'Pharmacist', 'is_professional': true};
            case 'OT':
                return {color: utilFunctions.colors.tenHighCharts[8], 'name': 'Other Healthcare Professional', 'is_professional': true};
            case 'CN':
                return {color: utilFunctions.colors.tenHighCharts[2], 'name': 'Consumer', 'is_professional': false};
            case 'RN':
                return {color: utilFunctions.colors.tenHighCharts[2], 'name': 'Nurse', 'is_professional': false};

            case 'LW':
                return {color: utilFunctions.colors.tenHighCharts[0], 'name': 'Lawyer', 'is_professional': false};
            case 'NS':
                return {color: utilFunctions.colors.tenHighCharts[1], 'name': 'Not Stated', 'is_professional': false};
            default:
                return {color: utilFunctions.colors.tenHighCharts[1], 'name': d, 'is_professional': false};
        }


    };

    return utilFunctions;

});

angular.module('aex.utils').filter('naFilter', function($filter) {
    return function(input,arg) {
        if (Math.abs(input) > 0) {
            return $filter('number')(input, arg);
        } else {
            return "N/A";
        }

    };
});
angular.module('aex.utils').factory('$debounce', ['$rootScope', '$browser', '$q', '$exceptionHandler',
    function($rootScope,   $browser,   $q,   $exceptionHandler) {
        var deferreds = {},
            methods = {},
            uuid = 0;

        function debounce(fn, delay, invokeApply) {
            var deferred = $q.defer(),
                promise = deferred.promise,
                skipApply = (angular.isDefined(invokeApply) && !invokeApply),
                timeoutId, cleanup,
                methodId, bouncing = false;

            // check we dont have this method already registered
            angular.forEach(methods, function(value, key) {
                if(angular.equals(methods[key].fn, fn)) {
                    bouncing = true;
                    methodId = key;
                }
            });

            // not bouncing, then register new instance
            if(!bouncing) {
                methodId = uuid++;
                methods[methodId] = {fn: fn};
            } else {
                // clear the old timeout
                deferreds[methods[methodId].timeoutId].reject('bounced');
                $browser.defer.cancel(methods[methodId].timeoutId);
            }

            var debounced = function() {
                // actually executing? clean method bank
                delete methods[methodId];

                try {
                    deferred.resolve(fn());
                } catch(e) {
                    deferred.reject(e);
                    $exceptionHandler(e);
                }

                if (!skipApply){
                    $rootScope.$apply();
                }
            };

            timeoutId = $browser.defer(debounced, delay);

            // track id with method
            methods[methodId].timeoutId = timeoutId;

            cleanup = function(reason) {
                delete deferreds[promise.$$timeoutId];
            };

            promise.$$timeoutId = timeoutId;
            deferreds[timeoutId] = deferred;
            promise.then(cleanup, cleanup);

            return promise;
        }


        // similar to angular's $timeout cancel
        debounce.cancel = function(promise) {
            if (promise && promise.$$timeoutId in deferreds) {
                deferreds[promise.$$timeoutId].reject('canceled');
                return $browser.defer.cancel(promise.$$timeoutId);
            }
            return false;
        };

        return debounce;
    }]);
