(function () {
    'use strict';

    angular
    .module('portfolio.detail')
    .controller('PortfolioReportingCtrl', ['$scope', '$state', '$controller', 'portfolioService', 'QuarterlyData', 'METADATA', 'portfolioReportingService', 'GridModel', PortfolioReportingCtrl]);

    function PortfolioReportingCtrl($scope, $state, $controller, portfolioService, QuarterlyData, METADATA, portfolioRxScoreService, GridModel) {

        var vm = $scope;
        var GridModels = [];
        var currentState = $state.current.name;

        // Use Tooltip Common component
        var tooltipModel = new TooltipModel();
        tooltipModel.setModules([currentState]);
        tooltipModel.setUseCommonModule(false);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        // Set common nggrid component - new GridModel(statename, gridname, usecustomcoldef); -- be sure to use a unique gridname
        var gridModel = new GridModel(currentState, 'portfolioReporting', false);

        vm.reportingData = portfolioService.getStripped(QuarterlyData);
        vm.title = 'Quarterly Reporting';

        gridModel.setData(vm.reportingData);
        GridModels.push(gridModel);
        $controller('GridController', {$scope: $scope, GridModels: GridModels});

        // watch when any colum settings changed from grid settings and push to local storage
        $scope.$on('ngGridEventColumns', setCustomGridConfig, true);

        // Call back for watchers
        function setCustomGridConfig(oldVal, newVal) {
            var config = [];
            if (!!newVal && newVal.length > 0) {
                angular.forEach(newVal, function (col) {
                    config.push(_.pick(col, 'field', 'displayName', 'cellClass', 'width', 'visible', 'cellFilter', 'cellTemplate', 'pinned', 'headerCellTemplate'));
                });
                gridModel.resetColDefs(config);
            }
        }

    };
})();
