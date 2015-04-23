(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyIndicationCtrl', ['$scope', '$state', '$controller', 'RxsignalSummaryData', 'companyService', 'IndicationData', 'tooltipService', 'companyIndicationService', CompanyIndicationCtrl]);

    function CompanyIndicationCtrl($scope, $state, $controller, RxsignalSummaryData, companyService, IndicationData, tooltipService, companyIndicationService) {

        var vm = $scope;
        var currentState = $state.current.name;

        // config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        vm.title = 'Indication Control';
        vm.ToolTipper = tooltipService.getTooltip;
        vm.colDefs = companyIndicationService.getCustomGridColumns(currentState);
        vm.gridOptions = companyIndicationService.getGridOptions();
        vm.summaryData = companyService.getStripped(RxsignalSummaryData);

        // define myData for table using service functions/joins
        vm.myData = _.map(companyService.getStripped(IndicationData), function (d) {
            return companyIndicationService.getMyData(d, vm.summaryData);
        });

        // watch when any column settings changed from grid settings and saved into localstorage
        vm.$watch('gridOptions.$gridScope.columns', functionChangeGrid, true);

        // callback for watchers
        function functionChangeGrid(newVal, oldVal) {
            if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
                angular.noop();
            } else {
                var config = [];
                angular.forEach(newVal, function (col) {
                    config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'cellFilter', 'headerTemplate', 'cellTemplate', 'pinned'));
                });
                companyIndicationService.setCustomGridColumns(currentState, config);
            }
        };

       };
})();
