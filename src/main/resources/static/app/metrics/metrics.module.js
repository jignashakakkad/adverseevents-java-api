//TODO(ASAP) - USE THIS TO CLEAN UP THE INDICATION/COMPANY/PORTFOLIO/DRUGCLASS CONTROLLERS.

angular.module('aex.metrics', ['aex.constants']);
angular
    .module('aex.metrics').constant('mapReduceDrugGroup',

    function rollupRxscoreRxsignalData(dimLabel, summary_data) {

        var dimType;
        var _products = [];

        if (_.where(summary_data, {'class_drugclass': dimLabel}).length === 0) {
            _products = [];

        } else {
            _products = _.where(summary_data,
                {'class_drugclass': dimLabel});

        }
        return _products.length > 0 ? _products : false;
    },

//input the subset of DrugclassData
//basically this is a LEFT JOIN with GROUP BY and SUM and AVG
    function finalizeRxscoreRxsignalData(tset) {
        var totalDrugs = 1, totalSignals = 0, totalPS = 0, totalRor = [0], avgRor = 0.00, pctOverall = 0;
        angular.forEach(tset, function (d) {
            totalPS += d.metric_rxsignal_pscount;
            totalDrugs += 1;
            totalSignals += d.metric_rxsignal_active;
            totalRor.push(d.metric_rxsignal_avg_ror);
        });

        return {
            'metric_reduced_pscount': totalPS,
            'metric_reduced_totaldrugs': totalDrugs,
            'metric_reduced_totalsignals': totalSignals,
            'metric_reduced_avg_ror': (d3.mean(totalRor) > 0) ? d3.mean(totalRor) : 0.00
        };
    },

    function reduceRxscoreRxsignalData(collection, labelValue, labelKey) {

        var tset = [];
        return _.reduce(collection, function (memo, coll) {

            //if (coll[labelkey] == labelval && coll['evaluate_productRevenue2013'] > 0) {
            if (coll[labelKey] === labelValue) {
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
    });
