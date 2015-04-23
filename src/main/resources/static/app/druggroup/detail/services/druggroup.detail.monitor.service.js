(function () {
    'use strict';
    angular.module('druggroup.services').factory('drugGroupMonitorService', ['localStorageService', '$state', DrugGroupMonitorService]);
    function DrugGroupMonitorService(localStorageService, $state) {
        var exports = {
            getMonitorColumnDefinition: getMonitorColumnDefinition,
            setMonitorColumnDefinition: setMonitorColumnDefinition
        };
        return exports;
        function getMonitorColumnDefinition() {
            var monitorGridHeader = [];
            var eventDate = {
                field: 'event_dt',
                pinned: true,
                cellClass: 'drugName',
                width: '10%',
                visible: true,
                cellFilter: 'date',
                displayName: 'Date'
            };
            monitorGridHeader.push(eventDate);
            var productName = {
                field: 'product_drugname',
                cellClass: 'drugName',
                width: '20%',
                visible: true,
                displayName: 'Product',
                cellTemplate: '<div class="ngCellText""><a ui-sref="drugs.detail.rxsignal({id:row.getProperty(\'aedrug_id\') })">{{row.getProperty(col.field)  | pascalCaseFilter }}</a></div>'
            };
            monitorGridHeader.push(productName);
            var alertType = {
                field: 'alert_type',
                cellClass: 'drugName',
                width: '50%',
                visible: true,
                displayName: 'Headline',
                cellTemplate: '<div class="ngCellText monitor-headline">{{row.getProperty(col.field)}}</div>'
            };
            monitorGridHeader.push(alertType);
            var eventType = {
                field: 'event_type',
                cellClass: 'drugName',
                width: '20%',
                visible: true,
                displayName: 'Event Type'
            };
            monitorGridHeader.push(eventType);
            var colData = localStorageService.get($state.current.name + ".gridCols");
            if (!colData) {
                localStorageService.set($state.current.name + ".gridCols", monitorGridHeader);
            } else {
                monitorGridHeader = localStorageService.get($state.current.name + ".gridCols");
            }
            return monitorGridHeader;
        }

        function setMonitorColumnDefinition(monitorGridHeader) {
            localStorageService.set($state.current.name + ".gridCols", monitorGridHeader);
        }
    }
})();
