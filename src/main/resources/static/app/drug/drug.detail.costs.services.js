angular.module('drugs').config(function (RestangularProvider, localStorageServiceProvider, SERVER_SETTINGS) {
    localStorageServiceProvider.setPrefix('aex');
    RestangularProvider.setBaseUrl(SERVER_SETTINGS.BASE_URL);
});

angular.module('drugs').factory('drugCostsService' , ['$http', '$window', 'Restangular', 'SERVER_SETTINGS', 'utilService', 'localStorageService', drugCostsService]);

function drugCostsService($http, $window, Restangular, SERVER_SETTINGS, utilService, localStorageService) {

    //define variables
    var exports = {
        costChartConfig: costChartConfig,
        getDrugCostColumnDefinition: getDrugCostColumnDefinition,
        getChartNumbers: getChartNumbers,
        getGridNumbers: getGridNumbers,
        getDefaultGridOptions: getDefaultGridOptions,
        getPieChartNumbers: getPieChartNumbers,
        localStorageClear: localStorageClear,
        getCustomGridColumns: getCustomGridColumns,
        setCustomGridColumns: setCustomGridColumns,
        getTooltip: getTooltip
    };

    exports.GRID_STORAGE_ID = ".gridCols";

    return exports;

    function getScoresForChart(drugId) {
        return $http({
            method: 'GET',
            url: SERVER_SETTINGS.BASE_URL + 'api/drug/' + drugId + '/costs/eachrx'
        });
    }

    function getScoresForGrid(drugId, resultLimit) {
        return $http({
            method: 'GET',
            url: SERVER_SETTINGS.BASE_URL + 'api/drug/' + drugId + '/costs/event' + resultLimit
        });
    }

    function getNumbersForPieChart(drugId) {
        return $http({
            method: 'GET',
            url: SERVER_SETTINGS.BASE_URL + 'api/drug/' + drugId + '/costs/event/by/onlabel'
        });
    }

    function getChartNumbers(drugId) {
        return getScoresForChart(drugId);
    }

    function getGridNumbers(drugId, resultLimit) {
        return getScoresForGrid(drugId, resultLimit);
    }

    function getPieChartNumbers(drugId) {
        return getNumbersForPieChart(drugId);
    }

    function localStorageClear(stateName) {
        if ($window.localStorage) {
            localStorageService.remove(stateName + exports.GRID_STORAGE_ID);
        }
    }

    function costChartConfig(bigNumbers) {

        function coerceInteger(str){
            return parseInt(str,10);
        }

        var costPieSeries = [{
                type: 'pie',
                name: 'Cost',
                colors: [
                    '#1aadce',
                    '#8bbc21',
                    '#1f78b4'
                    ],
                data: [
                    ['On Label',   coerceInteger(bigNumbers.metric_annual_event_onlabel_cost)],
                    ['Off Label',   coerceInteger(bigNumbers.metric_annual_event_offlabel_cost)],
                    ['Outcome',   coerceInteger(bigNumbers.metric_annual_outc_cost)]
                ]
            }];

        var costChartConfig = {
            options: {
                chart: {
                    height: 297,
                    margin: [0, 0, 50, 0],
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                dataLabels: {
                    enabled: false,
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br><b>${point.y:,.0f}</b>'
                },
                showInLegend: true,
                title: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        showInLegend: true
                    }
                },
            },
            series: costPieSeries
        };
        return costChartConfig;
    }

    function getDrugCostColumnDefinition() {
        var colDefsDetail = [];
        var headerTemplate = '<div class="ngHeaderSortColumn test" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">'
        + '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter"'
        + 'popover="{{getTooltip(col.displayName)}}">'
        + '{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>'
        + '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>'
        + '<div class="ngSortPriority">{{col.sortPriority}}</div>'
        + '<div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div>'
        + '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';

        var adverseEvent = {
            field: 'event_label',
            width: '300',
            pinned: true,
            visible: true,
            displayName: 'Adverse Event',
            headerCellTemplate: headerTemplate,
            cellTemplate: '<div class="ngCellText pull-left">{{row.getProperty(col.field) }}</div>'
        };
        var incidenceRate = {
            field: 'metric_icumulative',
            width: '14%',
            visible: true,
            displayName: 'Incidence',
            headerCellTemplate: headerTemplate,
            cellTemplate: '<div class="ngCellText text-center">{{row.getProperty(col.field) | incidenceFilter}}</div>'
        };
        var primarySuspect = {
            field: 'metric_sum_pscase',
            width: '11.5%',
            visible: true,
            displayName: 'Cases',
            headerCellTemplate: headerTemplate,
            cellTemplate: '<div class="ngCellText text-center">{{row.getProperty(col.field) }}</div>'
        };
        var onLabel = {
            field: 'dim_aedrug_event_onlabel',
            width: '11%',
            visible: true,
            displayName: 'On Label',
            headerCellTemplate: headerTemplate,
            cellTemplate: '<div class="ngCellText text-center"'
            + 'ng-class="{\'green\' : row.getProperty(\'dim_aedrug_event_onlabel\') == \'Labeled\',\'red\' : row.getProperty(\'dim_aedrug_event_onlabel\') == \'Not Labeled\' }">'
            + '<p>{{row.getProperty(col.field) }}</p></div>'
        };
        var costPerAe = {
            field: 'metric_mean_event_cost',
            width: '20%',
            visible: true,
            displayName: 'RxCost Per Adverse Event',
            headerCellTemplate: headerTemplate,
            cellTemplate: '<div class="ngCellText text-center">{{row.getProperty(col.field) | currency:$:2 }}</div>'

        };
        var totalCost = {
            field: 'metric_sum_event_cost',
            width: '15%',
            visible: true,
            displayName: 'Total RxCost',
            headerCellTemplate: headerTemplate,
            cellTemplate: '<div class="ngCellText text-center">{{row.getProperty(col.field) | currency:$:2 }}</div>'
        };
        colDefsDetail.push(adverseEvent);
        colDefsDetail.push(incidenceRate);
        colDefsDetail.push(primarySuspect);
        colDefsDetail.push(onLabel);
        colDefsDetail.push(costPerAe);
        colDefsDetail.push(totalCost);
        return colDefsDetail;
    }

    function getCustomGridColumns(stateName) {
        var storageId = stateName + exports.GRID_STORAGE_ID;
        var gridColumns = localStorageService.get(storageId);
        if (!gridColumns) {
            gridColumns = getDrugCostColumnDefinition();
            localStorageService.set(storageId, angular.toJson(gridColumns));
        }
        return gridColumns;
    }

    function setCustomGridColumns(stateName, newColumns) {
        var storageId = stateName + exports.GRID_STORAGE_ID;
        localStorageService.set(storageId, angular.toJson(newColumns));
    }

    function getDefaultGridOptions() {
        return {
            data: 'gridNumbers',
            enableSorting: true,
            enableColumnResize: true,
            showGroupPanel: true,
            enableCellGrouping: true,
            showColumnMenu: true,
            enablePinning: true,
            showFilter: true,
            jqueryUITheme: true,
            columnDefs: 'headers',
            sortInfo:{fields:['metric_sum_event_cost'], directions:['desc']},
            plugins: [new ngGridFlexibleHeightPlugin({"maxHeight": 500}), new ngGridCsvExportPlugin()]
        }
    };

    function getTooltip (displayName) {

        if (displayName === 'Adverse Event') {
            return "MedDRA Adverse Event";
        } else if (displayName === 'On Label') {
            return 'Whether the adverse event listed is currently on or off the drug’s label.';
        } else if (displayName === 'Cases') {
            return 'Number of cases reported for a given adverse event during the previous 5-year period. If multiple adverse events were reported for the same patient, only the highest costing (according to the HCUP survey) was used in this calculation.  Additionally, the drug must have been listed as the “primary suspect” for the reported adverse event.';
        } else if (displayName === 'Incidence') {
            return 'Amount of times a given adverse event was reported as a “primary suspect” during the previous 5-year period divided by number of patients exposed to the drug.  If multiple adverse events were reported for the same patient, only the highest costing (according to the HCUP survey) was used in this calculation.';
        } else if (displayName === 'RxCost Per Adverse Event') {
            return 'Average Cost of treating the adverse event listed according to the Healthcare Cost and Utilization Project (HCUP) (2012)';
        } else if (displayName === 'Total RxCost') {
            return 'Average cost of treating the adverse event multiplied by the number of patients who experience such event where the event was the highest costed event out all of those experienced by the patient.';
        }
    };

}
