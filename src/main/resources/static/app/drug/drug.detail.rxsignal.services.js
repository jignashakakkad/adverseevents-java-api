(function () {
    'use strict';

    angular
        .module('drugs')
        .factory('drugRxsignalService' , ['$http', '$window', '$state', 'localStorageService', drugRxsignalService]);

    function drugRxsignalService($http, $window, $state, localStorageService) {

        //define variables
        var exports = {
            getGridOptions: getGridOptions,
            getMenu: getMenu,
            getFormatCompare: getFormatCompare,
            localStorageClear: localStorageClear,
            setCustomGridColumns: setCustomGridColumns,
            getCustomGridColumns: getCustomGridColumns
        };

        exports.GRID_STORAGE_ID = ".gridCols";

        function getGridOptions() {
            var template = '<div ng-click="onClickRow(row)"  ng-style="{cursor: row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" '
            + 'class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div>'
            + '<div ng-cell></div></div>';

            var gridOptions = {
                data: 'myData',
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
                plugins: [new ngGridFlexibleHeightPlugin({"maxHeight": 500}), new ngGridCsvExportPlugin()]
            };

            return gridOptions;
        }

        function getMenu() {
            var menu = "<div class='btn-group-vertical btn-group-xs'><a class='btn btn-primary'>Compare by Class</button>"
            + "<a href='http://www.adverseevents.com/medradetail.php?mdr_term='+ +'&mdr_class=PT' "
            + "class='btn btn-danger'> Compare all</button></div>";

            return menu;
        }

        function getFormatCompare(reac, indi, klass) {
            var baseUrl = '';
            var byIndication = '/explorer/#/druggroup/indication/' + indi + '/adverseevents/IR';
            var byClass = '/explorer/#/druggroup/drugclass/' + klass + '/adverseevents/IR';
            var base = "<div class='btn-group-vertical btn-group-xs'>";

            base += "\n";
            base += "<a class='btn btn-primary btn-compare' href=" +  byIndication + " target='_blank'>";
            base += "Compare by Indication</a>";
            base += "\n";
            base += "<a class='btn btn-primary btn-compare' href=" +  byClass + " target='_blank'>";
            base += "Compare by Class</a>";
            base += "</div>";

            return base;
        }

        function localStorageClear(stateName) {
            if ($window.localStorage) {
                console.log('clear '+ stateName + exports.GRID_STORAGE_ID);
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

            var adverseEvent = {
                field: 'reac',
                width: '340',
                cellClass: "drugName",
                pinned: true,
                visible: true,
                displayName: 'Adverse Event',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div class="ngCellText""><p>{{row.getProperty(col.field)}}<span popover-append-to-body="true" popover="Designated Medical Event" '
                + 'popover-trigger="mouseenter" class=\'badge dmeBadge btn-danger active\' ng-show="row.getProperty(\'DME\') == \'DME\'">DME</span></p></div>'
            };
            var rxsignal = {
                field: 'RxSignal',
                width: '99',
                visible: true,
                displayName: 'RxSignal',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'RxSignal\') == \'Not Active\','
                + '\'red\' : row.getProperty(\'RxSignal\') == \'Active\',\'yellow\' : row.getProperty(\'RxSignal\') == \'Watchlist\' }">'
                + '<p>{{ row.getProperty(col.field) }}</p></div>'
            };
            var ime = {
                field: 'IME',
                width: '100',
                visible: false,
                displayName: 'IME',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'IME\') == \'Not Serious\','
                + '\'red\' : row.getProperty(\'IME\') == \'Serious\' }"><p>{{ row.getProperty(col.field) }}</p></div>'
            };
            var dme = {
                field: 'DME',
                width: '100',
                visible: false,
                displayName: 'DME',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div class= "ngCellText" ng-class="{\'green\' : row.getProperty(\'DME\') == \'Not DME\','
                + '\'red\' : row.getProperty(\'DME\') == \'DME\' }"><p>{{ row.getProperty(col.field) }}</p></div>'
            };
            var diseaseRelated = {
                field: 'Disease_Related',
                width: '133',
                visible: false,
                displayName: 'Disease Related',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div title="Disease Related" class="ngCellText" ng-class="{\'red\' : row.getProperty(\'Disease_Related\') == \'No\','
                + '\'green\' : row.getProperty(\'Disease_Related\') == \'Yes\' }"><p>{{ row.getProperty(col.field) }}</p></div>'
            };
            var onLabel = {
                field: 'On_Off',
                width: '125',
                visible: true,
                displayName: 'On Label',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'On_Off\') == \'Labeled\','
                + '\'red\' : row.getProperty(\'On_Off\') == \'Not Labeled\' }"><p>{{ row.getProperty(col.field) }}</p></div>'
            };
            var section = {
                field: 'Section',
                width: '110',
                visible: false,
                displayName: 'Label Section',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div class="ngCellText""><p ng-class="{\'text-center\' : row.getProperty(\'Section\') == \'N/A\' }">{{ row.getProperty(col.field) }}</p></div>'
            };
            var ror = {
                field: 'ROR',
                width: '65',
                visible: true,
                cellFilter: 'number:2',
                displayName: 'ROR',
                headerCellTemplate: headerTemplate
            };
            var prr = {
                field: 'PRR',
                width: '65',
                visible: false,
                cellFilter: 'number:2',
                displayName: 'PRR',
                headerCellTemplate: headerTemplate
            };
            var ps = {
                field: 'PS',
                width: '120',
                visible: true,
                cellFilter: 'number',
                displayName: 'Cases',
                headerCellTemplate: headerTemplate
            };
            var psPct = {
                field: 'PS_PCT',
                width: '66',
                visible: false,
                cellFilter: 'number:2',
                displayName: 'PS PCT',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div class="ngCellText"">{{row.getProperty(col.field) | incidenceFilter }}</div>'
            };
            var total = {
                field: 'Total',
                width: '100',
                visible: false,
                cellFilter: 'number',
                displayName: 'Total Cases',
                headerCellTemplate: headerTemplate
            };
            var totalPct = {
                field: 'Total_PCT',
                width: '66',
                visible: false,
                cellFilter: 'number:2',
                displayName: 'Total PCT',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div class="ngCellText"">{{row.getProperty(col.field) | incidenceFilter }}</div>'
            };
            var i2013 = {
                field: 'i2013',
                width: '93',
                visible: false,
                displayName: '2013 Incidence',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div title="2013 Incidence" class="ngCellText"><p>{{ row.getProperty(col.field) | incidenceFilter }}</p></div>'
            };
            var i2012 = {
                field: 'i2012',
                width: '93',
                visible: false,
                displayName: '2012 Incidence',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div title="2012 Incidence" class="ngCellText"><p>{{ row.getProperty(col.field) | incidenceFilter }}</p></div>'
            };
            var i2011 = {
                field: 'i2011',
                width: '93',
                visible: false,
                displayName: '2011 Incidence',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div title="2011 Incidence" class="ngCellText"><p>{{ row.getProperty(col.field)| incidenceFilter }}</p></div>'
            };
            var iCumulative = {
                field: 'iCumulative',
                width: '103',
                visible: true,
                displayName: 'Incidence',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div title="Cumulative Incidence" class="ngCellText"><p>{{ row.getProperty(col.field) | incidenceFilter }}</p></div>'
            };
            var termCode = {
                field: 'termCode',
                width: '237',
                visible: true,
                displayName: 'Compare',
                headerCellTemplate: headerTemplate,
                cellTemplate: '<div class="ngCellText text-center" popover-append-to-body="true" title="" popover-placement="right" '
                    + 'popover-trigger=\'click\' '
                    + 'popover-html-unsafe={{formatCompare(row.getProperty(\"reac\").toString(),Drug.indications[0].id,Drug.drugclasses[0].id)}}'
                    + '<button class="btn btn-xs btn-default"><i class="fa fa-table"></i></button></div>'
            };

            colDefsDetail.push(adverseEvent);
            colDefsDetail.push(rxsignal);
            colDefsDetail.push(ime);
            colDefsDetail.push(dme);
            colDefsDetail.push(diseaseRelated);
            colDefsDetail.push(onLabel);
            colDefsDetail.push(section);
            colDefsDetail.push(ror);
            colDefsDetail.push(prr);
            colDefsDetail.push(ps);
            colDefsDetail.push(psPct);
            colDefsDetail.push(total);
            colDefsDetail.push(totalPct);
            colDefsDetail.push(i2013);
            colDefsDetail.push(i2012);
            colDefsDetail.push(i2011);
            colDefsDetail.push(iCumulative);
            colDefsDetail.push(termCode);

            return colDefsDetail;
        }

        return exports;
    };
})();
