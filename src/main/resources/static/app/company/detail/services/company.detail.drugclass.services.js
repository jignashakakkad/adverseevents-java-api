(function () {
  'use strict';

    angular
    .module('company')
    .factory('companyDrugclassService' , ['$window', '$state', 'localStorageService', companyDrugclassService]);

    function companyDrugclassService($window, $state, localStorageService) {

        //define variables
        var exports = {
            getMyData: getMyData,
            rollupRxscoreRxsignalData: rollupRxscoreRxsignalData,
            finalizeRxscoreRxsignalData: finalizeRxscoreRxsignalData,
            reduceRxscoreRxsignalData: reduceRxscoreRxsignalData,
            getGridOptions: getGridOptions,
            setCustomGridColumns: setCustomGridColumns,
            getCustomGridColumns: getCustomGridColumns,
            getColDefs: getColDefs
        };

        exports.GRID_STORAGE_ID = ".gridCols";

        return exports;

        function getMyData(d, summaryData) {
            var products_scored = angular.fromJson(d.products_scored) || [];
            var rxsignal = rollupRxscoreRxsignalData(d.dimLabel, summaryData);
            var red = reduceRxscoreRxsignalData(rxsignal, d.dimLabel, 'class_drugclass');
            d.metrics = finalizeRxscoreRxsignalData(red);

            angular.forEach(d, function (val){
                angular.forEach(d.metrics, function(mval, mkey){
                   d[mkey] = mval;
                });

                delete d.metrics;
            });
            return d;
        }

        function rollupRxscoreRxsignalData(dimLabel, summary_data) {

            var dimType;
            var _products = [];
            if (summary_data === null || summary_data === 0) {
                return false;
            }

            dimType = 'class_drugclas';
            _products = (_.where(summary_data, {'class_drugclass': dimLabel}).length === 0) ? [] : _.where(summary_data, {'class_drugclass': dimLabel});
            return _products;
        }

        //input the subset of DrugclassData
        //basically this is a LEFT JOIN with GROUP BY and SUM and AVG
        function finalizeRxscoreRxsignalData(tset) {
            var totalDrugs = 1, totalSignals = 0, totalPS = 0, totalRor = [0], avgRor = 0.00, pctOverall = 0;
            angular.forEach(tset, function (d) {
                totalPS += d.metric_rxsignal_pscount;
                totalDrugs += 1;
                totalSignals += d.metric_rxsignal_active;
                totalRor.push(d.metric_rxsignal_avg_ror);
            });

            return {
                'metric_reduced_pscount': totalPS,
                'metric_reduced_totaldrugs': totalDrugs,
                'metric_reduced_totalsignals': totalSignals,
                'metric_reduced_avg_ror': (d3.mean(totalRor) > 0) ? d3.mean(totalRor) : 0.00
            };
        }

        function reduceRxscoreRxsignalData(collection, labelValue, labelKey) {

            var tset = [];
            return _.reduce(collection, function (memo, coll) {

                if (coll[labelKey] === labelValue) {
                    memo.push({
                        aedrug_id: coll.aedrug_id,
                        metric_rxsignal_pscount: coll.metric_rxsignal_pscount,
                        metric_rxsignal_avg_ror: coll.ROR,
                        metric_rxsignal_active: coll.metric_rxsignal_active,
                        metric_rxsignal_watchlist: coll.metric_rxsignal_watchlist
                    });
                }
                return memo;
            }, tset);
        }

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
                sortInfo: { fields: ['metric_weighted_rxscore'], directions: ['desc'] },
                columnDefs: 'colDefs',
                plugins: [new ngGridFlexibleHeightPlugin({"maxHeight": 500}), new ngGridCsvExportPlugin()]
            };
            return gridOptions;
        }

        function getColDefs() {

            var drugclassGrid = [];
            var product = {
                field: 'dimLabel',
                pinned: true,
                cellFilter: 'capitalizeFilter',
                width: '290px',
                visible: true,
                displayName: 'Product Name(s)',
                cellTemplate: '<div class="ngCellText""><a href="/drugclass.php?termCode={{ row.getProperty(\'dimCode\') }}">{{row.getProperty(col.field) | capitalizeFilter }}</a></div>'
            };
            var drugcount = {
                field: 'metric_drugcount',
                pinned: false,
                width: '99px',
                cellFilter: 'number',
                visible: true,
                displayName: 'Number of Drugs'
            };
            var rxscore = {
                field: 'metric_weighted_rxscore_2013',
                pinned: false,
                width: '170px',
                cellFilter: 'number:2',
                visible: true,
                displayName: 'Weighted RxScore 2013'
            };
            var totalRxscore = {
                field: 'metric_weighted_rxscore',
                pinned: false,
                width: '155px',
                cellFilter: 'number:2',
                visible: true,
                displayName: 'Total Class Weighted RxScore'
            };
            var rxsignalActiveADE = {
                field: 'metric_reduced_totalsignals',
                pinned: false,
                width: '170px',

                visible: true,
                displayName: 'Number of RxSignal Active ADE'
            };
            var primaryADE = {
                field: 'metric_reduced_pscount',
                pinned: false,
                width: '*',
                cellFilter: 'number',
                visible: true,
                displayName: 'RxSignal ADE Primary Suspect Cases'
            };

            drugclassGrid.push(product);
            drugclassGrid.push(drugcount);
            drugclassGrid.push(rxscore);
            drugclassGrid.push(totalRxscore);
            drugclassGrid.push(rxsignalActiveADE);
            drugclassGrid.push(primaryADE);

            return drugclassGrid;
        }

    };
})();
