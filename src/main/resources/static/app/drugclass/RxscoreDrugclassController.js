
angular.module('drugclass').controller('rxscoreDrugclassCtrl',function($scope, Drugclass, termService, rxScoreService,$window){

    $scope.Drug = Drugclass[0];

    $scope.dummy = 'rxscore-components';
    $scope.myComponents = ['AE Serious', 'Indication', 'Comorbid', 'Outcome', 'Reporter'];
    $scope.myData = {
        columns: [
            ['RxScore Components', 30.5, 22.1, 90.0, 45.2, 15.5]
        ]
    };


});