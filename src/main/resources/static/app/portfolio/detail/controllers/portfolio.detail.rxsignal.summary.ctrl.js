(function (){
    'use strict';

    angular
    .module('portfolio.detail')
    .controller('PortfolioRxsignalSummaryCtrl', ['$scope', '$controller', '$state', 'portfolioService', 'companyChartService', 'RxsignalSummaryData', 'companyRxsignalGridService', 'GridModel', 'portfolioRxSignalSummaryService', PortfolioRxsignalSummaryCtrl]);

    function PortfolioRxsignalSummaryCtrl($scope, $controller, $state, portfolioService, companyChartService, RxsignalSummaryData, companyRxsignalGridService, GridModel, portfolioRxSignalSummaryService) {

    var vm = $scope;
    var GridModels = [];
    var currentState = $state.current.name;

    // Use Tooltip Common component
    var tooltipModel = new TooltipModel();
    tooltipModel.setModules([currentState]);
    tooltipModel.setUseCommonModule(false);
    $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

    // Set common nggrid component - new GridModel(statename, gridname, usecustomcoldef); -- be sure to use a unique gridname
    var gridModel = new GridModel(currentState, 'portfolioRxSignalSummary', false);

    //set rxsignal data
    vm.rxsignalSummaryData = portfolioService.getStripped(RxsignalSummaryData);
    vm.title = 'RxSignal Summary';

    gridModel.setData(vm.rxsignalSummaryData);
    GridModels.push(gridModel);
    $controller('GridController', {$scope: $scope, GridModels: GridModels});

    //determines whether to show bubble chart
    vm.rxsignal_count = portfolioRxSignalSummaryService.getRxSignalCount(RxsignalSummaryData);

    // draw bubble chart
    portfolioRxSignalSummaryService.drawChart(RxsignalSummaryData, vm.rxsignalSummaryData);

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
