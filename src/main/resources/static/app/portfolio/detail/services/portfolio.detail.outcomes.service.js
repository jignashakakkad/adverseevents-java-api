(function () {
  'use strict';

    angular
    .module('portfolio.detail')
    .factory('portfolioOutcomesService' , ['$window', '$state', 'localStorageService', portfolioOutcomesService]);

    function portfolioOutcomesService($window, $state, localStorageService) {

        //define variables
        var exports = {
            getDatayear: getDatayear,
            getOutcomePivotTable: OutcomesPivotData,
            getOutcomePivotTableHeader: OutcomesPivotDataHeader,
            getMinMaxOutcomesData: getMinMaxOutcomesData,
            getOutcomeGridColumns: getOutcomeGridColumns,
            getGridOptions: getGridOptions,
            setCustomGridColumns: setCustomGridColumns,
            getCustomGridColumns: getCustomGridColumns
        };

        exports.GRID_STORAGE_ID = ".gridCols";
        exports.OutcomesData;
        exports.OutcomesHeaderData;
        return exports;

        function getDatayear(params) {
            switch (params) {
                case 'cumulative':
                    return 'Cumulative Data';
                case '2014':
                    return '2014';
                case '2013':
                    return '2013';
                case '2012':
                    return '2012';
                case '2011':
                    return '2011';
                case '2010':
                    return '2010';
                default:
                    return 'Cumulative Data';
            }
        }

        function OutcomesPivotData(OutcomesData, datayear) {

            exports.OutcomesHeaderData = exports.getOutcomePivotTableHeader(OutcomesData);
            exports.OutcomesData = d3.nest()
                    .key(function (d) {
                        return d.product_drugname;
                    })
                    .sortKeys(d3.ascending)
                    .key(function (d) {
                        return d.outc_cod;
                    })
                    .sortKeys(d3.ascending)
                    .rollup(function (leaves) {
                        return {
                            "aedrug_id": leaves[0].aedrug_id, "metric_value": d3.mean(leaves, function (d) {

                                var metric;

                                switch (datayear) {
                                    case 'cumulative':
                                        return metric = d.metric_icumulative;
                                    case '2014':
                                        return metric = d.metric_i2014;
                                    case '2013':
                                        return metric = d.metric_i2013;
                                    case '2012':
                                        return metric = d.metric_i2012;
                                    case '2011':
                                        return metric = d.metric_i2011;
                                    case '2010':
                                        return metric = d.metric_i2010;
                                    default:
                                        return metric = d.metric_icumulative;
                                }
                                return parseFloat(metric);
                            })
                        }
                    })
                    .entries(OutcomesData)
                    .map(function (d) {
                        var event = {};
                        var total = 0;
                        event['product_drugname'] = d.key;
                        var drugEvents = _.map(_.pluck(d.values, 'key'), removeExtraCharactersFromString);
                        d.values.map(function (dd) {
                            var metricvalue = dd.values.metric_value;
                            event['aedrug_id'] = dd.values.aedrug_id;
                            event[removeExtraCharactersFromString(dd.key)] = metricvalue;
                            if (metricvalue !== undefined ) {
                                total += parseFloat(metricvalue);
                            }
                        });
                        // Now Add that events that not come with data
                        var eventsToBeAdded = _.difference(exports.OutcomesHeaderData, drugEvents);
                        _.each(eventsToBeAdded, function (eventToBeAdded) {
                            event[removeExtraCharactersFromString(eventToBeAdded)] = -1;
                        });
                        event['Total'] = total;
                        return event;
                    });

            return _.sortBy(exports.OutcomesData, 'metric_value');
        }

        function OutcomesPivotDataHeader(OutcomeData) {
            return _.sortBy(_.map(
                    _.uniq(_.pluck(OutcomeData, 'outc_cod')), removeExtraCharactersFromString));
        }

        function getMinMaxOutcomesData() {
            var minMaxOutcomesData = {};
            var headers = angular.copy(exports.OutcomesHeaderData);
            headers.push("Total");
            _.each(headers, function (d) {
                minMaxOutcomesData[d + ".min"] = d3.min(_.pluck(exports.OutcomesData, d), function (d) {
                    return parseFloat(d);
                });
                minMaxOutcomesData[d + ".max"] = d3.max(_.pluck(exports.OutcomesData, d), function (d) {
                    return parseFloat(d);
                });
            });
            return minMaxOutcomesData;
        }

        function getOutcomeGridColumns() {
            var headers = angular.copy(exports.OutcomesHeaderData);
            var i = 9;
            var headerTemplate = '<div class="ngHeaderSortColumn test" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">'
            + '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter"'
            + 'popover="{{getTooltip(col.displayName)}}">'
            + '{{col.displayName | outcomesFilter }}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>'
            + '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>'
            + '<div class="ngSortPriority">{{col.sortPriority}}</div>'
            + '<div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div>'
            + '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';

            headers.push("Total");
            var headerOrder = {
                'CongentialAnomaly': 5,
                'Death': 2,
                'Disability': 3,
                'Hospitalization': 1,
                'LifeThreatening': 4,
                'Other': 7,
                'ReqdIntervention': 6,
                'Total': 8
            };
            var finalHeaders = [];
            var drugName = {
                field: 'product_drugname',
                width: '195px',
                visible: true,
                pinned: true,
                order: 0,
                displayName: 'Product Name(s)',
                cellTemplate: '<div class="ngCellText pull-left"><a ui-sref="drugs.detail.rxsignal({id:row.getProperty(\'aedrug_id\')})">{{row.getProperty(col.field)  | pascalCaseFilter }}</a></div>'
            };
            finalHeaders.push(drugName);
            _.each(headers, function (d) {
                var field = removeExtraCharactersFromString(d);
                var header = {
                    field: field,
                    width: '9%',
                    visible: true,
                    pinned: false,
                    order: headerOrder[field] ? headerOrder[field] : i++,
                    displayName: d,
                    headerCellTemplate: headerTemplate,
                    cellTemplate: '<div ng-class="{\'ngCellText\' : formatOutcomesRate(col.field, row.getProperty(col.field)) == \'ngCellText\',\'green\' : ' +
                    'formatOutcomesRate(col.field, row.getProperty(col.field)) == \'green\',\'red\' : formatOutcomesRate(col.field, row.getProperty(col.field)) ' +
                    '== \'red\'}"><p>{{row.getProperty(col.field) != undefined ? (row.getProperty(col.field) | incidenceFilterMetrics:{\'arg1\':\'d\', \'arg2\':6, \'arg3\':\'%\',\'arg4\':4}) : "-"}}</p></div>'
                };
                finalHeaders.push(header);
            });
            var sortedHeader = _.sortBy(finalHeaders, function (d) {
                return d.order;
            });
            var storageData = localStorageService.get($state.current.name + ".gridCols");
            if (!storageData) {
                localStorageService.set($state.current.name + ".gridCols", sortedHeader);
            } else {
                sortedHeader = localStorageService.get($state.current.name + ".gridCols");
            }
            return sortedHeader;
        }

        function removeExtraCharactersFromString(val) {
            if(val === undefined){
                return '';
            }
            var newVal = val.replace('-', '');
            return newVal;
        }

        function setCustomGridColumns(stateName, newColumns) {
            var storageId = stateName + exports.GRID_STORAGE_ID;
            localStorageService.set(storageId, angular.toJson(newColumns));
        }

        function getCustomGridColumns(stateName) {
            var storageId = stateName + exports.GRID_STORAGE_ID;
            var gridColumns = localStorageService.get(storageId);
            if (!gridColumns) {
                gridColumns = getOutcomeGridColumns();
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
