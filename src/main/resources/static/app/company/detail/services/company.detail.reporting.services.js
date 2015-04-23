(function () {
  'use strict';

    angular
    .module('company')
    .factory('companyReportingService' , ['$window', '$state', 'localStorageService', companyReportingService]);

    function companyReportingService($window, $state, localStorageService) {

        //define variables
        var exports = {
            getGridOptions: getGridOptions,
            setCustomGridColumns: setCustomGridColumns,
            getCustomGridColumns: getCustomGridColumns,
            getColDefs: getColDefs,
            formatReportingData : formatReportingData
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
                sortInfo: { fields: ['x2q2'], directions: ['desc'] },
                columnDefs: 'colDefs',
                plugins: [new ngGridFlexibleHeightPlugin({"maxHeight": 500}), new ngGridCsvExportPlugin()]
            };
            return gridOptions;
        }

        function getColDefs() {

            var monitorGridHeader = [];
            var product = {
                field: 'A',
                pinned: true,
                cellClass: 'drugName',
                cellFilter: 'capitalizeFilter',
                width: '177px',
                visible: true,
                displayName: 'Product',
                cellTemplate: '<div class="ngCellText""><a ui-sref="drugs.detail.overview({id:row.getProperty(\'B\') })">{{row.getProperty(col.field) | capitalizeFilter }}</a></div>'
            };
            var approval = {
                field: 'dt_approval',
                pinned: false,
                cellClass: 'drugName',
                width: '100px',
                cellFilter: 'date',
                visible: true,
                displayName: 'Approval'
            };
            var rev2013 = {
                field: 'evaluate_productRevenue2013',
                pinned: false,
                width: '100px',
                visible: true,
                displayName: '2013 Revenue',
                cellTemplate:'<div class="ngCellText drugName">{{row.getProperty(col.field)>= 0 ? (row.getProperty(col.field) | currency:$:2) : "-"}}</div>'
            };
            var lastUpdate = {
                field: 'dt_max_data',
                pinned: false,
                cellClass: 'drugName',
                width: '100px',
                cellFilter: 'date',
                visible: true,
                displayName: 'Last Update'
            };
            var x2q2 = {
                field: 'x2q2',
                pinned: false,
                cellClass: 'drugName',
                width: '68px',
                cellFilter: 'number:0',
                visible: true,
                displayName: 'Q2 2014'
            };
            var x2q1 = {
                field: 'x2q1',
                pinned: false,
                cellClass: 'drugName',
                width: '68px',
                cellFilter: 'number:0',
                visible: true,
                displayName: 'Q1 2014'
            };
            var x1q4 = {
                field: 'x1q4',
                pinned: false,
                cellClass: 'drugName',
                width: '68px',
                cellFilter: 'number:0',
                visible: true,
                displayName: 'Q4 2013'
            };
            var x1q3 = {
                field: 'x1q3',
                pinned: false,
                cellClass: 'drugName',
                width: '68px',
                cellFilter: 'number:0',
                visible: true,
                displayName: 'Q3 2013'
            };
            var x1q2 = {
                field: 'x1q2',
                pinned: false,
                cellClass: 'drugName',
                width: '68px',
                cellFilter: 'number:0',
                visible: true,
                displayName: 'Q2 2013'
            };
            var x1q1 = {
                field: 'x1q1',
                pinned: false,
                cellClass: 'drugName',
                width: '68px',
                cellFilter: 'number:0',
                visible: true,
                displayName: 'Q1 2013'
            };
            var x0q4 = {
                field: 'x0q4',
                pinned: false,
                cellClass: 'drugName',
                width: '68px',
                cellFilter: 'number:0',
                visible: true,
                displayName: 'Q4 2012'
            };
            var x0q3 = {
                field: 'x0q3',
                pinned: false,
                cellClass: 'drugName',
                width: '68px',
                cellFilter: 'number:0',
                visible: true,
                displayName: 'Q3 2012'
            };
            var x0q2 = {
                field: 'x0q2',
                pinned: false,
                cellClass: 'drugName',
                width: '*',
                cellFilter: 'number:0',
                visible: true,
                displayName: 'Q2 2012'
            };

            monitorGridHeader.push(product);
            monitorGridHeader.push(approval);
            monitorGridHeader.push(rev2013);
            monitorGridHeader.push(lastUpdate);
            monitorGridHeader.push(x2q2);
            monitorGridHeader.push(x2q1);
            monitorGridHeader.push(x1q4);
            monitorGridHeader.push(x1q3);
            monitorGridHeader.push(x1q2);
            monitorGridHeader.push(x1q1);
            monitorGridHeader.push(x0q4);
            monitorGridHeader.push(x0q3);
            monitorGridHeader.push(x0q2);

            return monitorGridHeader;
        }
        
        function formatReportingData(reportingData){
            _.each(reportingData, function(data){
               if(!data.evaluate_productRevenue2013 || data.evaluate_productRevenue2013 === '-')  {
                   data.evaluate_productRevenue2013 = -1;
               }
            });
            return reportingData;
        }

    };
})();
