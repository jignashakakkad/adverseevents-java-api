angular.module('indications').controller('IndicationsDetailCtrl', function ($scope, $http, Restangular, Indication, Metrics, $stateParams) {
    $scope.Indication = Indication[0];
    $scope.Metrics = Metrics[0];
    $scope.rxscore = false;
    $scope.aedrug_id = $stateParams.id;

});