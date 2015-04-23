angular.module('AdverseEventsExplorer.main').controller('RxscoreChartGaugeCtrl', function ($scope, $http, $rootScope, Restangular, Drug,$state, $stateParams, SERVER_SETTINGS) {
    $scope.aedrug = Drug;
    $scope.rxscore = null;
    $scope.aedrug_id = $stateParams.id;

    $rootScope.rxscore = null;

    $scope.getData = function ($scope) {
        $http.get(SERVER_SETTINGS.RXSCORE_URL+'lev/index/rxscore/v1/' + $scope.aedrug_id + '/value').success(function (response) {
            var d = response;
            $scope.rxscore = Math.abs(d.val);
            $scope.isZero = function(value) {
                return value === 0;

            };
            $rootScope.rxscore = $scope.rxscore;

            if ($scope.rxscore > 0) {
                $scope.gage = c3.generate({
                    size: { height: 249 },
                    bindto: '#RxScoreGauge',
                    data: {
                        columns: [
                            [d["var"], Math.abs(d.val)]
                        ],
                        type: 'gauge'
                    },
                    gauge: {
                        gauge_label_format: '%r',
                        gauge_label_show: 'false',
                        units: 'RxScore'
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
            }

        });
    };

    $scope.getData($scope);

});
