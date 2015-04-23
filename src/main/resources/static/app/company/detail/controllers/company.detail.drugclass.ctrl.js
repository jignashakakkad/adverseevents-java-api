(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyDrugclassCtrl', ['$scope', '$state', '$controller', 'RxsignalSummaryData', 'companyService', 'DrugclassData', 'companyDrugclassService', 'tooltipService', CompanyDrugclassCtrl]);

    function CompanyDrugclassCtrl($scope, $state, $controller, RxsignalSummaryData, companyService, DrugclassData, companyDrugclassService, tooltipService) {

        var vm = $scope;
        var currentState = $state.current.name;

        // config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        //input the subset of DrugclassData['products_scored'](array)
        //iterates over these values, and looks up the rxsignal summary data by the aedrug_id in input and returns the RxsignalSummary data for those
        vm.summaryData = [];
        angular.copy(companyService.getStripped(RxsignalSummaryData), vm.summaryData);
        vm.title = 'Drug Class Control';
        vm.ToolTipper = tooltipService.getTooltip;
        vm.colDefs = companyDrugclassService.getCustomGridColumns(currentState);
        vm.gridOptions = companyDrugclassService.getGridOptions();

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
                companyDrugclassService.setCustomGridColumns(currentState, config);
            }
        };

        vm.myData = _.map(companyService.getStripped(DrugclassData), function (d) {
            return companyDrugclassService.getMyData(d, vm.summaryData);
        });
    };
})();
