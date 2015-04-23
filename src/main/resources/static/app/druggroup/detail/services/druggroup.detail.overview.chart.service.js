(function () {
    'use strict';
    angular.module('druggroup.services').factory('DrugGroupOverviewChartService', DrugGroupOverviewChartService);
    function DrugGroupOverviewChartService() {
        var exports = {
            getTimeline: getTimeline
        };
        return exports;
        function getTimeline(Timeline, drugGroupName) {
            var psData = {name: drugGroupName + ' Primary Suspect Reports', id: 'ps', data: [], type: 'area'};
            var otherData = {name: drugGroupName + ' All Suspect Reports', id: 'other', data: [], type: 'area', visible: false};
            var c = [];
            angular.forEach(Timeline, function (d) {
                c.push(d);
            });
            var tsSuspect = _.where(_.toArray(c), {'role_cod': 'PS'});
            var tsOther = _.where(_.toArray(c), {'role_cod': 'SS'});
            angular.forEach(tsSuspect, function (d) {
                if (d.date_int !== '20140100') {
                    psData.data.push([Date.UTC(d.fda_year, d.fda_month - 1, 1), Math.abs(d.total)]);
                }
            });
            angular.forEach(tsOther, function (d) {
                if (d.date_int !== '20140100') {
                    otherData.data.push([Date.UTC(d.fda_year, d.fda_month - 1, 1), Math.abs(d.total)]);
                }
            });
            var chartConfig = {
                options: {
                    chart: {
                        zoomType: 'x', legend: {
                            enabled: false
                        }
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                                stops: [
                                    [0, 'white'],
                                    [1, 'rgba(219,132,61,0)']
                                ]
                            },
                            stacking: 'normal',
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
                        }

                    },
                    tooltip: {
                        shared: true,
                        crosshairs: true,
                        valueSuffix: ' cases'
                    }
                },
                xAxis: {
                    type: 'datetime',
                    maxZoom: 210 * 24 * 3600000
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' cases'
                },
                yAxis: {
                    title: {
                        text: 'Total Reports'
                    },
                    min: 1,
                    startOnTick: false,
                    showFirstLabel: false
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                            'Click and drag in the plot area to zoom in' :
                            'Drag your finger over the plot to zoom in'
                },
                series: [psData, otherData],
                title: {
                    text: drugGroupName + ' FAERS Report Timeline'
                },
                loading: false
            };
            return chartConfig;
        };

        
    }
})();