(function () {
  'use strict';

    angular
    .module('portfolio.detail')
    .factory('portfolioRxSignalSummaryService' , ['$window', '$state', 'localStorageService', 'portfolioService', 'companyChartService', portfolioRxSignalSummaryService]);

    function portfolioRxSignalSummaryService($window, $state, localStorageService, portfolioService, companyChartService) {

        //define variables
        var exports = {
            drawChart: drawChart,
            getRxSignalCount: getRxSignalCount
        };


        return exports;

        function getRxSignalCount(RxsignalSummaryData){
            return d3.round(d3.sum(_.map(_.pluck(portfolioService.getStripped(RxsignalSummaryData), 'metric_rxsignal_active'), function (d) {
                return Math.abs(d);
            })));
        }

        function drawChart(RxsignalSummaryData, summaryData){
            var cdata = portfolioService.getStripped(RxsignalSummaryData);
            var dataCopy = angular.copy(summaryData);
            var cfg = companyChartService.getRxsignalSummaryChart(summaryData.slice(0,8));
            c3.generate(cfg);
        }

    };
})();
