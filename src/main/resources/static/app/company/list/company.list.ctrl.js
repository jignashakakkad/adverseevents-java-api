(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyListCtrl', ['$scope', 'List', '$state', CompanyListCtrl]);

    function CompanyListCtrl($scope, List, $state) {
        $scope.List = List;
    };
})();
