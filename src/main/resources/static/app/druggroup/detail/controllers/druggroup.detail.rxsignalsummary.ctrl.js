(function () {
    'use strict';

    // RxSignalSummaryCtrl
    angular.module('druggroup.services').controller('DrugGroupRxsignalSummaryCtrl', ['$state', '$controller', '$scope', 'drugGroupService', 'RxsignalSummary', 'drugGroupRxSignalSummaryService', 'GridModel', DrugGroupRxsignalSummaryCtrl]);
    function DrugGroupRxsignalSummaryCtrl($state, $controller, $scope, drugGroupService, RxsignalSummary, drugGroupRxSignalSummaryService, GridModel) {
        var dc = $scope;
        var currentState = $state.current.name;
        var GridModels = [];
        var summaryData = drugGroupService.getStripped(RxsignalSummary);
        dc.rxsignal_count = d3.round(d3.sum(_.map(_.pluck(summaryData, 'metric_rxsignal_active'), function (d) {
            return Math.abs(d);
        })));

        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        var gridModel = new GridModel(currentState, "rxsignalSummary", false);
        gridModel.setData(summaryData);
        GridModels.push(gridModel);
        $controller('GridController', {$scope: dc, GridModels: GridModels});

        var drawChart = function () {
            var dataCopy = angular.copy(summaryData);
            var cfg = drugGroupRxSignalSummaryService.getRxsignalSummaryChart(dataCopy.slice(0, 8));
            c3.generate(cfg);
        };
        dc.$on('ngGridEventColumns', function ($scope, newCols) {
            var config = [];
            angular.forEach(newCols, function (col) {
                config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'pinned', 'cellFilter', 'cellTemplate'));
            });
            gridModel.resetColDefs(config);
        });

        drawChart();
    }

})();