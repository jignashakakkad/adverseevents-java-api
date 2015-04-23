(function () {
    'use strict';
    angular.module('druggroup.services').factory('drugGroupCostService', ['$http', 'SERVER_SETTINGS', DrugGroupCostService]);
    function DrugGroupCostService($http, SERVER_SETTINGS) {
        var drugGroupName;
        var exports = {
            getCostChartConfig: getCostStackedColumnChart,
            getDrugGroupCosts: getDrugGroupCosts,
            setDrugGroupName: setDrugGroupName
        };

        return exports;

        ///////////////////////////////////////////////////

        function getDrugGroupCosts(drugGroupType, drugGroupId) {
            return $http({
                method: 'GET',
                url: SERVER_SETTINGS.BASE_URL + 'api/v1/' + drugGroupType + '/' + drugGroupId + '/costs/by/drug'
            });
        }

        function setDrugGroupName(name) {
            drugGroupName = name;
        }

        function getCostStackedColumnChart(series) {

            function costFilterPluck(costCollection, propertyName) {
                return _.chain(costCollection)
                    .filter(function (f) {
                        return Math.abs(f.metric_mean_patient_cost_rx) > 0 && Math.abs(f.metric_mean_patient_cost_rx) > 0;
                    })
                    .extend({sort_total: -1, y: -1})
                    .map(function(f){
                        f.sort_total = Math.abs(f.metric_mean_patient_cost_rx) + Math.abs(f.metric_drug_price_rx);
                        f.y = f.sort_total;
                        return f;
                    })
                    .sortByOrder(['sort_total'], [false])
                    .pluck(propertyName)
                    .take(10)
                    .value();
            }
            function findYAxisMin(series, pad) {
                var min, _pad, data;
                data = _.flatten(costFilterPluck(series, 'metric_drug_price_rx'),
                    costFilterPluck(series, 'metric_mean_patient_cost_rx'));
                min = d3.min(data);
                _pad = pad <= 1 && pad > 0 ? pad : 1;

                return min - (min * _pad);
            }

            function shapeCostData(costCollection) {

                return [
                    {
                        name: 'RxCost Per Prescription',
                        color: '#ef8a62',
                        data: costFilterPluck(series, 'metric_mean_patient_cost_rx'),
                    },
                    {
                        name: 'Retail Price Per Prescription (2014)',
                        color: '#1AADCE',
                        data: costFilterPluck(series, 'metric_drug_price_rx'),
                    }
                ];
            }

            return {
                options: {
                    chart: {
                        type: 'column'
                    },
                    tooltip: {

                        formatter: function () {
                            var format = d3.format("$,.2f");
                            var s = '<b>' + this.x + '</b>';
                            _.map(this.points, function(d) {
                                s+= ['<br/>',d.series.name,':',format(d.y)].join(" ");
                            });
                            return s;
                        },
                        shared: true
                    },
                    showInLegend: true,
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true,
                                format: '${y:,.2f}',
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black',
                                style: {
                                    fontWeight: 'bold',
                                    textShadow: '0 0 3px white'
                                },
                                y: -5
                            }
                        }
                    }
                },
                xAxis: {
                    categories: costFilterPluck(series, 'aedrug_label'),
                    title: {text: 'Drug'}
                },
                yAxis: {

                    min: findYAxisMin(series, 0.05),
                    //min: 0,
                    startOnTick: false,
                    minPadding: 0.1,
                    maxPadding: 0.01,
                    title: {
                        text: 'Total Cost Per Prescription'
                    }
                },
                tooltip: {
                    shared: true
                },
                title: {
                    text: drugGroupName + ' RxCost'
                },
                series: shapeCostData(series)
            };
        }
    }
})();
