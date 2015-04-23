(function () {
  'use strict';

    angular
    .module('portfolio.detail')
    .factory('portfolioDrugclassService' , ['$window', '$state', 'localStorageService', 'portfolioService', portfolioDrugclassService]);

    function portfolioDrugclassService($window, $state, localStorageService, portfolioService) {

        //define variables
        var exports = {
            mapRxScoreRxSignal: mapRxScoreRxSignal,
            finalizeScoreSignal: finalizeScoreSignal,
            reduceScoreSignal: reduceScoreSignal,
            getGridData: getGridData
        };

        exports.GRID_STORAGE_ID = ".gridCols";

        return exports;

        //input the subset of DrugclassData['products_scored'](array)
        //iterates over these values, and looks up the rxsignal summary data by the aedrug_id in input and returns the RxsignalSummary data for those
        function mapRxScoreRxSignal(dimLabel, summary_data) {

            var dimType;
            var _products = [];
            if (summary_data === null || summary_data === 0) {
                return false;
            }

            dimType = 'class_drugclas';
            _products = (_.where(summary_data, {'class_drugclass': dimLabel}).length === 0) ? [] : _.where(summary_data, {'class_drugclass': dimLabel});
            return _products;
        };

        //input the subset of DrugclassData
        //basically this is a LEFT JOIN with GROUP BY and SUM and AVG
        function finalizeScoreSignal(tset){
            var totalDrugs = 1, totalSignals = 0, totalPS = 0,totalRor = [0], avgRor = 0.00, pctOverall = 0;

            angular.forEach(tset,function(d){
                    totalPS += d.metric_rxsignal_pscount;
                totalDrugs += 1;
                    totalSignals += d.metric_rxsignal_active;
                    totalRor.push(d.metric_rxsignal_avg_ror);



            });

            return {
                'metric_reduced_pscount': totalPS,
                'metric_reduced_totaldrugs': totalDrugs,
                'metric_reduced_totalsignals': totalSignals,
                'metric_reduced_avg_ror': (d3.mean(totalRor) > 0) ? d3.mean(totalRor) : 0.00};
        };

        function reduceScoreSignal(coll,labelval,labelkey) {
           var tset = [];
           return _.reduce(coll, function (memo, coll) {

                //if (coll[labelkey] == labelval && coll['evaluate_productRevenue2013'] > 0) {
                if (coll[labelkey] === labelval ) {
                    memo.push({
                        aedrug_id: coll.aedrug_id,
                        metric_rxsignal_pscount: coll.metric_rxsignal_pscount,
                        metric_rxsignal_avg_ror: coll.ROR,
                        metric_rxsignal_active: coll.metric_rxsignal_active,
                        metric_rxsignal_watchlist: coll.metric_rxsignal_watchlist
                    });
                }
                return memo;
            }, tset);
        };

        function getGridData(DrugclassData, summaryData) {
            return _.map(portfolioService.getStripped(DrugclassData), function (d) {
                var products_scored = angular.fromJson(d.products_scored);
                var _products_scored = (products_scored !== null && products_scored.length > 0) ? products_scored : [];
                var rxsignal = mapRxScoreRxSignal(d.dimLabel,summaryData);
                //var reduced = reduce_rxscore_rxsignal(rxsignal);
                var red = reduceScoreSignal(rxsignal, d.dimLabel,'class_drugclass');
                var metrics = finalizeScoreSignal(red);
                d.metrics = metrics;
                return d;
            });
        };

    };
})();
