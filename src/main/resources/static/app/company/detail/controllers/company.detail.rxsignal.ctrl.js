(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyRxsignalCtrl', ['$scope', '$state', '$controller', 'companyService', 'RxsignalData', 'RxsignalSummaryData', 'companyRxsignalGridService', 'companyRxsignalService','tooltipService', CompanyRxsignalCtrl]);

    function CompanyRxsignalCtrl($scope, $state, $controller, companyService, RxsignalData, RxsignalSummaryData, companyRxsignalGridService, companyRxsignalService, tooltipService) {

        var vm = $scope;
        var currentState = $state.current.name;

        // config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        vm.ToolTipper = tooltipService.getTooltip;
        vm.colDefs = companyRxsignalService.getCustomGridColumns(currentState);
        vm.myData = companyService.getStripped(RxsignalData);
        vm.summaryData = companyService.getStripped(RxsignalSummaryData);
        vm.gridOptions = companyRxsignalService.getGridOptions();

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
                companyRxsignalService.setCustomGridColumns(currentState, config);
            }
        }
    };
})();
