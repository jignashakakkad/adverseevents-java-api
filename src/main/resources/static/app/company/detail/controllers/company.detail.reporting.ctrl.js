(function () {
    'use strict';

    angular
            .module('company')
            .controller('CompanyReportingCtrl', ['$scope', '$state', '$controller', 'companyReportingService', 'tooltipService', 'companyService', 'QuarterlyData', 'METADATA', CompanyReportingCtrl]);

    function CompanyReportingCtrl($scope, $state, $controller, companyReportingService, tooltipService, companyService, QuarterlyData, METADATA) {

        var vm = $scope;
        var currentState = $state.current.name;

        // config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        vm.title = 'Quarterly reporting';
        vm.ToolTipper = tooltipService.getTooltip;
        vm.colDefs = companyReportingService.getCustomGridColumns(currentState);
        vm.gridOptions = companyReportingService.getGridOptions();
        vm.myData = companyReportingService.formatReportingData(companyService.getStripped(QuarterlyData));

        // watch when any column settings changed from grid settings and saved into localstorage
        vm.$watch('gridOptions.$gridScope.columns', functionChangeGrid, true);

        // callback for watchers
        function functionChangeGrid(newVal, oldVal) {
            if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
                angular.noop();
            } else {
                var config = [];
                angular.forEach(newVal, function (col) {
                    config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'cellFilter', 'cellTemplate', 'pinned'));
                });
                companyReportingService.setCustomGridColumns(currentState, config);
            }
        };
    };
})();
