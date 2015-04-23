angular.module('AdverseEventsExplorer.main').controller('BaseCtrl', function ($scope, $state) {
    'use strict';

});

angular.module('AdverseEventsExplorer.main').controller('HomeCtrl', function ($scope, $log, $q, $rootScope, $state) {
    'use strict';
    $scope.is = function (name) {
        return $state.is(name);
    };

    $scope.includes = function (name) {
        return $state.includes(name);
    };


    // Simulate resolving of promise
    // Note that the 'then' function does not get called synchronously.
    // This is because we want the promise API to always be async, whether or not
    // it got called synchronously or asynchronously.


});
angular.module('AdverseEventsExplorer.main').controller('MainNavCtrl', function ($scope) {


});

angular.module('AdverseEventsExplorer.main').controller('HomeCtrl', function ($scope, $state) {
    'use strict';
    $scope.is = function (name) {
        return $state.is(name);
    };

    $scope.includes = function (name) {
        return $state.includes(name);
    };

});
angular.module('AdverseEventsExplorer.main').controller('MainNavCtrl', function ($scope) {

});

angular.module('AdverseEventsExplorer.main').controller('HomeSearchCtrl', function ($scope, DataResource, $filter, $window, $state, $rootScope, portfolioNameService) {

    $scope.item = {};

    portfolioNameService.setName();
    $scope.portfolioName = portfolioNameService.getName();

    $rootScope.searched = {};
    $rootScope.searched.selectedItem = '';

    $scope.refreshItems = function (queryText) {
        if (queryText.length > 2) {
            var params = {keyword: queryText};
            $scope.loading = true;
            $scope.items = DataResource.query(params);
        }
    };
    $scope.disabled = false;
    $scope.items = $scope.refreshItems('');

    $scope.clear = function () {
        $scope.item.selected = undefined;
    };

    $scope.$watchCollection('items', function (newVal, oldVal) {
        if (!angular.equals(newVal, oldVal) && !!newVal && newVal.length > 0) {
            $scope.items = _.reject(newVal, function (item) {
                if (item.thisType === 'Adverse Event') {
                    return item;
                }
            });
        }
    });
    
    /**
     * TODO(@cerdman) - change these links once we go live.
     * Will work to redirect onClick or onSelect
     */

    $scope.$watchCollection('item.selected', function (newVal, oldVal) {
        if (newVal === oldVal) {
            return;
        }
        var valuetype = (!newVal.thisType) ? '' : newVal.thisType.replace(/ /g, '').toLowerCase();
        // !! sign will return false for null, UnDefined and 0 [Zero] values.
        if (!!newVal) {
            // alert('in...'+newVal.thisType);
            if (newVal.thisType === 'Drug') {
                $state.go('drugs.detail.overview', {id: newVal.thisID});
            }
            else if (newVal.thisType === 'Drug Class') {
//                $state.go('drugclass.detail.overview', {id: newVal.thisID});
                $state.go('druggroup.detail.overview', {id: newVal.thisID, type:valuetype, typeString:newVal.thisType});
            }
            else if (newVal.thisType === 'Indication') {
//                $state.go('indication.detail.overview', {id: newVal.thisID});
                $state.go('druggroup.detail.overview', {id: newVal.thisID, type:valuetype, typeString:newVal.thisType});
            }
            else if (newVal.thisType === 'Adverse Event') {
                $window.location = 'http://www.adverseevents.com/medradetail.php?mdr_term=' + newVal.thisName;
            }
            else if (newVal.thisType === 'Mech of. action') {

                $state.go('druggroup.detail.overview', {id: newVal.thisID, type:'mechanism', typeString:'mechanism'});
            }
            else if (newVal.thisType === 'Company') {
                $state.go('company.detail.overview', {id: newVal.thisID});

            }
            else {
                $window.location = 'http://www.adverseevents.com/moa.php?termCode=' + newVal.thisID;
            }
        }
    }, true);


})
    .factory('DataResource', function ($resource,SERVER_SETTINGS) {
        var baseUrl = SERVER_SETTINGS.BASE_URL+'api/search';
            return $resource(baseUrl);
        })
        .factory('SelectedDrugTracker', function () {
            //console.log('factory SelectedDrugTracker');
            return {data: ""};
        })
        .factory('rxScoreServiceV2', function ($http, SERVER_SETTINGS) {
            var getScoresForIndi = function (termId, units) {
                return $http({
                    method: 'GET',
                url: SERVER_SETTINGS.BASE_URL+'service.rxscore.atc.v3.php?termCode=' + termId + '&units=' + units
                });
            };
            var getComponentsForIndi = function (termId, units) {
                return $http({
                    method: 'GET',
                url: SERVER_SETTINGS.BASE_URL+'service/service.rxscore.comp.v3.php?termCode=' + termId + '&units=' + units
                });
            };
            return {
                getScores: function (termId, units) {
                    return getScoresForIndi(termId, units);
                },
                getComponents: function (termId, units) {
                    return  getComponentsForIndi(termId, units);
                }

            };
        });


