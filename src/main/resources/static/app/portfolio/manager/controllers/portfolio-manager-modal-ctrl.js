angular.module('portfolio.manager').controller('PortfolioModalCtrl', function ($scope, $modal) {
    'use strict';

    $scope.open = function (size, id) {
        $modal.open({
            templateUrl: 'myModalContent' + id + '.html',
            controller: 'PortfolioModalInstanceCtrl',
            size: size
        });

//        modalInstance.result.then(function (selectedItem) {
//            $scope.selected = selectedItem;
//        }, function () {
//            angular.noop(null);
//        });
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('portfolio.manager').controller('PortfolioModalInstanceCtrl', function ($scope, $state, $modalInstance, $log, portfolioCreateService, portfolioNameService, portfolioManagerUIService) {

    //check for duplicate portfolio name
    $scope.CreateView = portfolioManagerUIService.initPortfolioCreateView();
    $scope.$watch('CreateView.portfolios.portName', function () {
        $scope.CreateView.notUnique = portfolioManagerUIService.checkDupes($scope.CreateView.portfolios.portName, false);
    });

    $scope.ok = function (portName) {
        if ($scope.CreateView.portfolios.groupSelection === false) {
            $scope.CreateView.selectedGroup = {label: 'Private'};
        } else {
            $scope.CreateView.selectedGroup = {label: 'Group'};
        }
        portfolioManagerUIService.createPortfolio(portName, $scope.CreateView.selectedGroup.label).then(function (stateData) {
            if (!!stateData) {
                $state.transitionTo(stateData.state, stateData.params, {reload: true});
            }
        });
        $modalInstance.close();
    };

    $scope.copyPortfolio = function (portName) {
        if ($scope.CreateView.portfolios.groupSelection === false) {
            $scope.CreateView.selectedGroup = {label: 'Private'};
        } else {
            $scope.CreateView.selectedGroup = {label: 'Group'};
        }
        portfolioManagerUIService.copyPortfolio(portName, $scope.CreateView.selectedGroup.label).then(function (stateData) {
            if (!!stateData) {
                $state.go(stateData.state, stateData.params, {reload: true});
            }
        });
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    //dropdown
    $scope.toggled = function (open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

});
