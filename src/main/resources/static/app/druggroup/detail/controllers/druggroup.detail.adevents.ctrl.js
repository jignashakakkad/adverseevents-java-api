(function () {
    'use strict';
    // AdverseEventCtrl
    angular.module('druggroup.detail').controller('DrugGroupAdEventsCtrl', ['$scope', '$rootScope', '$state','$stateParams', 'AdverseEvents', 'drugGroupService', 'drugGroupAdEventsService', DrugGroupAdEventsCtrl]);
    function DrugGroupAdEventsCtrl($scope, $rootScope, $state, $stateParams, AdverseEvents, drugGroupService, drugGroupAdEventsService) {
        $scope.AdEventsData = drugGroupAdEventsService.getAdverseEventPivotalTable(drugGroupService.getStripped(AdverseEvents), $stateParams.datatype);
        var id = $state.current.name + "." +$stateParams.id + ".gridCols";
        $scope.headers = drugGroupAdEventsService.getAdverseEventsGridColumns(id);
        $scope.adverseMinMaxData = drugGroupAdEventsService.getMinMaxData();
        $rootScope.dataFilterArgs = drugGroupAdEventsService.getDataFilterArgs();
        if ($stateParams.datatype === 'IR') {
            $scope.datatype = "Incidence Rate";
            $scope.datatype_label = "Rates";
        } else if ($stateParams.datatype === 'ROR') {
            $scope.datatype = "ROR";
            $scope.datatype_label = "ROR statistics";
        } else if ($stateParams.datatype === 'PS') {
            $scope.datatype = 'Case Count';
            $scope.datatype_label = "Case Counts";
        } else {
            $scope.datatype = 'Incidence Rate';
            $scope.datatype_label = "Rates";
        }
        $rootScope.formatIncidenceRate = function (event, value) {
            var minString = event + '.min';
            var maxString = event + '.max';
            var minVal = $scope.adverseMinMaxData[minString];
            var maxVal = $scope.adverseMinMaxData[maxString];
            if (minVal === value) {
                return 'green';
            } else if (maxVal === value) {
                return 'red';
            } else {
                return 'ngCellText';
            }
        }
        $scope.initRow = function(row){
            if(row['up'] !== undefined && row['down'] !== undefined) {
                row['up'] = !row['up'];
                row['down'] = !row['down'];
            } else {
                row['up'] = false;
                row['down'] = true;
            }
        }
        $scope.sortByMyPreference = function (row) {
            var rowEntity = row.entity;
            var tempdata = _.sortBy(d3.entries(rowEntity), function (d) {
                    if (_.isNumber(d.value)) {
                        return parseFloat(d.value);
                    }
                    return d.value;
            });
            var finalKeys = [];
            tempdata.map(function (d) {
                if(!d.key.indexOf('badge_') == 0 && !d.key.indexOf('is_dme_serious') == 0) {
                   finalKeys.push(d.key);
                }
            });
            if(row['up']) {
              finalKeys = finalKeys.reverse();
            }
            row['up'] = !row['up'];
            row['down'] = !row['down'];
            $scope.headers = drugGroupAdEventsService.getAdverseEventsGridColumns(id, _.without(finalKeys, 'event_name'));
        }
        $scope.title = 'Adverse Event ' + $scope.datatype_label + ' for ';
        $scope.adEventsGridOptions = {
            data: 'AdEventsData',
            enableSorting: true,
            enableColumnResize: true,
            showGroupPanel: true,
            enableCellGrouping: true,
            showColumnMenu: true,
            enablePinning: true,
            enableRowSelection: false,
            showFilter: true,
            jqueryUITheme: true,
            columnDefs: 'headers',
            formatIncidenceRate: $rootScope.formatIncidenceRate,
            plugins: [new ngGridFlexibleHeightPlugin({"maxHeight": 500}), new ngGridCsvExportPlugin()]
        };

        $scope.$on('ngGridEventColumns', function ($scope, newCols) {
            var config = [];
            angular.forEach(newCols, function (col) {
                config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'cellFilter', 'cellTemplate'));
            });
            // set to local storage...
            drugGroupAdEventsService.setAdverseEventPivotalTableHeaderToCache(id, config);
        });

        function ngGridFlexibleHeightPlugin(opts) {
            var self = this;
            self.grid = null;
            self.scope = null;
            self.init = function (scope, grid, services) {
                self.domUtilityService = services.DomUtilityService;
                self.grid = grid;
                self.scope = scope;
                var recalcHeightForData = function () {
                    setTimeout(innerRecalcForData, 1);
                };
                var innerRecalcForData = function () {
                    var gridId = self.grid.gridId;
                    var footerPanelSel = '.' + gridId + ' .ngFooterPanel';
                    var extraHeight = self.grid.$topPanel.height() + $(footerPanelSel).height();
                    var naturalHeight = self.grid.$canvas.height() + 2;
                    if (opts != null) {
                        if (opts.minHeight != null && (naturalHeight + extraHeight) < opts.minHeight) {
                            naturalHeight = opts.minHeight - extraHeight - 2;
                        }
                        if (opts.maxHeight != null && (naturalHeight + extraHeight) > opts.maxHeight) {
                            naturalHeight = opts.maxHeight;
                        }
                    }

                    var newViewportHeight = naturalHeight + 20;
                    if (!self.scope.baseViewportHeight || self.scope.baseViewportHeight !== newViewportHeight) {
                        self.grid.$viewport.css('height', newViewportHeight + 'px');
                        self.grid.$root.css('height', (newViewportHeight + extraHeight) + 'px');
                        self.scope.baseViewportHeight = newViewportHeight;
                        self.domUtilityService.RebuildGrid(self.scope, self.grid);
                    }
                };
                self.scope.catHashKeys = function () {
                    var hash = '',
                            idx;
                    for (idx in self.scope.renderedRows) {
                        hash += self.scope.renderedRows[idx].$$hashKey;
                    }
                    return hash;
                };
                self.scope.$watch('catHashKeys()', innerRecalcForData);
                self.scope.$watch(self.grid.config.data, recalcHeightForData);
            };
        }
    }

})();
