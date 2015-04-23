(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyNewsCtrl', ['$scope', '$state', '$controller', 'tooltipService', 'companyService', 'NewsEventsData', 'companyNewsService', CompanyNewsCtrl]);

    function CompanyNewsCtrl($scope, $state, $controller, tooltipService, companyService, NewsEventsData, companyNewsService) {

        var vm = $scope;
        var currentState = $state.current.name;

        // config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        vm.title = 'News and events Control';
        vm.ToolTipper = tooltipService.getTooltip;
        vm.colDefs = companyNewsService.getCustomGridColumns(currentState);
        vm.gridOptions = companyNewsService.getGridOptions();
        vm.myData = companyService.getStripped(NewsEventsData);

        // watch when any column settings changed from grid settings and saved into localstorage
        vm.$watch('gridOptions.$gridScope.columns', functionChangeGrid, true);

        // callback for watchers
        function functionChangeGrid(newVal, oldVal) {
            if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
                angular.noop();
            } else {
                var config = [];
                angular.forEach(newVal, function (col) {
                    config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'cellClass', 'cellFilter', 'cellTemplate', 'pinned'));
                });
                companyNewsService.setCustomGridColumns(currentState, config);
            }
        };
    };
})();
