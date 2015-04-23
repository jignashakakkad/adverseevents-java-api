angular.module('drugs').controller('DrugDetailCtrl', function ($scope, $http, Exposure, Restangular, Drug, Metrics, $state, $stateParams, toastPopup) {
    if ($state.is("drugs.detail")) {
        $state.go("drugs.detail.overview");
    }
    // TODO @dbogart toast popup for drugs already in a portfolio
    if(Exposure){
        toastPopup.showToast("<span class='toasty-text'>This drug is present in one or more of your Portfolios</span>");
    }

    $scope.Drug = Drug[0];
    $scope.Metrics = Metrics[0];
    $scope.data_updated = '06/30/2014';
    $scope.TitleSuffix = "";

    try {
        if ($scope.Drug.attributes.designation_id === 7 || $scope.Drug.attributes.designation_id === 8) {
            $scope.TitleSuffix = " (Withdrawn)";
        }
    } catch (err) {
        $scope.TitleSuffix = "";
    }

    try {
        if ($scope.Drug.history.length) {
            $scope.data_updated = $scope.Drug.history[0].max_date_received;
        }
    } catch (err) {

        $scope.Drug.history = [];
        $scope.data_updated = '06/30/2014';
    }

    $scope.rxscore = false;
    $scope.aedrug_id = $stateParams.id;

});
