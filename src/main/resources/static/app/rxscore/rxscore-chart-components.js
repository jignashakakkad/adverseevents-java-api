angular.module('rxscore').controller('RxscoreChartComponents', function ($scope, $http, Restangular, Drug, $stateParams) {


    $scope.aedrug = Drug;
    $scope.rxscore = null;
    $scope.aedrug_id = $stateParams.id;


    $scope.getData = function ($scope) {
        $http.get('http://www.adverseevents.com/lev/index/rxscore/' + $scope.aedrug_id + '/value').success(function (response) {
            var d = response;
            $scope.rxscore = d.val;
            $scope.isZero = function(value) {
               return value === 0;
            };

            //alert($scope.rxscore);
            if ($scope.rxscore > 0) {
                $scope.gage = c3.generate({
                    size: { height: 180 },
                    bindto: '#RxScoreGauge',
                    data: {
                        columns: [
                            [d['var'],d['val']]
                        ],
                        type: 'gauge'
                    },
                    gauge: {
                        gauge_label_format: '%r',
                        gauge_label_show: 'false',
                        units: 'RxScore'
                    },
                    color: {
                        pattern: ['green', 'yellow', 'CD7D0F', 'red'],
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
