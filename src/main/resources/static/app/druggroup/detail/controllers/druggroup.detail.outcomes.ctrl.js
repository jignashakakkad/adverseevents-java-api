(function () {
    'use strict';

    // OutcomesCtrl
    angular.module('druggroup.detail').controller('DrugGroupOutcomesCtrl', ['$controller', '$scope', '$state', '$rootScope', 'GridModel', 'drugGroupOutcomesService', 'Outcomes', DrugGroupOutcomesCtrl]);
    function DrugGroupOutcomesCtrl($controller, $scope, $state, $rootScope, GridModel, drugGroupOutcomesService, Outcomes) {
        var dc = $scope;
        var GridModels = [];
        var currentState = $state.current.name;
        dc.title = 'Total Outcome Incidence Rates 2010-2014';
        dc.OutcomesData = drugGroupOutcomesService.getOutcomePivotTable(Outcomes);
        dc.outcomesMinMaxData = drugGroupOutcomesService.getMinMaxOutcomesData();
        dc.headers = drugGroupOutcomesService.getOutcomesGridColumns();

        var gridModel = new GridModel(currentState, 'incidenceRates', true);
        gridModel.setColDefs(dc.headers);
        gridModel.setData(angular.copy(dc.OutcomesData));
        GridModels.push(gridModel);
        $controller('GridController', {$scope: $scope, GridModels: GridModels});

        $rootScope.formatOutcomesRate = function (event, value) {
            var minString = event + '.min';
            var maxString = event + '.max';
            var minVal = $scope.outcomesMinMaxData[minString];
            var maxVal = $scope.outcomesMinMaxData[maxString];
            if (minVal === value) {
                return 'green';
            } else if (maxVal === value) {
                return 'red';
            } else {
                return 'ngCellText';
            }
        };

        $scope.$on('ngGridEventColumns', function ($scope, newCols) {
            var config = [];
            angular.forEach(newCols, function (col) {
                config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'pinned', 'cellFilter', 'cellTemplate', 'cellClass'));
            });
            // set to local storage...
            gridModel.resetColDefs(config);
        });
    }

})();
