(function () {
  'use strict';

    angular
    .module('company')
    .factory('companyOverviewService' , ['$http', '$window', '$state', 'companyGridService', 'localStorageService', companyOverviewService]);

    function companyOverviewService($http, $window, $state, companyGridService, localStorageService) {

        //define variables
        var exports = {
            getGridOptions: getGridOptions,
            setCustomGridColumns: setCustomGridColumns,
            getCustomGridColumns: getCustomGridColumns
        };

        exports.GRID_STORAGE_ID = ".gridCols";

        return exports;

        function setCustomGridColumns(stateName, newColumns) {
            var storageId = stateName + exports.GRID_STORAGE_ID;
            localStorageService.set(storageId, angular.toJson(newColumns));
        }

        function getCustomGridColumns(stateName) {
            var storageId = stateName + exports.GRID_STORAGE_ID;
            var gridColumns = localStorageService.get(storageId);
            if (!gridColumns) {
                gridColumns = companyGridService.getColDefs();
                localStorageService.set(storageId, angular.toJson(gridColumns));
            }
            return gridColumns;
        }

        function getGridOptions() {
            var gridOptions =         {
                data: 'myData',
                enableSorting: true,
                enableColumnResize: true,
                showGroupPanel: true,
                enableCellGrouping: true,
                showColumnMenu: true,
                enablePinning: true,
                showFilter: true,
                jqueryUITheme: false,
                columnDefs: 'colDefs',
                plugins: [new ngGridFlexibleHeightPlugin({"maxHeight": 500}), new ngGridCsvExportPlugin()]
            };
            return gridOptions;
        }

    };
})();
