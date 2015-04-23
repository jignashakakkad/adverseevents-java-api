(function () {
    'use strict';
    angular.module('druggroup.services').factory('drugGroupReportingService', ['localStorageService', '$state', DrugGroupReportingService]);
    function DrugGroupReportingService(localStorageService, $state) {
        var exports = {
            getReportingColumnDefinition: getReportingColumnDefinition,
            setReportingColumnDefinition: setReportingColumnDefinition
        };
        return exports;
        function getReportingColumnDefinition() {
            var quarterlyDataHeader = [];
            var productName = {
                field: 'A',
                pinned: true,
                cellClass: 'drugName',
                width: '*',
                visible: true,
                displayName: 'Product',
                cellTemplate: '<div class="ngCellText""><a ui-sref="drugs.detail.rxsignal({id:row.getProperty(\'B\') })">{{row.getProperty(col.field) | pascalCaseFilter}}</a></div>'
            };
            quarterlyDataHeader.push(productName);
            var approvalDate = {
                field: 'dt_approval',
                cellClass: 'drugName',
                visible: true,
                cellFilter: 'date:"M/dd/yyyy"',
                displayName: 'Approval'
            };
            quarterlyDataHeader.push(approvalDate);
            var revenue2013 = {
                field: 'evaluate_productRevenue2013',
                cellClass: 'drugName',
                cellFilter: 'number:2',
                visible: true,
                displayName: 'Revenue(\'13)'
            };
            quarterlyDataHeader.push(revenue2013);
            var lastUpdate = {
                field: 'dt_max_received',
                cellClass: 'drugName',
                visible: true,
                cellFilter: 'date:"M/dd/yyyy"',
                displayName: 'Updated'
            };
            quarterlyDataHeader.push(lastUpdate);
            var x0q3 = {
                field: 'x0q3',
                cellClass: 'drugName',
                cellFilter: 'number',
                visible: true,
                displayName: 'Q3 2012'
            };
            quarterlyDataHeader.push(x0q3);
            var x0q4 = {
                field: 'x0q4',
                cellClass: 'drugName',
                cellFilter: 'number',
                visible: true,
                displayName: 'Q4 2012'
            };
            quarterlyDataHeader.push(x0q4);
            var x1q1 = {
                field: 'x1q1',
                cellClass: 'drugName',
                cellFilter: 'number',
                visible: true,
                displayName: 'Q1 2013'
            };
            quarterlyDataHeader.push(x1q1);
            var x1q2 = {
                field: 'x1q2',
                cellClass: 'drugName',
                cellFilter: 'number',
                visible: true,
                displayName: 'Q2 2013'
            };
            quarterlyDataHeader.push(x1q2);
            var x1q3 = {
                field: 'x1q3',
                cellClass: 'drugName',
                cellFilter: 'number',
                visible: true,
                displayName: 'Q3 2013'
            };
            quarterlyDataHeader.push(x1q3);
            var x1q4 = {
                field: 'x1q4',
                cellClass: 'drugName',
                cellFilter: 'number',
                visible: true,
                displayName: 'Q4 2013'
            };
            quarterlyDataHeader.push(x1q4);
            var x2q1 = {
                field: 'x2q1',
                cellClass: 'drugName',
                cellFilter: 'number',
                visible: true,
                displayName: 'Q1 2014'
            };
            quarterlyDataHeader.push(x2q1);
            var x2q2 = {
                field: 'x2q2',
                cellClass: 'drugName',
                cellFilter: 'number',
                visible: true,
                displayName: 'Q2 2014'
            };
            quarterlyDataHeader.push(x2q2);
            var colData = localStorageService.get($state.current.name + ".gridCols");
            if (!colData) {
                localStorageService.set($state.current.name + ".gridCols", quarterlyDataHeader);
            } else {
                quarterlyDataHeader = localStorageService.get($state.current.name + ".gridCols");
            }
            return quarterlyDataHeader;
        }

        function setReportingColumnDefinition(reportingGridHeader) {
            localStorageService.set($state.current.name + ".gridCols", reportingGridHeader);
        }
    }
})();
