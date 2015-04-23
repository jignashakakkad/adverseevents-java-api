(function () {
  'use strict';

    angular
    .module('portfolio.detail')
    .controller('PortfolioOutcomesCtrl', ['$scope', '$state', '$controller', '$stateParams', 'tooltipService', 'utilService', 'portfolioService', 'OutcomesData', 'AverageOutcomesData', 'portfolioOutcomesService', PortfolioOutcomesCtrl]);

    function PortfolioOutcomesCtrl($scope, $state, $controller, $stateParams, tooltipService, utilService, portfolioService, OutcomesData, AverageOutcomesData, portfolioOutcomesService) {

        var vm = $scope;
        var currentState = $state.current.name;
        var OutcomesData = portfolioService.getStripped(OutcomesData);

        // config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        vm.title = 'Outcomes';
        vm.ToolTipper = tooltipService.getTooltip;
        vm.myData = portfolioOutcomesService.getOutcomePivotTable(OutcomesData, $stateParams.datayear);
        vm.colDefs = portfolioOutcomesService.getCustomGridColumns(currentState);
        vm.headers = portfolioOutcomesService.getOutcomeGridColumns();
        vm.gridOptions = portfolioOutcomesService.getGridOptions();
        vm.outcomesMinMaxData = portfolioOutcomesService.getMinMaxOutcomesData();
        vm.datayear = portfolioOutcomesService.getDatayear($stateParams.datayear);

        // watch when any column settings changed from grid settings and saved into localstorage
        vm.$watch('gridOptions.$gridScope.columns', functionChangeGrid, true);

        // callback for watchers
        function functionChangeGrid(newVal, oldVal) {
            if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
                angular.noop();
            } else {
                var config = [];
                angular.forEach(newVal, function (col) {
                    config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'cellClass', 'cellFilter', 'headerCellTemplate', 'cellTemplate', 'pinned'));
                });
                portfolioOutcomesService.setCustomGridColumns(currentState, config);
            }
        };

        vm.formatOutcomesRate = function (event, value) {
            var minString = event+'.min';
            var maxString = event+'.max';
            var minVal = vm.outcomesMinMaxData[minString];
            var maxVal = vm.outcomesMinMaxData[maxString];
            if (minVal === value) {
                return 'green';
            } else if (maxVal === value) {
                return 'red';
            } else {
                return 'ngCellText';
            }
        }
    };
})();
