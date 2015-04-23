angular.module('drugclass').controller('DrugclassDetailCtrl', function ($scope, $http, Restangular, Drugclass, Metrics,$state, $stateParams) {
    if($state.is("drugclass.detail")){
        $state.go("drugclass.detail.overview");
    }
    $scope.Parent = Drugclass[0];
    $scope.Metrics = Metrics[0];
    $scope.data_updated = '06/30/2014';

    if($scope.Parent.history.length) {
        $scope.data_updated = $scope.Drug.history[0].max_date_received;
    }


    $scope.rxscore = false;
    $scope.drugclass_id = $stateParams.id;

});
