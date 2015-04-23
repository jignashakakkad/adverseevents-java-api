angular.module('drugclass').controller('DrugclassOverviewCtrl', function ($scope, $filter, Drugclass, Metrics, Regulatory, Restangular, Timeline) {

    $scope.Drugclass = Restangular.copy(Drugclass[0]);
    $scope.Metrics = Restangular.copy(Metrics[0]);
    $scope.Timeline = Timeline;

    $scope.indicationsArray = _.toArray(Drugclass[0].indications);


    var getTimeline = function () {
        $scope.tsData = [];
        $scope.psData = {name: ' Primary Suspect Reports', id: 'ps',data:[], type: 'area'};
        $scope.otherData = {name: ' All Suspect Reports', id: 'other', data:[], type: 'area', visible: false};

        var ps = [];
        var ss = [];
        var c = [];
        angular.forEach($scope.Timeline, function (d) {
            c.push(d);
        });

        var tsSuspect = _.where(_.toArray(c), {'role_cod': 'PS'});
        var tsOther = _.where(_.toArray(c), {'role_cod': 'SS'});
        angular.forEach(tsSuspect, function (d) {

            if (d.date_int != '20140100') {
                $scope.psData.data.push([Date.UTC(d.fda_year, d.fda_month - 1, 1), Math.abs(d.total)]);
            }
        });
        angular.forEach(tsOther, function (d) {

            if (d.date_int != '20140100') {
                $scope.otherData.data.push([Date.UTC(d.fda_year, d.fda_month - 1, 1), Math.abs(d.total)]);
            }
        });
        $scope.chartConfig = {
            options: {
                chart: {
                    zoomType: 'x', legend: {
                        enabled: false
                    }

                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, Highcharts.getOptions().colors[2]],
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
                tooltip:{
                    shared: true,
                    crosshairs: true,
                    valueSuffix: ' cases'
                }
            },
            xAxis: {
                type: 'datetime',
                maxZoom: 210 * 24 * 3600000
            },
            tooltip:{
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
            series: [$scope.psData, $scope.otherData],
            title: {
                text:' FAERS Report Timeline'
            },
            loading: false
        };


    };

    getTimeline();


    $scope.max_date_received = '2014/04/30';
    $scope.showQuantity = 5;
    $scope.showText = 'Show All';

    $scope.showAll = function () {
        $scope.showQuantity = $scope.showQuantity === 5 ? 300 : 5;
        $scope.showText = $scope.showQuantity === 5 ? 'show all' : 'show less';
    };


    if (typeof($scope.dateData) !== 'array') {
        $scope.dateData = {};
        $scope.dateData.max_date_received = '2013/09/30';
    }


});