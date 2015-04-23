(function () {
    'use strict';
    angular.module('druggroup.services').factory('drugGroupRxSignalSummaryService', ['$state','localStorageService', DrugGroupRxSignalSummaryService]);

    function DrugGroupRxSignalSummaryService($state, localStorageService) {

        var colDefsDetail = [
            {
                field: 'product_drugname',
                cellClass: 'drugName',
                visible: true,
                displayName: 'Product Name(s)',
                cellTemplate: '<div class="ngCellText""><a ui-sref="drugs.detail.rxsignal({id:row.getProperty(\'aedrug_id\') })">{{row.getProperty(col.field) }}</a></div>'
            },
            {
                field: 'reac',
                width: '*',
                pinned: false,
                cellClass: "drugName",
                visible: true,
                displayName: 'Adverse Event',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{Tooltipper(col.displayName)}}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div class="ngCellText""><p>{{row.getProperty(col.field)}} <span popover-append-to-body="true" popover="Designated Medical Event" popover-trigger="mouseenter" class=\'badge dmeBadge btn-danger active\' ng-show="row.getProperty(\'DME\') == \'DME\'">DME</span></p></div>'},
            {
                field: 'RxSignal',
                width: '95', visible: true,
                displayName: 'RxSignal',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{Tooltipper(col.displayName)}}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'RxSignal\') == \'Not Active\',\'red\' : row.getProperty(\'RxSignal\') == \'Active\',\'yellow\' : row.getProperty(\'RxSignal\') == \'Watchlist\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
            {
                field: 'IME',
                width: '95',
                visible: false,
                displayName: 'IME Serious',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>', cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'IME\') == \'Not Serious\',\'red\' : row.getProperty(\'IME\') == \'Serious\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
            {
                field: 'DME',
                width: '66',
                visible: false,
                displayName: 'DME',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>', cellTemplate: '<div class= "ngCellText" ng-class="{\'green\' : row.getProperty(\'DME\') == \'Not DME\',\'red\' : row.getProperty(\'DME\') == \'DME\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
            {
                field: 'Disease_Related',
                width: 133,
                visible: false,
                displayName: 'Disease Related',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>', cellTemplate: '<div title="Disease Related" class="ngCellText" ng-class="{\'red\' : row.getProperty(\'Disease_Related\') == \'No\',\'green\' : row.getProperty(\'Disease_Related\') == \'Yes\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
            {
                field: 'On_Off',
                width: '95',
                visible: true,
                displayName: 'On Label',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'On_Off\') == \'Labeled\',\'red\' : row.getProperty(\'On_Off\') == \'Not Labeled\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
            {
                field: 'Section',
                visible: false,
                width: 110,
                displayName: 'Label Section',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'},
            {
                field: 'ROR',
                width: 69,
                cellFilter: 'number:2',
                visible: true,
                displayName: 'ROR',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="ToolTipper(col.displayName)">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
            },
            {
                field: 'PRR',
                width: 65,
                visible: false,
                cellFilter: 'number:2',
                displayName: 'PRR',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
            },
            {
                field: 'PS', cellFilter: 'number', visible: true, width: '99',
                displayName: 'Primary Suspect Cases',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
            },
            {
                field: 'PS_PCT', displayName: 'PS PCT', width: 66, cellFilter: 'pctg', visible: false,
                //cellTemplate: '<div class="ngCellText"  ">{{ row.getProperty(col.field) | number:2}}</div>'},
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div class="ngCellText"">{{row.getProperty(col.field)}}</div>'

            },
            {
                field: 'Total', visible: false, displayName: 'Total Cases', width: 100, cellFilter: 'number',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
            },
            {
                field: 'Total_PCT', displayName: 'Total PCT', width: 66, visible: false, cellFilter: 'pctg',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div class="ngCellText"">{{row.getProperty(col.field) }}</div>'
            },
            {
                field: 'metric_cumulativeIncidence', displayName: 'Incidence', width: '93', visible: true, cellFilter: "number:4",
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div title="Cumulative Incidence" class="ngCellText"><p>{{row.getProperty(col.field)|incidenceFilter}}</p></div>'
            }


        ];
        var colDefsSummary = [
            {
                field: 'product_drugnames',
                visible: true,
                width: 300,
                displayName: 'Product Name(s)',
                cellTemplate: '<div class="ngCellText"><a ui-sref="drugs.detail.rxsignal({id: row.getProperty(\'aedrug_id\')})">{{row.getProperty(col.field) | pascalCaseFilter}}</a></div>'
            },
            {
                field: "evaluate_productRevenue2013",
                displayName: "2013 Revenue",
                cellFilter: 'number:2',
                visible: true
            },
            {
                field: 'metric_rxsignal_active',
                displayName: 'Active RxSignal',
                cellFilter: 'number:0',
                visible: true
            },
            {
                field: 'metric_rxsignal_watchlist',
                displayName: 'Watchlist RxSignal',
                width: '160',
                cellFilter: 'number:0',
                visible: true
            },
            {
                field: 'metric_reac',
                displayName: 'Total (Active/Watchlist)',
                width: '180',
                cellFilter: 'number:0',
                visible: true
            },
            {
                field: 'ROR', width: 90,
                cellFilter: 'number:2',
                visible: true,
                displayName: 'Avg. ROR'
            },
            {
                field: 'PRR',
                visible: false,
                cellFilter: 'number:2',
                displayName: 'Avg. PRR'
            },
            {
                field: 'metric_rxsignal_ime',
                displayName: 'IME Serious',
                cellFilter: 'number:0',
                visible: false
            },
            {
                field: 'metric_rxsignal_dme',
                displayName: 'DME',
                cellFilter: 'number:0',
                visible: true
            }


        ];

        var fn = {
            pointSize: pointSize,
            bubbleSizes: bubbleSizes,
        }

        var exports = {
            getRxsignalSummaryChart: getRxsignalSummaryChart,
            setColumnDefForRxsignalGrid: setColumnDefForRxsignalGrid,
            getColumnDefForRxsignalGrid: getColumnDefForRxsignalGrid,
            resetColumnDefForRxsignalGrid: resetColumnDefForRxsignalGrid
        };

        return exports;

        ///////////////////////////

        function pointSize(sizeVal, sizes) {
            var Incidence = sizeVal;
            var MIN_incidence = d3.min(sizes);
            var MAX_incidence = d3.max(sizes);
            var qtl3 = d3.mean(sizes);
            var s = (((Incidence - MIN_incidence) * (50 - 10)) / (MAX_incidence - MIN_incidence));
            return (s - Math.floor(qtl3) > 3) ? s - Math.floor(qtl3) : 3;
        }
        ;

        function bubbleSizes(sizes) {
            var sizesArray = _.map(_.pluck(sizes, 'metric_rxsignal_active'), function (d) {
                return Math.abs(d);
            });
            var newSizes = [];
            sizes.forEach(function (size) {
                if (size.hasOwnProperty('product_drugnames')) {

                    var newSize = fn.pointSize(Math.abs(size['metric_rxsignal_ime']), sizesArray);
                    newSizes.push({'product_drugnames': size.product_drugnames, 'size': newSize});
                }
            });
            return newSizes;
        }
        ;

        function getRxsignalSummaryChart(RxsignalSummary) {
            var colorbrewer = {YlOrRd: {3: ["#ffeda0", "#feb24c", "#f03b20"], 4: ["#ffffb2", "#fecc5c", "#fd8d3c", "#e31a1c"], 5: ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"], 6: ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026"], 7: ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"], 8: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"], 9: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"]}};
            var data = RxsignalSummary;
            var columns = [];
            var mySize = {};
            var myXs = {};
            var myNames = [];
            var myPointColors = {};
            var myNameIndex = [];
            var myPointSizes = [];
            var i = 0;
            var myColors = colorbrewer.YlOrRd['9'].reverse();
            var myPts = bubbleSizes(data);
            data.forEach(function (d) {
                var myRor = [d.product_drugnames];
                var myPs = [d.product_drugnames + "_Primary Suspect"];
                myRor.push(d.ROR);
                myPs.push(d.metric_rxsignal_active);
                myNames.push(d.product_drugnames);
                myNameIndex[i] = d.product_drugnames;
                myPointColors[d.product_drugnames] = myColors[i];
                columns.push(myRor);
                columns.push(myPs);
                myXs[myRor[0]] = myPs[0];
                mySize[d.product_drugnames] = d.metric_rxsignal_active;
                myNameIndex[d.product_drugnames] = d.metric_rxsignal_active;
                myPointSizes.push = {'product_drugnames': d.product_drugnames, 'size': d.metric_rxsignal_active};
                i++;
            });

            var chart = {
                bindto: '#druggroup-rxsignal-bubblechart',
                size: {
                    height: 200
                },
                data: {
                    xs: myXs,
                    // iris data from R
                    columns: columns,
                    type: 'scatter',
                    colors: myPointColors
                },
                axis: {
                    x: {
                        label: 'Active RxSignal ADEs',
                        tick: {
                            fit: false
                        },
                        padding: {top: 200, left: 15, right: 5, bottom: 0}
                    },
                    y: {
                        label: 'ROR',
                        tick: {
                            fit: false,
                            format: function(d){
                                return d > 0 ? d : '';
                            }
                        },
                        padding: {top: 3, left: 5, right: 100, bottom: 10}
                    }
                },
                point: {
                    r: function (d) {

                        var pointSize = _.where(myPts, {'product_drugnames': d.id});
                        return pointSize[0].size;

                    },
                    focus: {
                        expand: {
                            enabled: false,
                            r: function (d) {
                                return d.r;
                            }
                        }

                    }
                },
                tooltip: {
                    format: {
                        title: function (d) {

                            return false;
                        },
                        name: function (name) {
                            return name;
                        },
                        value: function (value, id, x) {
                            var numFormat = d3.format(',');
                            var active_signals = mySize[x] > 0 ? mySize[x] : 0;
                            return '<tr colspan="2"><td>Active Signals</td><td>' + active_signals + '</td></tr>' + '<tr><td>Avg. ROR (Active)</td><td>' + numFormat(value) + '</td></tr>';
                        }
                    }
                }
            };
            return chart;
        }

        function getColumnDefForRxsignalGrid(gridname) {
            var colSet;
            var finalDef;
            if (gridname === 'detail') {
                try {
                    colSet = angular.fromJson(localStorageService.get($state.current.name+".gridCols"));
                    colSet = colSet[0] !== undefined && colSet[0].displayName === "Product Name(s)" ? colSet : colDefsDetail;
                } catch (err) {
                    colSet = colDefsDetail;
                }
                finalDef = _.extend(colDefsDetail, colSet);
            } else if (gridname === 'summary') {
                try {
                    colSet = angular.fromJson(localStorageService.get($state.current.name+".gridCols"));
                    colSet = colSet[0] !== undefined && colSet[0].displayName === "Product Name(s)" ? colSet : colDefsSummary;
                } catch (err) {
                    colSet = colDefsSummary;
                }
                finalDef =  colSet;
            }
            return finalDef;
        }

        function setColumnDefForRxsignalGrid(newcols, gridname) {
            if (gridname === 'detail') {
                localStorageService.set($state.current.name+".gridCols", angular.toJson(newcols));
            } else {
                localStorageService.set($state.current.name+".gridCols", angular.toJson(newcols));
            }
        }

        function resetColumnDefForRxsignalGrid(gridname) {
            if (gridname === 'detail') {
                localStorageService.set($state.current.name+".gridCols", angular.toJson(colDefsDetail));
                return colDefsDetail;
            } else {
                localStorageService.set($state.current.name+".gridCols", angular.toJson(colDefsSummary));
                return colDefsSummary;
            }
        }
    }
})();
