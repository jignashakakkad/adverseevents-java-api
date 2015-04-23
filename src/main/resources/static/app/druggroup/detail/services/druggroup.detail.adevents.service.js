(function () {
    'use strict';
    angular.module('druggroup.services').factory('drugGroupAdEventsService', ['$filter', 'localStorageService', DrugGroupAdEventsService]);
    function DrugGroupAdEventsService($filter, localStorageService) {

        var exports = {
            getAdverseEventPivotalTable: AdEventsPivotalData,
            getAdverseEventPivotalTableHeader: AdEventsPivotalDataHeader,
            getAdverseEventsGridColumns: getAdverseEventsGridColumns,
            getMinMaxData: getMinMaxData,
            getDataFilter: getDataFilter,
            getDataFilterArgs: getDataFilterArgs,
            setAdverseEventPivotalTableHeaderToCache: setAdverseEventPivotalTableHeaderToCache
        };

        exports.adverseData = [];
        exports.adverseDataHeader = [];
        exports.adverseMinMaxData = [];
        exports.datatypefield = '';
        exports.filter = '';
        exports.filterArgs = '';
        function AdEventsPivotalData(AdverseEventsData, datatype) {
            exports.adverseDataHeader = _.sortBy(_.uniq(_.pluck(AdverseEventsData, 'aedrug_label')));
            if (datatype === 'IR') {
                exports.datatypefield = "metric_value_incidence";
                exports.filter = 'incidenceFilterMetrics';
                exports.filterArgs = {arg1: "d", arg2: 6, arg3: "%", arg4: 4};
            } else if (datatype === 'ROR') {
                exports.datatypefield = "metric_value_ror";
                exports.filter = 'incidenceFilterMetrics';
                exports.filterArgs = {arg1: "d", arg2: 2, arg3: "f", arg4: 2};
            } else if (datatype === 'PS') {
                exports.datatypefield = 'metric_value_pscount';
                exports.filter = 'incidenceFilterMetrics';
                exports.filterArgs = {arg1: "d", arg2: 9};
            } else {
                exports.datatypefield = 'metric_value_incidence';
                exports.filter = 'incidenceFilterMetrics';
                exports.filterArgs = {arg1: "d", arg2: 6, arg3: "%", arg4: 4};
            }
            exports.filter = $filter(exports.filter);
            exports.adverseData = d3.nest()
                    .key(function (d) {
                        return d.termCode_label;
                    }).sortKeys(d3.ascending)
                    .key(function (d) {
                        return d.aedrug_label;
                    }).sortKeys(d3.ascending)
                    .rollup(function (leaves) {
                        var leave = {};
                        leave['aedrug_id'] = leaves[0].aedrug_id;
                        leave[exports.datatypefield] = d3.mean(leaves, function (d) {
                            return parseFloat(d[exports.datatypefield]) > 0 ? parseFloat(d[exports.datatypefield]) : 0;
                        });
                        leave['badge_aedrug_termCode'] = leaves[0].badge_aedrug_termCode;
                        leave['is_dme_serious'] = leaves[0].is_dme_serious;
                        return leave;
                    })
                    .entries(AdverseEventsData)
                    .map(function (d) {
                        var event = {};
                        event['event_name'] = d.key;
                        var drugs = _.pluck(d.values, 'key');
                        d.values.map(function (dd) {
                            var drug_name = dd.key.replace(/\s/g, '');
                            event[removeExtraCharactersFromString(drug_name)] = dd.values[exports.datatypefield];
                            event["badge_" + removeExtraCharactersFromString(drug_name)] = dd.values['badge_aedrug_termCode'];
                            event["is_dme_serious"] = dd.values['is_dme_serious'];
                        });
                        // Now Add that events that not come with data
                        var drugsToBeAdded = _.difference(exports.adverseDataHeader, drugs);
                        _.each(drugsToBeAdded, function (drugToBeAdded) {
                            event[removeExtraCharactersFromString(drugToBeAdded)] = -1;
                            event["badge_" + removeExtraCharactersFromString(drugToBeAdded)] = 0;
                        });
                        return event;
                    });
            var minMaxData = {};
            exports.adverseData.map(function (d) {
                minMaxData[d.event_name + '.min'] = d3.min(_.without(d3.values(d), d.event_name));
                minMaxData[d.event_name + '.max'] = d3.max(_.without(d3.values(d), d.event_name));
            });
            exports.adverseMinMaxData = minMaxData;
            return _.sortBy(exports.adverseData, exports.datatypefield);
        }

        function AdEventsPivotalDataHeader(AdverseEventsData) {
            exports.adverseDataHeader = _.sortBy(_.uniq(_.pluck(AdverseEventsData, 'aedrug_label')));
            return exports.adverseDataHeader;
        }

        function getDataFilterArgs() {
            return exports.filterArgs;
        }

        function getDataFilter() {
            return exports.filter;
        }

        function getMinMaxData() {
            return exports.adverseMinMaxData;
        }

        function getAdverseEventsGridColumns(drugGroupId, headers) {
            var columns = getAdverseEventPivotalTableHeaderFromCache(drugGroupId);
            if (headers !== null && headers !== undefined) {
                return filterAdverseEventPivotalTableHeaderFromCache(drugGroupId, columns, headers);
            }
            return columns;
        }

        function getInitialAdverseEventsGridColumns() {
            var headers = angular.copy(exports.adverseDataHeader);
            var finalHeaders = [];
            var eventNameCellTemplate = '<div class="ngCellText pull-left" ng-init="initRow(row);">{{row.getProperty(col.field) }}' +
                    '<span popover-append-to-body="true" popover="Designated Medical Event" popover-trigger="mouseenter" class=\'badge dme-badge-outcomes btn-danger active\' ng-show="row.getProperty(\'is_dme_serious\') == \'DME\'">DME</span>' +
                    '</div>' +
                    '<div ng-click="sortByMyPreference(row);">' +
                    '<div class="ngSortButtonDown" ng-show="{{row.down}}"></div>' +
                    '<div class="ngSortButtonUp" ng-show="{{row.up}}"></div>' +
                    '<div class="ngSortPriority">{{col.sortPriority}}</div></div>';
            var eventName = {
                field: 'event_name',
                width: '220',
                visible: true,
                pinned:true,
                displayName: 'Adverse Event(s)',
                cellTemplate: eventNameCellTemplate
            };

            // BADGES
            // DME: ng-show="row.getProperty('DME') == 'DME'"
            // RX: ng-show="row.getProperty('RX') == 'RX'"
            // WL: ng-show="row.getProperty('WL') == 'WL'"
            // NL: ng-show="row.getProperty('NL') == 'NL'"
            // the only ones we want to show NL for are the adverse events that aren't on label AND aren't RX or WL

            finalHeaders.push(eventName);
            var width = 10;
//            if (headers.length < 9) {
//                width = parseFloat(80 / (headers.length));
//            }
            var drugRateCellTemplate = '<div ng-class="{\'ngCellText\' : formatIncidenceRate(row.getProperty(\'event_name\'), row.getProperty(col.field)) == \'ngCellText\',\'green\' : formatIncidenceRate(row.getProperty(\'event_name\'), row.getProperty(col.field)) == \'green\',\'red\' : formatIncidenceRate(row.getProperty(\'event_name\'), row.getProperty(col.field)) == \'red\'}"><p>{{ row.getProperty(col.field) | incidenceFilterMetrics:dataFilterArgs}}' +
                    '<span popover-append-to-body="true" popover="RxSignal Active" popover-trigger="mouseenter" class=\'label label-danger ae-outcomes-labels pull-right\' ng-show="row.getProperty(\'badge_\'+ col.field) == \'RX\'">RX</span>' +
                    '<span popover-append-to-body="true" popover="RxSignal Watchlist" popover-trigger="mouseenter" class=\'label label-warning ae-outcomes-labels pull-right\' ng-show="row.getProperty(\'badge_\'+col.field) == \'WL\'">WL</span>' +
                    '<span popover-append-to-body="true" popover="Not On Label" popover-trigger="mouseenter" class=\'label label-default ae-outcomes-labels pull-right\' ng-show="row.getProperty(\'badge_\'+col.field) == \'NL\'">NL</span>' +
                    '</p></div>';
            _.each(headers, function (d) {
                var pascalFilter = $filter('pascalCaseFilter');
                var header = {
                    field: removeExtraCharactersFromString(d),
                    width: width + '%',
                    visible: true,
                    pinned:false,
                    displayName: pascalFilter(d, ''),
                    cellTemplate: drugRateCellTemplate
                };
                finalHeaders.push(header);
            });
            return finalHeaders;
        }
        function removeExtraCharactersFromString(val) {
            var newVal = val.trim().replace(/[^A-Z0-9]+/ig, "");
            return newVal;
        }

        function setAdverseEventPivotalTableHeaderToCache(drugGroupId, newColumns) {
//            var storageId = 'druggroup.adverseevents.grid.' + drugGroupId;
            localStorageService.set(drugGroupId, angular.toJson(newColumns));
        }

        function getAdverseEventPivotalTableHeaderFromCache(drugGroupId) {
//            var storageId = 'druggroup.adverseevents.grid.' + drugGroupId;
            var gridColumns = localStorageService.get(drugGroupId);
            if (gridColumns === null) {
                var columns = getInitialAdverseEventsGridColumns();
                localStorageService.set(drugGroupId, angular.toJson(columns));
            }
            return localStorageService.get(drugGroupId);
        }

        function filterAdverseEventPivotalTableHeaderFromCache(drugGroupId, gridColumns, headers) {
            var filteredHeaders = [];
//            var storageId = 'druggroup.adverseevents.grid.' + drugGroupId;
            filteredHeaders.push(_.where(gridColumns, {'field': 'event_name'})[0]);
            _.each(headers, function (header) {
                filteredHeaders.push(_.where(gridColumns, {'field': header})[0]);
            });
            localStorageService.set(drugGroupId, filteredHeaders);
            return filteredHeaders;
        }
        return exports;
    }
})();
