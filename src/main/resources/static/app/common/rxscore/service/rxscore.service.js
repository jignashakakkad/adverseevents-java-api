(function () {
    'use strict';
    /**
     * @ngdoc service
     * @name common.rxscore.service:rxScoreServiceCommon
     * @requires $http
     * @requires SERVER_SETTINGS
     */
    angular.module('common.rxscore').factory('rxScoreServiceCommon', function ($http, SERVER_SETTINGS) {

        var getScoresForIndi = function (termId, units) {
            return $http({
                method: 'GET',
                url: SERVER_SETTINGS.BASE_URL + 'service/service.rxscore.atc.v3.php?termCode=' + termId + '&units=' + units
            });
        };

        var getComponentsForIndi = function (termId, units) {
            return $http({
                method: 'GET',
                url: SERVER_SETTINGS.BASE_URL + 'service/service.rxscore.comp.v3.php?termCode=' + termId + '&units=' + units
            });
        };
        return{
            /**
             * @ngdoc method
             * @name common.rxscore.service:rxScoreServiceCommon#getScores
             * @methodOf common.rxscore.service:rxScoreServiceCommon
             * @param {String} termId termCode of drug group.
             * @param {String} units type of druggroup.
             * @returns {promise} Returns the promise with rxscores for druggroup.
             */
            getScores: function (termId, units) {
                return getScoresForIndi(termId, units);
            },
            /**
             * @ngdoc method
             * @name common.rxscore.service:rxScoreServiceCommon#getComponents
             * @methodOf common.rxscore.service:rxScoreServiceCommon
             * @param {String} termId termCode of drug group.
             * @param {String} units type of druggroup.
             * @returns {promise} Returns the promise with components for rxscore.
             */
            getComponents: function (termId, units) {
                return  getComponentsForIndi(termId, units);
            }

        };
    });
    angular.module('common.rxscore').factory('rxscoreChartFactory', function () {
        return {
            /**
             * @ngdoc object
             * @name common.rxscore.object:rxscoreChartFactory
             * @description This object contains the basic configuration for the bar charts.
             */
            BaseBarchartModel: {
                options: {
                    chart: {
                        type: 'bar',
                        height: 700,
                        width: 1000,
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
                        text: 'Not configured'
                    },
                    categories: [],
                },
                yAxis: {
                    title: {
                        text: 'RxScore'
                    }

                },
                legend: {
                    enabled: false
                },
                series: [],
                title: {
                    text: 'RxScore Comparison'
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                loading: false
            }
        }
    });

})();
