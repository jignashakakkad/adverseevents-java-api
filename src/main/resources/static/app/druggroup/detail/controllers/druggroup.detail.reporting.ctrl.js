(function () {
    'use strict';
    // ReportingCtrl
    angular.module('druggroup.detail').controller('DrugGroupReportingCtrl', ['$controller', '$scope', '$state', 'drugGroupService', 'GridModel', 'Quarterly', DrugGroupReportingCtrl]);
    function DrugGroupReportingCtrl($controller, $scope, $state, drugGroupService, GridModel, Quarterly) {
        var dc = $scope;
        var GridModels = [];
        var currentState = $state.current.name;

        dc.title = 'Quarterly reporting';
        dc.rowItems = drugGroupService.getStripped(Quarterly);

        var gridModel = new GridModel(currentState, 'reportingGrid', false);
        gridModel.setOptionConfigProperty("sortInfo", {fields: ['x2q2'], directions: ['desc']});
        gridModel.setData(dc.rowItems);
        GridModels.push(gridModel);
        $controller('GridController', {$scope: $scope, GridModels: GridModels});

        dc.$on('ngGridEventColumns', function ($scope, newCols) {
            var config = [];
            angular.forEach(newCols, function (col) {
                config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'pinned', 'cellFilter', 'cellTemplate'));
            });
            gridModel.resetColDefs(config);
        });

    }
})();