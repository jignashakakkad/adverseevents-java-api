(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyRxsignalSummaryCtrl', ['$scope', '$state', '$controller', 'companyService', 'RxsignalSummaryData', 'tooltipService', 'companyRxsignalSummaryService', CompanyRxsignalSummaryCtrl]);

    function CompanyRxsignalSummaryCtrl($scope, $state, $controller, companyService, RxsignalSummaryData, tooltipService, companyRxsignalSummaryService) {

        var vm = $scope;
        var currentState = $state.current.name;

        // config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        vm.ToolTipper = tooltipService.getTooltip;
        vm.colDefs = companyRxsignalSummaryService.getCustomGridColumns(currentState);
        vm.gridOptions = companyRxsignalSummaryService.getGridOptions();
        vm.myData = companyService.getStripped(RxsignalSummaryData);
        vm.rxsignal_count = d3.round(d3.sum(_.map(_.pluck(companyService.getStripped(RxsignalSummaryData), 'metric_rxsignal_active'), function (d) {
            return Math.abs(d);
        })));

        // watch when any column settings changed from grid settings and saved into localstorage
        vm.$watch('gridOptions.$gridScope.columns', functionChangeGrid, true);

        // callback for watchers
        function functionChangeGrid(newVal, oldVal) {
            if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
                angular.noop();
            } else {
                var config = [];
                angular.forEach(newVal, function (col) {
                    config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'headerCellTemplate', 'cellFilter', 'cellTemplate', 'pinned'));
                });
                companyRxsignalSummaryService.setCustomGridColumns(currentState, config);
            }
        };

        companyRxsignalSummaryService.drawChart(vm.myData, RxsignalSummaryData);
    };
})();
