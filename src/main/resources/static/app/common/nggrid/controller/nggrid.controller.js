(function () {
    'use strict';
    /**
     * @ngdoc controller
     * @namespace common.nggrid
     * @name common.nggrid.controller:GridController
     * @param {$scope} $scope $scope of injecting controller
     * @param {GridModels} GridModels Array of {@see GriModel} Objects that are required on the a page.<br/>
     * {@link common.nggrid.object:GridModel|GridModel} []
     * 
     * @description 
     * When injected from other controllers, It will add grids to the controller scope.
     * So it is accesible on the html page as scope variables.
     *
     * @example 
     * <code>
     * var GridModels[];<br/>
     * var gridModel = new GridModel('currentStateName', 'uniqueGridName', false);<br/>
     * gridModel.setData(exampleData);<br/>
     * // Array of GridModel<br/>
     * GridModels.push(gridModel);<br/>
     * $controller('GridController', {$scope: $scope, GridModels: GridModels});</div>
     * </code>
     **/
    function GridController($scope, GridModels) {
        _.each(GridModels, function (gridModel) {
            $scope[gridModel.getGridName()] = gridModel;
            gridModel.setDataForGrid(gridModel.getGridName() + ".data");
            gridModel.setColumnDefinitionForGrid(gridModel.getGridName() + ".colDefs");
//            $scope.$watch('GridModel.options$gridScope.columns', gridCommonService.changeGridCallback, true);
        });
    }
    angular.module('common.nggrid').controller('GridController', GridController);
})();