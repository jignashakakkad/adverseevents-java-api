(function () {
  'use strict';

    angular
    .module('company')
    .factory('companyRxsignalSummaryService' , ['$window', '$state', 'companyService', 'companyChartService', 'companyRxsignalGridService', 'localStorageService', companyRxsignalSummaryService]);

    function companyRxsignalSummaryService($window, $state, companyService, companyChartService, companyRxsignalGridService, localStorageService) {

        //define variables
        var exports = {
            getGridOptions: getGridOptions,
            setCustomGridColumns: setCustomGridColumns,
            getCustomGridColumns: getCustomGridColumns,
            drawChart: drawChart
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
                gridColumns = companyRxsignalGridService.getColDefs('summary');
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

        function drawChart(myData, RxsignalSummaryData) {
            var cdata = companyService.getStripped(RxsignalSummaryData);
            var dataCopy = angular.copy(myData);
            var cfg = companyChartService.getRxsignalSummaryChart(dataCopy.slice(0, 8));
            c3.generate(cfg);
        };

    };
})();
