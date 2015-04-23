(function () {
    'use strict';
    angular.module('common.controllers').controller('LocalStorageController', ['$scope', '$state', '$stateParams', 'localStorageService', LocalStorageController]);
    function LocalStorageController($scope, $state, $stateParams, localStorageService) {
        $scope.clearLocalStorage = function (key, stateParams, storageParams) {
            if (key === undefined) {
                var portfolioSubstate = angular.isUndefined($stateParams.overviewdata) ? '' : '.' + $stateParams.overviewdata;
                key = $state.current.name + portfolioSubstate;
            }
            key = key+".";

            var keys = [];
            if (stateParams !== undefined && stateParams.length > 0) {
                _.each(stateParams, function (param) {
                    keys.push(key + "" + $stateParams[param]);
                });
            } else {
                keys.push(key);
            }

            var finalKeys = [];
            if (storageParams !== undefined && storageParams.length > 0) {
                _.each(keys, function (key) {
                    _.each(storageParams, function (param) {
                        finalKeys.push(key + "" + param);
                    });
                });
            } else {
                finalKeys = angular.copy(keys);
            }

            angular.forEach(finalKeys, function(key){
                localStorageService.clearAll(key);
            });

            $state.reload();
        }
    }
})();
