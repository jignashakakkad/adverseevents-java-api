(function () {
    'use strict';

    // RxScoreCtrl
    angular.module('druggroup.detail').controller('DrugGroupRxscoreCtrl', ['$controller', '$rootScope', '$scope', 'drugGroupService','RxscoreData', 'RxscoreModel',DrugGroupRxscoreCtrl]);
    function DrugGroupRxscoreCtrl($controller, $rootScope, $scope, drugGroupService, RxscoreData, RxscoreModel) {

        $scope.rowItems = RxscoreData.data.list;
        var groupPoint = d3.mean(_.pluck($scope.rowItems, 'qval'));
        var rxScoreModel = new RxscoreModel($rootScope);
        $controller('rxscoreDrugComparisonChartCtrl', {$scope: $scope, rxscoreModel: rxScoreModel});
        rxScoreModel.setLabel($scope.DrugGroup.dimLabel);
        rxScoreModel.setRxScoreData(angular.copy(RxscoreData));
        rxScoreModel.setDrugRxScore(groupPoint);
        rxScoreModel.setVal($scope.DrugGroup.dimCode);
        
        $scope.title = 'Rxscore Control';
        $scope.rxscoreGridHeader = [];
        $scope.rankHeaderString = '(by RxScore, 1 = Safest)';
        $scope.is_enabled = $scope.rowItems.length >= 1;


//
//        console.log('GROUP POINT ' + groupPoint);
//        //TODO move to a independent .chart.service.js file
//        angular.forEach(RxscoreData.data.list, function (d) {
//            if (d.qval) {
//                dta[0].categories.push(d.qkey);
//                var this_RxScore = Math.abs(parseFloat(d.qval, 10).toFixed(2));
//                $scope.categories[d.qkey] = d.aedrug_id;
//                var series = {name: d.qkey, id: d.aedrug_id, color: 'grey', y: this_RxScore};
//
//                if (this_RxScore > groupPoint) {
//                    series.color = 'red';
//                } else if (this_RxScore <= groupPoint) {
//                    series.color = 'green';
//                }
//                if (d.qkey === 'AVERAGE') {
//                    series.color = 'black';
//                }
//                dta[0].data.push(series);
//            }
//            return dta;
//        });
//
//        $scope.chartConfig = {
//            options: {
//                chart: {
//                    type: 'bar',
//                    borderColor: 'lightgrey',
//                    borderWidth: 2
//                }
//            },
//            xAxis: {
//                labels: {
//                    formatter: function () {
//                        if (this.value === 'AVERAGE') {
//                            return '<span class="h4">AVERAGE</span>';
//                        }
//                        return '<a href="#/drugs/detail/' + $scope.categories[this.value] + '/overview">' +
//                                this.value + '</a>';
//                    },
//                    useHTML: true
//                },
//                categories: dta[0].categories
//            },
//            yAxis: {
//                title: {
//                    text: 'RxScore'
//                }
//            },
//            legend: {
//                enabled: false
//            },
//            // Added @dbogart fix to get these showing - still not showing drug names.
//            series: [{
//                    showInLegend: false,
//                    name: 'RxScore',
//                    data: dta[0].data
//                }],
//            title: {
//                text: 'RxScore Comparison',
//                enabled: false
//            },
//            credits: {
//                enabled: false
//            },
//            exporting: {
//                enabled: false
//            },
//            loading: false
//        };
//
//        // this dynamically sets the height based on number of drugs in the obj - maybe not needed anymore here.
//        ct = $scope.rowItems.length;
//
//        if (ct < 15) {
//            scaleAdj = 430;
//        } else {
//            scaleAdj = ct * 35;
//        }
//        var category_links = function (drugname) {
//            return $scope.categories[drugname];
//        };
//
//        $scope.chartConfig.options.chart = {type: 'bar', height: scaleAdj, borderColor: 'lightgrey', borderWidth: 2};

    }

})();
