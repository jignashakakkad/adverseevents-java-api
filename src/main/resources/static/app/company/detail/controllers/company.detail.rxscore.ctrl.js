(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyRxscoreCtrl', ['$scope', '$state', '$controller', 'RxscoreData', 'tooltipService', 'rxscoreService', CompanyRxscoreCtrl]);

    function CompanyRxscoreCtrl($scope, $state, $controller, RxscoreData, tooltipService, rxscoreService) {

        var vm = $scope;
        var currentState = $state.current.name;

        // config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        vm.title = 'Rxscore Control';
        vm.ToolTipper = tooltipService.getTooltip;
        vm.colDefs = rxscoreService.getCustomGridColumns(currentState);
        vm.gridOptions = rxscoreService.getGridOptions();
        vm.myData = RxscoreData;

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
                rxscoreService.setCustomGridColumns(currentState, config);
            }
        };
    };
})();
