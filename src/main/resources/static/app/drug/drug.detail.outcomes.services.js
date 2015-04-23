(function () {
    'use strict';

    angular
        .module('drugs')
        .factory('drugOutcomesService' , ['$http', '$window', '$state', 'localStorageService', 'utilService', drugOutcomesService]);

    function drugOutcomesService($http, $window, $state, localStorageService, utilService) {

        //define variables
        var formatOutcomes = utilService.formatter.outcomes;

        var exports = {
            localStorageClear: localStorageClear,
            setCustomGridColumns: setCustomGridColumns,
            getCustomGridColumns: getCustomGridColumns,
            getGridOptions: getGridOptions,
            GridCols: GridCols,
            setTotal: setTotal,
            getOutcomesChart: getOutcomesChart
        };

        exports.GRID_STORAGE_ID = ".gridCols";

        function localStorageClear(stateName) {
            if ($window.localStorage) {
                localStorageService.remove(stateName + exports.GRID_STORAGE_ID);
                $state.reload();
            }
        }

        function setCustomGridColumns(stateName, newColumns) {
            var storageId = stateName + exports.GRID_STORAGE_ID;
            localStorageService.set(storageId, angular.toJson(newColumns));
        }

        function getCustomGridColumns(stateName) {
            var storageId = stateName + exports.GRID_STORAGE_ID;
            var gridColumns = localStorageService.get(storageId);
            if (!gridColumns) {
                gridColumns = GridCols();
                localStorageService.set(storageId, angular.toJson(gridColumns));
            }
            return gridColumns;
        }

        function getGridOptions() {
            var template = '<div ng-click="onClickRow(row)"  ng-style="{cursor: row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" '
            + 'class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div>'
            + '<div ng-cell></div></div>';

            var gridOptions = {
                data: 'OutcomesIncidence',
                enableSorting: true,
                enableColumnResize: true,
                showGroupPanel: true,
                enableCellGrouping: true,
                showColumnMenu: true,
                enablePinning: true,
                showFilter: true,
                cellClass: 'grid-align',
                multiSelect: false,
                columnDefs: 'colDefs',
                rowTemplate: template,
                jqueryUITheme: false,
                plugins: [new ngGridFlexibleHeightPlugin({"maxHeight": 500}), new ngGridCsvExportPlugin()],
            };

            return gridOptions;
        }

        function GridCols() {

            var colDefsDetail = [];
            var headerTemplate = '<div class="ngHeaderSortColumn test" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">'
            + '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter"'
            + 'popover="{{Tooltipper(col.displayName)}}">'
            + '{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>'
            + '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>'
            + '<div class="ngSortPriority">{{col.sortPriority}}</div>'
            + '<div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div>'
            + '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';

            var numberCellTemplate = '<div class="ngCellText""><p>{{ row.getProperty(col.field) | number }}</p></div>';
            var incidenceCellTemplate = '<div class="ngCellText""><p>{{ row.getProperty(col.field) | incidenceFilter }}</p></div>';

            var outcome = {
                field: 'outc_cod',
                width: '210',
                cellClass: "outcome",
                pinned: true,
                visible: true,
                displayName: 'Outcome',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div class="ngCellText""><p>{{ formatOutcomes(row.getProperty(col.field)).name }}</p></div>'
            };
            var primary = {
                field: 'ps_count',
                width: '110',
                visible: true,
                displayName: 'Primary Suspects',
                headerCellTemplate: headerTemplate,
                cellTemplate: numberCellTemplate
            };
            var total_count = {
                field: 'total_count',
                width: '110',
                visible: true,
                displayName: 'All Suspects',
                headerCellTemplate: headerTemplate,
                cellTemplate: numberCellTemplate
            };
            var i2010 = {
                field: 'i2010',
                width: '110',
                visible: true,
                displayName: '2010 Outcome Rate',
                headerCellTemplate: headerTemplate,
                cellTemplate: incidenceCellTemplate
            };
            var i2011 = {
                field: 'i2011',
                width: '110',
                visible: true,
                displayName: '2011 Outcome Rate',
                headerCellTemplate: headerTemplate,
                cellTemplate: incidenceCellTemplate
            };
            var i2012 = {
                field: 'i2012',
                width: '110',
                visible: true,
                displayName: '2012 Outcome Rate',
                headerCellTemplate: headerTemplate,
                cellTemplate: incidenceCellTemplate
            };
            var i2013 = {
                field: 'i2013',
                width: '110',
                visible: true,
                displayName: '2013 Outcome Rate',
                headerCellTemplate: headerTemplate,
                cellTemplate: incidenceCellTemplate
            };
            var i2014 = {
                field: 'i2014',
                width: '110',
                visible: true,
                displayName: '2014 Outcome Rate',
                headerCellTemplate: headerTemplate,
                cellTemplate: incidenceCellTemplate
            };
            var iCumulative = {
                field: 'iCumulative',
                width: '*',
                visible: true,
                displayName: '5-Year Cumulative Incidence',
                headerCellTemplate: headerTemplate,
                cellTemplate: incidenceCellTemplate
            };

            colDefsDetail.push(outcome);
            colDefsDetail.push(primary);
            colDefsDetail.push(total_count);
            colDefsDetail.push(i2010);
            colDefsDetail.push(i2011);
            colDefsDetail.push(i2012);
            colDefsDetail.push(i2013);
            colDefsDetail.push(i2014);
            colDefsDetail.push(iCumulative);

            return colDefsDetail;
        }

        //TODO(cerdman) -- split this into like 3 separate small functions to improve readability / reduce bloat
        function setTotal(OutcomesIncidence) {
            var seen = [];
            var OutcomesIncidenceTotal = {
                "ps_count": 0,
                "total_count": 0,
                "i2010": 0.0000,
                "i2011": 0.0000,
                "i2012": 0.0000,
                "i2013": 0.0000,
                "i2014": 0.0000,
                "iCumulative": 0.0000
            };

            // Simple transformation / validator to reduce clutter
            function validateRowValue(dColumn){
                return Math.abs(dColumn) > 0 && Math.abs(dColumn) < 1 ? Math.abs(dColumn) : 0.000;
            }

            if (OutcomesIncidence.length > 2) {
                _.map(OutcomesIncidence, function (d) {
                    if (seen.indexOf(d.outc_cod) === -1) {
                        OutcomesIncidenceTotal.outc_cod = 'Total';
                        OutcomesIncidenceTotal.ps_count += Math.abs(d.ps_count);
                        OutcomesIncidenceTotal.total_count += Math.abs(d.total_count) > 0 ? Math.abs(d.total_count) : 0;
                        OutcomesIncidenceTotal.i2010 += validateRowValue(d.i2010);
                        OutcomesIncidenceTotal.i2011 += validateRowValue(d.i2011);
                        OutcomesIncidenceTotal.i2012 += validateRowValue(d.i2012);
                        OutcomesIncidenceTotal.i2013 += validateRowValue(d.i2013);
                        OutcomesIncidenceTotal.i2014 += validateRowValue(d.i2014);
                        OutcomesIncidenceTotal.iCumulative += validateRowValue(d.iCumulative);
                        seen.push(d.outc_cod);
                    }
                });
                return _.object(_.map(OutcomesIncidenceTotal, function(val, key) {
                    return [key, val.toString()];
                }));
            }
        }

        function getOutcomesChart(outcomes, OutcomesSeries) {
            var outcomePieData = [];
            var outcomePieSeries = {
                "type": "pie",
                "name": 'Outcomes',
                "data": outcomePieData,
                "showInLegend": false,
                "dataLabels": {"enabled": false},
                "zIndex": 99999,
                "center": [100, 80],
                "size": 200
            };
            angular.forEach(outcomes, function (o) {
                var formatter = formatOutcomes(o.outcome);

                outcomePieSeries.data.push({name: formatter.name, id: formatter.name, color: formatter.color, y: Math.abs(o.pscount)});
            });

            var tsData = [];
            angular.forEach(OutcomesSeries, function (value, key) {
                if (key.length === 2) {

                    var formatter = formatOutcomes(key);

                    var series = {

                        "type": "line", "id": key, "name": formatter.name, "color": formatter.color, zIndex: 9999, "data": [], "marker": {"enabled": true, "radius": 2}
                    };

                    angular.forEach(value, function (d) {
                        series.data.push([Date.UTC(Math.abs(d.fda_year), Math.abs(d.fda_month) - 1, Math.abs(d.fda_day)), Math.abs(d.ps_count)]);
                        // series.data.push([d.fda_dt_int, Math.abs(d.ps_count)]);
                    });
                    tsData.push(series);
                }
            });
            tsData.push(outcomePieSeries);

            var chartConfig = {
                options: {
                    chart: {
                        zoomType: 'x',
                        type: 'StockChart'
                    },
                    tooltip: {
                        enabled: true,
                        shared: true,
                        crosshairs: true,
                        valueSuffix: ' Cases'
                    },
                    rangeSelector: {
                        selected: 1
                    },

                    plotOptions: {

                        area: {
                            fillColor: {
                                linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                                stops: [
                                    [0, Highcharts.getOptions().colors[2]],
                                    [1, 'rgba(219,132,61,0)']
                                ]
                            },
                            lineWidth: 1,
                            marker: {
                                enabled: false,
                                states: {
                                    hover: {
                                        enabled: true,
                                        radius: 5
                                    }
                                }
                            },
                            shadow: false,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            }
                        },
                        line: {
                            dashStyle: null,
                            threshold: 2.0,
                            lineWidth: 2,
                            marker: {
                                enabled: true,
                                states: {
                                    hover: {
                                        enabled: true,
                                        radius: 4
                                    }, radius: 3
                                }
                            },
                            tooltip: {xDateFormat: '%Y-%m-%d', valueSuffix: ' '}

                        },
                        flag: {
                            tooltip: {xDateFormat: '%Y-%m-%d'}
                        }

                    }
                },
                xAxis: {
                    type: 'datetime',
                    maxZoom: 210 * 24 * 3600000
                },
                yAxis: {
                    title: {
                        text: 'Primary Suspect Cases'
                    },
                    min: 0,
                    //startOnTick: false,
                    //showFirstLabel: false
                    maxPadding: 0.01
                },
                series: tsData,

                title: {
                    text: 'Reported Outcomes Timeline'
                },
                loading: false
            };
            return chartConfig;
        };

        return exports;
    };
})();
