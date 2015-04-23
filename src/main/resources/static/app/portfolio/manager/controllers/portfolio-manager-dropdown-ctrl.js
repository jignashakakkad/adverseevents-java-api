angular.module('portfolio.manager').controller('DropdownCtrl', function ($scope, $log, portfolioCreateService) {
    'use strict';
    $scope.dropdown = {};

    $scope.dropdown.items = portfolioCreateService.getDropdownTabs();

    $scope.disableDropdown = portfolioCreateService.getDropdownClass();

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
});
