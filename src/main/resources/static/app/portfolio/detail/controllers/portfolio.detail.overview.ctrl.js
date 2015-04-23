(function (){
    'use strict';
    angular
    .module('portfolio.detail')
    .controller('PortfolioOverviewCtrl', ['$scope', '$rootScope', '$stateParams', '$controller', '$state', 'Revenues', 'portfolioOverviewService', 'GridModel', 'DrugOverviewData', 'CompanyOverviewData', PortfolioOverviewCtrl]);

    function PortfolioOverviewCtrl($scope, $rootScope, $stateParams, $controller, $state, Revenues, portfolioOverviewService, GridModel, DrugOverviewData, CompanyOverviewData) {

        var vm = $scope;
        var GridModels = [];
        var currentState = $state.current.name;
        vm.formatRxscore = function(score) {
            return portfolioOverviewService.formatRxscore(score);
        }

        // Use Tooltip Common component
        var tooltipModel = new TooltipModel();
        tooltipModel.setModules([currentState]);
        tooltipModel.setUseCommonModule(false);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        vm.overview = portfolioOverviewService.getOverviewData($stateParams.overviewdata, Revenues, DrugOverviewData, CompanyOverviewData);
        // broadcast current substate for use in header dropdown & portfolio.detail.ctrl
        $rootScope.$broadcast('overview-state-changed', { stateName: vm.overview.stateName });

        // Set common nggrid component - new GridModel(statename, gridname, usecustomcoldef); -- be sure to use a unique gridname
        var gridModel = new GridModel(vm.overview.currentState, vm.overview.gridModel, false);

        vm.overviewGridData = vm.overview.dataModel;
        vm.overviewdata = vm.overview.stateName;

        gridModel.setData(vm.overviewGridData);
        GridModels.push(gridModel);
        $controller('GridController', {$scope: $scope, GridModels: GridModels});

        // gives red/green border for max/min values on certain cells
        vm.formatMinMax = function (event, value) {
            var dataSet = _.pluck(vm.overview.dataModel, event);
            return portfolioOverviewService.getMinMaxData(event, value, dataSet);
        }

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
