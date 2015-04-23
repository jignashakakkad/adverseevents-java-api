(function () {
    'use strict';
    angular.module('druggroup.services').factory('drugGroupOutcomesService', [DrugGroupOutcomesService]);
    function DrugGroupOutcomesService() {
        var exports = {
            getOutcomePivotTable: OutcomesPivotData,
            getOutcomePivotTableHeader: OutcomesPivotDataHeader,
            getOutcomesGridColumns: getOutcomesGridColumns,
            getMinMaxOutcomesData: getMinMaxOutcomesData
        };

        exports.OutcomesData;
        exports.OutcomesHeaderData;
        function OutcomesPivotData(OutcomesData) {
            exports.OutcomesHeaderData = exports.getOutcomePivotTableHeader(OutcomesData);
            exports.OutcomesData = d3.nest()
                    .key(function (d) {
                        return d.product_drugname;
                    })
                    .sortKeys(d3.ascending)
                    .key(function (d) {
                        return d.outc_label;
                    })
                    .sortKeys(d3.ascending)
                    .rollup(function (leaves) {
                        return {
                            "aedrug_id": leaves[0].aedrug_id, "metric_value": d3.mean(leaves, function (d) {
                                return parseFloat(d.metric_icumulative);
                            })
                        }
                    })
                    .entries(OutcomesData)
                    .map(function (d) {
                        var event = {};
                        var total = 0;
                        event['drug_name'] = d.key;
                        var drugEvents = _.map(_.pluck(d.values, 'key'), removeExtraCharactersFromString);
                        d.values.map(function (dd) {
                            var metricvalue = dd.values.metric_value;
                            event['aedrug_id'] = dd.values.aedrug_id;
                            event[removeExtraCharactersFromString(dd.key)] = metricvalue;
                            if (metricvalue !== undefined) {
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
                    _.uniq(_.pluck(OutcomeData, 'outc_label')), removeExtraCharactersFromString));
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

        function getOutcomesGridColumns() {
            var headers = angular.copy(exports.OutcomesHeaderData);
            var i = 9;
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
                field: 'drug_name',
                cellClass: 'drugName',
                width: '23%',
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
                    width: '11%',
                    visible: true,
                    pinned: false,
                    order: headerOrder[field] ? headerOrder[field] : i++,
                    displayName: d,
                    cellTemplate: '<div ng-class="{\'ngCellText\' : formatOutcomesRate(col.field, row.getProperty(col.field)) == \'ngCellText\',\'green\' : ' +
                            'formatOutcomesRate(col.field, row.getProperty(col.field)) == \'green\',\'red\' : formatOutcomesRate(col.field, row.getProperty(col.field)) ' +
                            '== \'red\'}"><p>{{ row.getProperty(col.field) | incidenceFilterMetrics:{\'arg1\':\'d\', \'arg2\':6, \'arg3\':\'%\',\'arg4\':4} }}</p></div>'
                };
                finalHeaders.push(header);
            });
            var sortedHeader = _.sortBy(finalHeaders, function (d) {
                return d.order;
            });
            return sortedHeader;
        }

        function removeExtraCharactersFromString(val) {
            var newVal = val.replace('-', '');
            return newVal;
        }
        return exports;
    }
})();
