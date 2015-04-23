(function () {
    'use strict';

    //  Overview Controller
    angular.module('druggroup.detail').controller('DrugGroupOverviewCtrl', ['$controller', '$state', '$scope', '$rootScope', 'GridModel', 'Overview', 'Restangular', 'DrugGroupOverviewGridService', DrugGroupOverviewCtrl]);
    function DrugGroupOverviewCtrl($controller, $state, $scope, $rootScope, GridModel, Overview, Restangular, DrugGroupOverviewGridService) {
        var dc = $scope;
        var GridModels = [];
        var currentState = $state.current.name;
        dc.minMaxData = DrugGroupOverviewGridService.getOverviewMinMaxData(Restangular.stripRestangular(Overview));

        var gridModel = new GridModel(currentState, 'incidenceRates', false);
        gridModel.setOptionConfigProperty("sortInfo", { fields: ['metric_icumulative_hosp'], directions: ['desc'] });
        gridModel.setData(angular.copy(Restangular.stripRestangular(Overview)));
        GridModels.push(gridModel);
        $controller('GridController', {$scope: $scope, GridModels: GridModels});

        $rootScope.formatIncidenceRate = function (event, value) {
            var minString = event + '.min';
            var maxString = event + '.max';
            var minVal = dc.minMaxData[minString];
            var maxVal = dc.minMaxData[maxString];
            if (minVal === value) {
                return 'green';
            } else if (maxVal === value) {
                return 'red';
            } else {
                return 'ngCellText';
            }
        };

        dc.$on('ngGridEventColumns', function ($scope, newCols) {
            var config = [];
            angular.forEach(newCols, function (col) {
                config.push(_.pick(col, 'field', 'pinned', 'displayName', 'width', 'visible', 'cellFilter', 'cellTemplate'));
            });
            // set to local storage...
            gridModel.resetColDefs(config);
        });

        dc.localStorageClear = function (key) {
            $scope.clearLocalStorage($state.current.name, undefined, key);
            $state.reload();
        };
    }

})();
