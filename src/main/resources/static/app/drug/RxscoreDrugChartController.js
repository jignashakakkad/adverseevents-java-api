angular.module('drugs').controller('rxscoreDrugComponentsChartCtrl', function ($scope, Drug, termService, rxScoreService, $window) {

    $scope.Drug = Drug[0];

    $scope.highcharts_fetchComponents = function () {
        var termCode = termService.getVal();
        var termLabel = termService.getLabel();
        var dta = [
            {name: 'Average RxScore Component in: ' + termLabel, data: [], color: 'steelblue' }
        ];
        var ttype = termService.getType();
        $scope.categories = [];
        rxScoreService.getComponents(termCode, ttype)
            .success(function (response) {
                dta[0].data = response.list.map(function (d) {
                    $scope.categories.push(d.qkey);

                    var this_RxScore = parseFloat(d.qval, 10).toFixed(2);
                    return {name: d.qkey, color: 'steelblue', y: Math.abs(this_RxScore) };
                });
            });

        return dta;
    };

    $scope.$on('termUpdated', function () {
        $scope.chartSeries = [];
        $scope.chartConfig.series = [];

        $scope.chartConfig.yAxis = 0;
        $scope.chartConfig.series = $scope.highcharts_fetchComponents();
        $scope.chartConfig.xAxis.categories = $scope.categories;
        $scope.addSeries();

    }, true);

    $scope.addSeries = function () {
        var rnd = [
            {name: $scope.Drug.aedrug_name + ' RxScore Component', data: [], color: 'black'}
        ];

        angular.forEach($scope.Drug.rxscore.components, function (q) {
            if (q[0] !== 'rxscore') {

                rnd[0].data.push({name: q.component, color: 'black', y: Math.abs(q.val) });
            }
        });

        $scope.chartConfig.series.push(rnd[0]);

    };

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'bar',
                height: 430,
                width: 720,
                borderColor: 'lightgrey',
                borderWidth: 2
            },
            plotOptions: {
                series: {
                    stacking: '',
                    negativeColor: 'red',
                    color: 'steelblue'
                }
            }
        },
        xAxis: {
            title: {
                text: 'Component'
            },
            categories: $scope.categories


        },
        yAxis: {
            title: {
                text: 'Value'
            }
        },
        legend: {
            enabled: false
        },
        series: $scope.chartSeries,
        title: {
            text: $scope.Drug.aedrug_name + ' Indication Components'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },

        loading: false
    };






});
/**
angular.module('drugs').controller('rxscoreDrugComparisonChartCtrl',function($scope, Drug, termService, rxScoreService){
    var dta;
    $scope.Drug = Drug[0];
    var thisDrugscore = Math.abs($scope.Drug.rxscore.score);

    $scope.categories = [];
    $scope.highcharts_fetchData = function () {
        var termCode = termService.getVal();
        var thisDrug = $scope.Drug.aedrug_name;

        var thisDrugscore = $scope.Drug.rxscore.value;
        var dta = [
            {name: 'RxScore', data: [], kount: 0, categories: []}
        ];
        var ttype = termService.getType();

        rxScoreService.getScores(termCode, ttype)
            .success(function (response) {

                termService.setKount(response.list.length);
                angular.forEach(response.list, function (d) {
                    if (d.qval) {
                        dta[0].categories.push(d.qkey);
                        var this_RxScore = Math.abs(parseFloat(d.qval, 10).toFixed(2));
                        $scope.categories[d.qkey] = d.aedrug_id;
                        var series = {name: d.qkey, id: d.aedrug_id, color: undefined, y: this_RxScore};

                        if (this_RxScore > thisDrugscore) {
                            series.color = 'red';
                        } else if (d.qkey === thisDrug) {
                            series.color = 'black';
                        } else if (this_RxScore <= thisDrugscore) {
                            series.color = 'green';
                        }
                        //console.log("color: " + series.color + ", this_RxScore: " + this_RxScore + ", thisDrugscore: " + thisDrugscore);
                        dta[0].data.push(series);

                    }
                });

                return dta;
            });
        return dta;
    };
    $scope.$on('termUpdated', function () {
        $scope.chartSeries = [];
        $scope.chartConfig.series = [];
        var ct;
        var t = termService.getType();
        var url;
        var seriesData = $scope.highcharts_fetchData();

        if (t === 'I') {
            url = '#/druggroup/indication/"' + termService.getVal() + '/detail/overview';
        } else if (t === 'C') {
            url = '#/druggroup/drugclass/"' + termService.getVal() + '/detail/overview';
        } else if (t === 'M') {
            url = '#/druggroup/mechanism/"' + termService.getVal() + '/detail/overview';
        }

        $scope.$on('countUpdated', function () {
            var ct = termService.getKount();
            var scaleAdj;
            var code = termService.getVal();
            var t = termService.getType();

            if (ct < 15) {
                scaleAdj = 430;
            } else {
                scaleAdj = ct * 35;
            }
            $scope.chartConfig.options.chart = {type: 'bar', height: scaleAdj, width: 720, borderColor: 'lightgrey', borderWidth: 2 };
            var category_links = function (drugname) {
                return $scope.categories[drugname];
            };
            $scope.chartConfig.xAxis = {
                title: {
                    enabled: 'false'
                },
                labels: {
                    formatter: function () {

                        var id = category_links(this.value);
                        return "<a href=\"#/drugs/detail/" + id + "/overview\">" + this.value + "<\/a>";

                    },
                    useHTML: true
                }
            };
            $scope.chartConfig.title.text = "<a href='" + url + "' style='text-decoration: underline;'>" + termService.getLabel() + "<\/a> RxScore Comparison";
            // $scope.chartConfig.xAxis.currentMax = ct - 1;
            $scope.chartConfig.xAxis.categories = seriesData[0].categories;
            $scope.chartConfig.series = seriesData;
            termService.setHeight(scaleAdj);
        }, true);

        //  $scope.chartConfig.xAxis.currentMin = 0;

    }, true);
    $scope.chartConfig = {
        options: {
            chart: {
                type: 'bar',
                height: 600,
                width: 720,
                borderColor: 'lightgrey',
                borderWidth: 2

            },
            plotOptions: {
                series: {
                    stacking: '',
                    negativeColor: 'red',
                    color: 'black'
                }
            }
        },
        xAxis: {
            title: {
                text: 'Drug'
            },
            categories: []

        },
        yAxis: {
            title: {
                text: 'RxScore'
            }

        },
        legend: {
            enabled: false
        },
        series: $scope.chartSeries,
        title: {
            text: 'An RxScore Comparison'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        loading: false
    };
    return dta;
});

angular.module('drugs').controller('rxscoreDrugComparisonNavCtrl', function ($scope, Drug, rxScoreService, utilService, termService, $timeout) {
    $scope.Drug = Drug[0];
    $scope.height = '600px';

    var utilFn = utilService;

    var indi = utilFn.collectionToArray(_.sortBy($scope.Drug.indications, 'sort_order'));
    var klasses = utilFn.collectionToArray($scope.Drug.drugclasses);

    var mechanisms = utilFn.collectionToArray($scope.Drug.mechanisms);



    $scope.firstLoad = true;
    $scope.get_selected = function (branch) {
        var _ref;
        $scope.firstLoad = false;
        var out;
        if ((_ref = branch) != null ? _ref.id : void 0) {
            $scope.termId = branch.id;

            termService.setType(branch.type);
            termService.setLabel(branch.label);
            termService.setVal($scope.termId);
        } else if ((_ref = branch) != null ? _ref.id : void 0) {
            $scope.termId = branch.id;
            termService.setType(branch.type);
            termService.setLabel(branch.label);
            termService.setVal($scope.termId);
        } else if ((_ref = branch) != null ? _ref.id : void 0) {
            $scope.termId = branch.id;
            termService.setType(branch.type);
            termService.setLabel(branch.label);
            termService.setVal($scope.termId);
        }

    };

    $scope.$on('heightUpdated', function () {
        return $scope.height = termService.getHeight();
    });

    $scope.example_treedata = [
        {
            label: 'Indications',
            children: indi
        },
        {
            label: 'Classes',
            children: klasses
        },

        {
            label: 'Mechanism of Action',
            children: mechanisms
        }
    ];
    $scope.try_changing_the_tree_data = function () {

        return $scope.example_treedata;
    };

    $scope.try_changing_the_tree_data();
    if ($scope.firstLoad === true) {
        //console.log('This is in firstLoad');

        $timeout(function () {
            angular.element('span.indented.tree-label.ng-binding:eq(1)').trigger('click');

        }, 100);
    }
});
**/