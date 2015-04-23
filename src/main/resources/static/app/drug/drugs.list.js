angular.module('drugs')
    .controller('DrugsListCtrl', function ($scope, $http, SERVER_SETTINGS) {

        $scope.ListItems = [];
        //TODO(@chore) -- convert this to a factory
        $http.get(SERVER_SETTINGS.BASE_URL+'lev/api/drugs/index').success(function (response) {
            $scope.ListItems = response;
        });
        $scope.Title = 'Top 50 Drugs';

    })
    .controller('DrugsRxsignalListCtrl', function ($scope, $http, SERVER_SETTINGS) {

        $scope.ListItems = [];
        //TODO(@chore) -- convert this to a factory

        $http.get(SERVER_SETTINGS.BASE_URL+'lev/api/drugs/index/rxsignal').success(function (response) {
            $scope.ListItems = response;
        });
        $scope.Title = 'Top RxSignal';

    });
