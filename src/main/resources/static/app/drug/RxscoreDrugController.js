angular.module('drugs').controller('rxscoreDrugCtrl', function ($scope, Drug, termService) {

    $scope.Drug = Drug[0];

    $scope.is_enabled = $scope.Drug.rxscore.score !== "none";

    $scope.dummy = 'rxscore-components';
    $scope.myComponents = ['AE Serious', 'Indication', 'Comorbid', 'Outcome', 'Reporter'];
    $scope.myData = {
        columns: [
            ['RxScore Components', 30.5, 22.1, 90.0, 45.2, 15.5]
        ]
    };
    $scope.fireEvent = function () {
        var indi = $scope.Drug.indications[0];
        termService.setId(indi.id);
    };


});