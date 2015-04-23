(function () {
  'use strict';

    angular
    .module('company')
    .factory('rxscoreService' , ['$window', '$state', 'localStorageService', rxscoreService]);

    function rxscoreService($window, $state, localStorageService) {

        //define variables
        var exports = {
            getGridOptions: getGridOptions,
            setCustomGridColumns: setCustomGridColumns,
            getCustomGridColumns: getCustomGridColumns,
            getColDefs: getColDefs
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
                gridColumns = getColDefs();
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
                sortInfo: { fields: ['metric_indication_rank'], directions: ['asc'] },
                columnDefs: 'colDefs',
                plugins: [new ngGridFlexibleHeightPlugin({"maxHeight": 500}), new ngGridCsvExportPlugin()]
            };
            return gridOptions;
        }

        function getColDefs() {

            var rxscoreGrid = [];
            var product = {
                field: 'product_drugname',
                pinned: true,
                cellFilter: 'capitalizeFilter',
                width: '185px',
                visible: true,
                displayName: 'Product Name(s)',
                cellTemplate: '<div class="ngCellText""><a ui-sref="drugs.detail.overview({id:row.getProperty(\'aedrug_id\') })">{{row.getProperty(col.field) | capitalizeFilter }}</a></div>'
            };
            var approval = {
                field: 'dt_approval',
                pinned: false,
                width: '100px',
                cellFilter: 'date',
                visible: true,
                displayName: 'Approval Date'
            };
            var rxscore = {
                field: 'metric_rxscore',
                pinned: false,
                width: '70px',
                cellFilter: 'number:2',
                visible: true,
                displayName: 'RxScore'
            };
            var drugclass = {
                field: 'class_drugclass_label',
                pinned: false,
                width: '270px',
                visible: true,
                displayName: 'Drug Class'
            };
            var drugclassRank = {
                field: 'metric_drugclass_rank',
                pinned: false,
                width: '97px',
                visible: true,
                displayName: 'Rank in Drug Class',
                cellTemplate: '<div class="ngCellText"">{{ row.getProperty(col.field) }} of {{row.getProperty(\'metric_drugclass_rank_size\')}}</div>'
            };
            var primary = {
                field: 'class_indication',
                pinned: false,
                width: '270px',
                visible: true,
                displayName: 'Primary Indication'
            };
            var indicationRank = {
                field: 'metric_indication_rank',
                pinned: false,
                width: '*',
                visible: true,
                displayName: 'Rank in Indication',
                cellTemplate: '<div class="ngCellText"">{{ row.getProperty(col.field) }} of {{row.getProperty(\'metric_indication_rank_size\')}}</div>'
            };

            rxscoreGrid.push(product);
            rxscoreGrid.push(approval);
            rxscoreGrid.push(rxscore);
            rxscoreGrid.push(drugclass);
            rxscoreGrid.push(drugclassRank);
            rxscoreGrid.push(primary);
            rxscoreGrid.push(indicationRank);

            return rxscoreGrid;
        }

    };
})();
