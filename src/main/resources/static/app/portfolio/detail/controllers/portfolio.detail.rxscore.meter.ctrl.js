angular.module('portfolio.detail').controller('RxscoreMeterCtrl', function ($scope, $log, $http, $rootScope, $timeout, termService, portfolioSummaryService, portfolioRxscoreService) {

    $scope.isScoreZero = function (value) {
        return value === 0;
    };

    var doChart = function(rxscore, label) {
        return c3.generate({
            size: {height: 249},
            bindto: '#RxScoreGauge',
            data: {
                columns: [
                    ['Rxscore', Math.abs(rxscore)]
                ],
                type: 'gauge'
            },
            gauge: {
                gauge_label_format: '%r',
                gauge_label_show: 'false',
                units: label
            },
            color: {
                pattern: ['green', 'yellow', '#CD7D0F', 'red'],
                unit: 'value',
                threshold: {
                    unit: 'value',
                    max: 100,
                    values: [47.17, 55.81, 61.83, 82.83]
                }

            }
        });
    };
    $rootScope.$on('port_rxscore_set', function () {
        doChart(portfolioRxscoreService.returnScore(), 'RxScore');
    });
    $rootScope.$on('no_rxscore_data', function () {
        doChart(portfolioRxscoreService.returnScore(), 'No RxScore');
    });
});
