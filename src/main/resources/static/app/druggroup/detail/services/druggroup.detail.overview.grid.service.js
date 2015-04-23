(function () {
    'use strict';
    angular.module('druggroup.services').factory('DrugGroupOverviewGridService', DrugGroupOverviewGridService);
    function DrugGroupOverviewGridService() {
        var exports = {
            getOverviewMinMaxData: getOverviewMinMaxData
        };
        return exports;

        function getOverviewMinMaxData(overviewData) {
            var minMaxData = {};
            var smin = d3.min(_.pluck(overviewData, 'metric_icumulative_serious'));
            var smax = d3.max(_.pluck(overviewData, 'metric_icumulative_serious'));
            minMaxData['metric_icumulative_serious' + '.min'] = smin;
            minMaxData['metric_icumulative_serious' + '.max'] = smax;

            var smin = d3.min(_.pluck(overviewData, 'metric_icumulative_hosp'));
            var smax = d3.max(_.pluck(overviewData, 'metric_icumulative_hosp'));
            minMaxData['metric_icumulative_hosp' + '.min'] = smin;
            minMaxData['metric_icumulative_hosp' + '.max'] = smax;

            var smin = d3.min(_.pluck(overviewData, 'metric_icumulative_ime'));
            var smax = d3.max(_.pluck(overviewData, 'metric_icumulative_ime'));
            minMaxData['metric_icumulative_ime' + '.min'] = smin;
            minMaxData['metric_icumulative_ime' + '.max'] = smax;

            var smin = d3.min(_.pluck(overviewData, 'metric_icumulative_dme'));
            var smax = d3.max(_.pluck(overviewData, 'metric_icumulative_dme'));
            minMaxData['metric_icumulative_dme' + '.min'] = smin;
            minMaxData['metric_icumulative_dme' + '.max'] = smax;

            return minMaxData;
        }
    }
})();
