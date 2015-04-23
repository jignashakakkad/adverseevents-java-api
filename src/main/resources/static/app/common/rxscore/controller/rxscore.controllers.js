(function () {
    'use strict';
    var app = angular.module('common.rxscore');
    /**
     * @ngdoc controller
     * @name common.rxscore.controller:rxscoreDrugComparisonChartCtrl
     * @param {$scope} $scope $scope of AngularJs
     * @param {RxscoreModel} rxscoreModel object of RxscoreModel
     * @param {Object} rxScoreServiceCommon Rxscore Service to fetch data
     * @param {Object} rxscoreChartFactory Common service that contains basic configuration of chart.
     * @description When this controller loaded, it loads rxscore comparison charts for a druggroup.
     */
    app.controller('rxscoreDrugComparisonChartCtrl', function ($scope, rxscoreModel, rxScoreServiceCommon, rxscoreChartFactory) {
        var dta;
        var chartConfig = rxscoreChartFactory.BaseBarchartModel;
        $scope.categories = [];
        $scope.chartSeries = [];
        $scope.RxScoreModel = rxscoreModel;
        $scope.$on('termUpdated', function () {
            chartConfig.series = [];
            var seriesData;
            var url = rxscoreModel.getUrl();
            $scope.$on('countUpdated', function () {
                seriesData = rxscoreModel.getSeriesData();
                var scaleAdj = rxscoreModel.getScaleAdj();
                chartConfig.options.chart = {type: 'bar', height: scaleAdj, width: 720, borderColor: 'lightgrey', borderWidth: 2};
                var category_links = function (drugname) {
                    return $scope.categories[drugname];
                };
                chartConfig.xAxis = {
                    title: {
                        enabled: 'false'
                    },
                    labels: {
                        formatter: function () {
                            if (this.value === 'AVERAGE') {
                                return '<span class="h4">AVERAGE</span>';
                            }
                            var id = category_links(this.value);
                            return "<a href=\"#/drugs/detail/" + id + "/overview\">" + this.value + "<\/a>";
                        },
                        useHTML: true
                    }
                };
                chartConfig.title.text = "<a href='" + url + "' style='text-decoration: underline;'>" + rxscoreModel.getLabel() + "<\/a> RxScore Comparison";
                chartConfig.xAxis.categories = seriesData[0].categories;
                chartConfig.series = seriesData;
                rxscoreModel.setHeight(scaleAdj);
                rxscoreModel.setChartConfig(chartConfig);

            }, true);
            seriesData = highcharts_fetchData();
            //  $scope.chartConfig.xAxis.currentMin = 0;

        }, true);
        /**
         * @ngdoc method
         * @name common.rxscore.controller:rxscoreDrugComparisonChartCtrl#highcharts_fetchData
         * @methodOf common.rxscore.controller:rxscoreDrugComparisonChartCtrl
         * @returns {Array} Array of data for highcharts.
         * @description This method prepaares seris data for highcharts and returns that data in array.
         */
        function highcharts_fetchData() {
            var termCode = rxscoreModel.getVal();
            var thisDrug = rxscoreModel.getDrugName();
            var thisDrugscore = rxscoreModel.getDrugRxScore();
            var dta = [
                {name: 'RxScore', data: [], kount: 0, categories: []}
            ];
            var ttype = rxscoreModel.getType();
            if (!rxscoreModel.getRxScoreData()) {
                rxScoreServiceCommon.getScores(termCode, ttype)
                        .success(function (response) {
                            angular.forEach(response.list, function (d) {
                                if (d.qval) {
                                    dta[0].categories.push(d.qkey);
                                    $scope.categories[d.qkey] = d.aedrug_id;
                                    dta[0].data.push(setSeriesColor(d, thisDrugscore, thisDrug));
                                }
                            });
                            rxscoreModel.setSeriesData(dta);
                            rxscoreModel.setCount(response.list.length);
                            return dta;
                        });
                rxscoreModel.setSeriesData(dta);
                return dta;
            } else {
                angular.forEach(rxscoreModel.getRxScoreData().data.list, function (d) {
                    if (d.qval) {
                        dta[0].categories.push(d.qkey);
                        $scope.categories[d.qkey] = d.aedrug_id;
                        dta[0].data.push(setSeriesColor(d, thisDrugscore, thisDrug));
                    }
                });
                rxscoreModel.setSeriesData(dta);
                rxscoreModel.setCount(rxscoreModel.getRxScoreData().data.list.length);
                return dta;
            }
            return dta;
        }
        /**
         * 
         * @param {Object} d Rxscore data 
         * @param {Number} thisDrugscore drugscore to be compared
         * @param {String} thisDrug drug to be compared.
         * @returns {JSON} returns JSON of Series with color
         * @description This method returns series color according to the drugscore.
         */
        function setSeriesColor(d, thisDrugscore, thisDrug) {
            var this_RxScore = Math.abs(parseFloat(d.qval, 10).toFixed(2));
            var series = {name: d.qkey, id: d.aedrug_id, color: undefined, y: this_RxScore};
            if (this_RxScore > thisDrugscore) {
                series.color = 'red';
            } else if (d.qkey === thisDrug) {
                series.color = 'black';
            } else if (this_RxScore <= thisDrugscore) {
                series.color = 'green';
            }
            if (d.qkey === 'AVERAGE') {
                series.color = 'black';
            }
            return series;
        }

        return dta;
    });
    /**
     * @ngdoc controller
     * @name common.rxscore.controller:rxscoreDrugComparisonNavCtrl
     * @param {$scope} $scope $scope of AngularJs
     * @param {Object} rxscoreModel object of RxscoreModel
     * @param {Object} utilService UtilService
     * @param {$timeout} $timeout $timeout of AngularJs
     * @description This controller when intiates creates tree data that contains indications,mechanisms and drugclasses for the 
     * druggroup.
     */
    app.controller('rxscoreDrugComparisonNavCtrl', function ($scope, rxscoreModel, utilService, $timeout) {
        $scope.height = '600px';
        var utilFn = utilService;
        var indi = utilFn.collectionToArray(_.sortBy(rxscoreModel.getIndications(), 'sort_order'));
        var klasses = utilFn.collectionToArray(rxscoreModel.getDrugClasses());
        var mechanisms = utilFn.collectionToArray(rxscoreModel.getMechanisms());
        $scope.firstLoad = true;
        $scope.get_selected = function (branch) {
            var _ref;
            $scope.firstLoad = false;
            var out;
            if ((_ref = branch) != null ? _ref.id : void 0) {
                $scope.termId = branch.id;
                rxscoreModel.setType(branch.type);
                rxscoreModel.setLabel(branch.label);
                rxscoreModel.setVal($scope.termId);
            } else if ((_ref = branch) != null ? _ref.id : void 0) {
                $scope.termId = branch.id;
                rxscoreModel.setType(branch.type);
                rxscoreModel.setLabel(branch.label);
                rxscoreModel.setVal($scope.termId);
            } else if ((_ref = branch) != null ? _ref.id : void 0) {
                $scope.termId = branch.id;
                rxscoreModel.setType(branch.type);
                rxscoreModel.setLabel(branch.label);
                rxscoreModel.setVal($scope.termId);
            }

        };

        $scope.$on('heightUpdated', function () {
            return $scope.height = rxscoreModel.getHeight();
        });
        $scope.example_treedata = [{
                label: 'Indications',
                children: indi,
            }, {
                label: 'Classes',
                children: klasses,
            },
            {
                label: 'Mechanism of Action',
                children: mechanisms
            }];
        $scope.try_changing_the_tree_data = function () {
            return $scope.example_treedata;
        };
        var a = $scope.try_changing_the_tree_data();
        if ($scope.firstLoad === true) {
            $timeout(function () {
                angular.element('span.indented.tree-label.ng-binding:eq(1)').trigger('click');

            }, 100);
        }
    });
})();
