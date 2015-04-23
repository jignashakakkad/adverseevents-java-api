(function () {
    'use strict';
    angular.module('common.controllers').controller('TabController', ['$scope', '$state', 'MainTabService', TabController]);
    function TabController($scope, $state,MainTabService) {
        $scope.tabs = MainTabService.getTabs();
        $scope.$on("$stateChangeSuccess", function () {
            $scope.tabs.forEach(function (tab) {
                var stateName = $state.current.name;
                tab.active = $state.is(tab.sref) || tab.sref.indexOf(stateName) >= 0;
            });
        });
    }
})();