(function () {
  'use strict';

    angular.module('drugs').controller('costsDrugCtrl', ['$controller', '$scope', '$stateParams', '$state', 'drugCostsService', 'CostScoresForChart', 'CostsForGrid', 'CostsForPieChart', costsDrugCtrl]);

    function costsDrugCtrl($controller, $scope, $stateParams, $state, drugCostsService, CostScoresForChart, CostsForGrid, CostsForPieChart) {

        var dc = $scope;
        var currentState = $state.current.name;
        var tooltipModel = new TooltipModel();

        // Setup common tooltip model for this controller and init common tooltip ctrl.
        tooltipModel.setModules([currentState]);
        tooltipModel.setUseCommonModule(false);
        $controller('TooltipController', {$scope: $scope, TooltipModel : tooltipModel});

        dc.bigNumbers = CostScoresForChart.data[0];

        // Changed the below func. to use the single endpoint.
        dc.costChartConfig = drugCostsService.costChartConfig(dc.bigNumbers);
        dc.onLabel = CostsForPieChart.data[0];
        dc.offLabel = CostsForPieChart.data[1];
        dc.headers = drugCostsService.getCustomGridColumns(currentState);

        dc.title = 'Top 10 Adverse Events by RxCost (2010 - 2014)';
        dc.gridNumbers = CostsForGrid.data;
        dc.drugCostGridOptions = drugCostsService.getDefaultGridOptions();

        dc.localStorageClear = function () {
            drugCostsService.localStorageClear(currentState);
            $state.reload();
        };

        dc.gridUpdate = function(limit) {
            drugCostsService.getGridNumbers($stateParams.id, limit).success(function (response) {
                dc.gridNumbers = response;
                dc.title = dc.toggle ? 'All Adverse Events by RxCost (2010 - 2014)' : 'Top 10 Adverse Events by RxCost (2010 - 2014)';
                dc.loading = false;
            });
        };

        var toggleUpdate = function() {
            dc.loading = true;
            dc.resultLimit = dc.toggle ? '' : '/top/10';
            dc.resultsToggle = dc.toggle ? 'Show Fewer Adverse Events' : 'Show All Adverse Events';
        };

        dc.$watch('toggle', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                toggleUpdate();
                dc.gridUpdate(dc.resultLimit);
            } else {
                toggleUpdate();
                dc.loading = false;
            }
        });

        // watch when any column settings changed from grid settings and saved into localstorage
        $scope.$watch('drugCostGridOptions.$gridScope.columns', functionChangeGrid, true);

        // callback for watchers
        function functionChangeGrid(newVal, oldVal) {
            var config = [];
            angular.forEach(newVal, function (col) {
                config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'headerCellTemplate', 'cellFilter', 'cellTemplate', 'pinned'));
            });
            drugCostsService.setCustomGridColumns(currentState, config);
        }

    };

})();
