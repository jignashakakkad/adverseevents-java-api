(function () {
    'use strict';
    angular.module('druggroup.detail').controller('DrugGroupCostCtrl', ['$controller', '$scope', '$state', 'DrugGroupCostData', 'GridModel', 'drugGroupCostService', DrugGroupCostCtrl]);
    function DrugGroupCostCtrl($controller, $scope, $state, DrugGroupCostData, GridModel, drugGroupCostService) {
        var dc = $scope;
        var GridModels = [];
        var currentState = $state.current.name;
        var outcomesCostData = angular.copy(DrugGroupCostData.data);

        // Use Tooltip Common component
        var tooltipModel = new TooltipModel();
        tooltipModel.setModules([currentState]);
        tooltipModel.setUseCommonModule(false);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        // Set common nggrid component - new GridModel(statename, gridname, usecustomcoldef); -- Care you use unique gridname
        var gridModel = new GridModel(currentState, 'outcomesCosts', false);
        gridModel.setData(outcomesCostData);
        GridModels.push(gridModel);
        $controller('GridController', {$scope: $scope, GridModels: GridModels});

        //pass druggroup name to service for use in chart title
        drugGroupCostService.setDrugGroupName($scope.DrugGroup.dimLabel);

        dc.costChartConfig = drugGroupCostService.getCostChartConfig(outcomesCostData);
        dc.costTitle = 'RxCost/Savings Estimates for ' + $scope.DrugGroup.dimLabel + ' Drugs';

        // watch when Any colum settings changed from Grid Settings and Saved into LocalStorage.
        $scope.$on('ngGridEventColumns', functionChangePatientsGrid, true);

        // Call back for watchers.
        //@TODO (Jignasha) Need to have common but do not know the way to find 'ngGridEventColumns' event called for which grid in case of multiple Grids.
        function functionChangePatientsGrid(oldVal,newVal) {
            var config = [];
            if (!!newVal && newVal.length > 0) {
                angular.forEach(newVal, function (col) {
                    config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'cellFilter', 'cellTemplate', 'pinned', 'headerCellTemplate'));
                });
                gridModel.resetColDefs(config);
            }
        }

        $scope.localStorageClear = function (key) {
            $scope.clearLocalStorage($state.current.name, undefined, key);
            $state.reload();
        };
    }
})();
