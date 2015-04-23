(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyRxscoreMeterCtrl', ['$scope', '$log', '$http', '$rootScope', 'termService', 'companyRxscoreService', CompanyRxscoreMeterCtrl]);

    function CompanyRxscoreMeterCtrl($scope, $log, $http, $rootScope, termService, companyRxscoreService) {

        $scope.isScoreZero = function (value) {
            return value === 0;
        };

        var doChart = function (rxscore, label) {
            return c3.generate({
                size: {height: 249},
                bindto: '#CompanyRxScoreGauge',
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
            doChart(companyRxscoreService.returnScore(), 'RxScore');
        });
        $rootScope.$on('no_rxscore_data', function () {
            doChart(companyRxscoreService.returnScore(), 'No RxScore');
        });
    };
})();