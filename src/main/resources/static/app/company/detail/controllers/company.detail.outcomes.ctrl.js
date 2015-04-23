(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyOutcomesCtrl', ['$scope', '$state', '$controller', '$stateParams', 'tooltipService', 'utilService', 'companyService', 'OutcomesData', 'companyOutcomesService', CompanyOutcomesCtrl]);

    function CompanyOutcomesCtrl($scope, $state, $controller, $stateParams, tooltipService, utilService, companyService, OutcomesData, companyOutcomesService) {

        var vm = $scope;
        var currentState = $state.current.name;
        var OutcomesData = companyService.getStripped(OutcomesData);

        // config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        vm.title = 'Outcomes Control';
        vm.ToolTipper = tooltipService.getTooltip;
        vm.myData = companyOutcomesService.getOutcomePivotTable(OutcomesData, $stateParams.datayear);
        vm.colDefs = companyOutcomesService.getCustomGridColumns(currentState);
        vm.headers = companyOutcomesService.getOutcomeGridColumns();
        vm.gridOptions = companyOutcomesService.getGridOptions();
        vm.outcomesMinMaxData = companyOutcomesService.getMinMaxOutcomesData();
        vm.datayear = companyOutcomesService.getDatayear($stateParams.datayear);

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
                companyOutcomesService.setCustomGridColumns(currentState, config);
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
