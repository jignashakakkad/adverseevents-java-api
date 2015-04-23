(function () {
  'use strict';

    angular
    .module('portfolio.detail')
    .factory('portfolioOverviewService' , ['$window', '$state', 'localStorageService', 'portfolioService', 'companyChartService', portfolioOverviewService]);

    function portfolioOverviewService($window, $state, localStorageService, portfolioService, companyChartService) {

        //define variables
        var exports = {
            formatRxscore:formatRxscore,
            getOverviewData: getOverviewData,
            getMinMaxData: getMinMaxData
        };

        return exports;

        function formatRxscore(score) {
            var colors = ['green', 'yellow', '#CD7D0F', 'red'];
            var thresholds = [47.17, 55.81, 61.83, 82.83];
            var s = Math.abs(parseInt(score));
            if (s >= thresholds[2]) {
                return colors[3];
            } else if (s >= thresholds[1]) {
                return colors[2];
            } else if (s >= thresholds[0]) {
                return colors[1];
            } else if (s >= 1) {
                return colors[0];
            } else {
                return 'grey';
            }
        }

        function getMinMaxData(event_name, value, dataSet) {
            var minMaxData = [];
            var min = event_name + '.min';
            var max = event_name + '.max';

            minMaxData[min] = d3.min(_.without(d3.values(dataSet), event_name));
            minMaxData[max] = d3.max(_.without(d3.values(dataSet), event_name));
            minMaxData.push(minMaxData[min]);
            minMaxData.push(minMaxData[max]);

            var minVal = minMaxData[min];
            var maxVal = minMaxData[max];

            if (minVal === value) {
                return 'green';
            } else if (maxVal === value) {
                return 'red';
            } else {
                return 'ngCellText';
            }
        }

        function getOverviewData(params, Revenues, DrugOverviewData, CompanyOverviewData) {
            var drugChart = companyChartService.getOverviewChart(Revenues.slice(0, 8));

            // add new service function for company chart when data is ready
            var companyChart = companyChartService.getCompanyChart(portfolioService.getStripped(CompanyOverviewData));

            var companyData = {
                stateName: 'Company Overview',
                chartTitle: 'Top 8 Companies by Total Product Revenue',
                gridTitle: 'Companies',
                gridModel: 'portfolioCompanyOverview',
                chartConfig: companyChart,
                currentState: 'portfolio.detail.overview.company',
                dataModel: CompanyOverviewData
            };
            var drugOverviewData = {
                stateName: 'Drug Overview',
                chartTitle: 'Top 8 Drugs by 2014 Revenue',
                gridTitle: 'Products',
                gridModel: 'portfolioDrugOverview',
                chartConfig: drugChart,
                currentState: 'portfolio.detail.overview.drug-overview',
                dataModel: DrugOverviewData
            };
            var drugDetailData = {
                stateName: 'Drug Detail',
                chartTitle: 'Top 8 Drugs by 2014 Revenue',
                gridTitle: 'Products',
                gridModel: 'portfolioDrugOverview',
                chartConfig: drugChart,
                currentState: 'portfolio.detail.overview.drug-detail',
                dataModel: Revenues
            };

            switch (params) {
                case 'company':
                    return companyData;
                case 'drug-overview':
                    return drugOverviewData;
                case 'drug-detail':
                    return drugDetailData;
                default:
                    return companyData;
            }
        }

    };
})();
