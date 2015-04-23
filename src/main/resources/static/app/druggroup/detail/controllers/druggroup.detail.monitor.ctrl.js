(function () {
    'use strict';

    // MonitorCtrl
    angular.module('druggroup.detail').controller('DrugGroupMonitorCtrl', ['$state', '$scope', '$controller', 'drugGroupService', 'GridModel', 'News', DrugGroupMonitorCtrl]);
    function DrugGroupMonitorCtrl($state, $scope, $controller, drugGroupService, GridModel, News) {

        var dc = $scope;
        var GridModels = [];
        dc.title = "Drug Safety Monitor: Analysis and Insight";

        var currentState = $state.current.name;
        var gridModel = new GridModel(currentState, 'eventsGrid', false);
        gridModel.setData(drugGroupService.getStripped(News));
        GridModels.push(gridModel);
        $controller('GridController', {$scope: dc, GridModels: GridModels});

        dc.$on('ngGridEventColumns', function (dc, newCols) {
            var config = [];
            angular.forEach(newCols, function (col) {
                config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'pinned', 'cellFilter', 'cellTemplate', 'cellClass'));
            });
            gridModel.resetColDefs(config);
        });

    }

})();