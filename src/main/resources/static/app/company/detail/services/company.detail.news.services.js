(function () {
  'use strict';

    angular
    .module('company')
    .factory('companyNewsService' , ['$window', '$state', 'companyRxsignalGridService', 'localStorageService', companyNewsService]);

    function companyNewsService($window, $state, companyRxsignalGridService, localStorageService) {

        //define variables
        var exports = {
            getGridOptions: getGridOptions,
            setCustomGridColumns: setCustomGridColumns,
            getCustomGridColumns: getCustomGridColumns,
            getMonitorColumnDefinition: getMonitorColumnDefinition
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
                gridColumns = getMonitorColumnDefinition();
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
                jqueryUITheme: true,
                columnDefs: 'colDefs',
                plugins: [new ngGridFlexibleHeightPlugin({"maxHeight": 500}), new ngGridCsvExportPlugin()]
            };
            return gridOptions;
        }

        function getMonitorColumnDefinition() {

            var monitorGridHeader = [];
            var eventDate = {
                field: 'event_dt',
                pinned: true,
                width: '110px',
                visible: true,
                cellFilter: 'date',
                displayName: 'Date',
            };
            var productName = {
                field: 'product_drugname',
                width: '220px',
                visible: true,
                displayName: 'Product',
                cellTemplate: '<div class="ngCellText""><a ui-sref="drugs.detail.rxsignal({id:row.getProperty(\'aedrug_id\') })">{{row.getProperty(col.field) | capitalizeFilter }}</a></div>'
            };
            var alertType = {
                field: 'alert_type',
                width: '552px',
                visible: true,
                displayName: 'Headline',
                cellTemplate: '<div class="ngCellText monitor-headline"><a href="{{row.getProperty(\'alert_url\')}}">{{row.getProperty(col.field)}}</a></div>'
            };
            var eventType = {
                field: 'event_type',
                width: '*',
                visible: true,
                displayName: 'Event Type'
            };

            monitorGridHeader.push(eventDate);
            monitorGridHeader.push(productName);
            monitorGridHeader.push(alertType);
            monitorGridHeader.push(eventType);

            return monitorGridHeader;
        }

    };
})();
