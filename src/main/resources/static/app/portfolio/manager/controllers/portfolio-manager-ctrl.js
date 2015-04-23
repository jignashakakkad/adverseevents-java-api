/**
 * @ngdoc function
 * @name portfolioManager.controller:portfolioManagerCtrl
 * @description
 * # portfolioManagerCtrl
 * Controller of the portfolioManager
 */
(function () {
    'use strict';
    angular.module('portfolio.manager').controller('PortfolioManagerCtrl', ['$scope', '$state', 'Portfolios', 'portfolioManagerUIService', 'portfolioNameService', PortfolioManagerCtrl]);
    function PortfolioManagerCtrl($scope, $state, Portfolios, portfolioManagerUIService, portfolioNameService) {
        portfolioNameService.setName();
        var portfolioTitle = portfolioNameService.getName();
        $scope.PortView = portfolioManagerUIService.initView(portfolioTitle, Portfolios, $state.params.portId);
        if ($scope.PortView.needStateChange) {
            $scope.PortView.needStateChange = false;
            $state.go("portfolio.manager.edit", {portId: $scope.PortView.portId});
        }
        $scope.$on('$stateChangeSuccess', function () {
            portfolioManagerUIService.initPortfolio($state.params.portId);
        });

        $scope.checkDupes = function (portName) {
            var duplicate = portfolioManagerUIService.checkDupes(portName, true);
            if (duplicate) {
                return "Name in use";
            }
        };

        $scope.$watchCollection("PortView.Portfolio.contents", function (newVal) {
            if (!!newVal && newVal.length > 0) {
                $scope.PortView.enableLaunchButton = true;
            } else {
                $scope.PortView.enableLaunchButton = false;
            }
        });

        // update $scope.Portfolio label via xeditable, and hot rename the tabset;
        $scope.updatePortfolioLabel = function () {
            portfolioManagerUIService.renamePortfolio();
        };

        $scope.deletePortfolio = function (Portfolio) {
            portfolioManagerUIService.removePortfolio(Portfolio).then(function (stateData) {
                $state.go(stateData.state, stateData.params, {reload: true});
            });
        };

        // Search Items
        $scope.refreshItems = function (queryText) {
            portfolioManagerUIService.retrieveSearchItems(queryText);
        };

        // add a new item to $scope.Portfolio
        $scope.addToPortfolio = function (item) {
            portfolioManagerUIService.addElementToPortfolio(item);
        };

        // remove a portfolio item, and hot splice the $scope.<collection> on the fly.
        $scope.removePortfolioItem = function (item) {
            portfolioManagerUIService.removeElementFromPortfolio(item);
        };
    }

})();