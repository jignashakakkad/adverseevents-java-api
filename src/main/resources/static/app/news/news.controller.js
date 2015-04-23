angular.module('news').controller('DsmCtrl',function($scope,  ArticleService){
    'use strict';
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;
    $scope.maxSize = 155;
    $scope.totalItems = 0;
    $scope.pending = false;
    $scope.setPagingData = function (data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.search = function () {
        $scope.pending = true;
        ArticleService.getArticlesWithPagination($scope.currentPage, $scope.itemsPerPage)
            .then(function (res) {
                $scope.myData = res.data;

                $scope.setPagingData($scope.myData, $scope.currentPage, $scope.itemsPerPage);
                $scope.pending = false;
            }, function () {
                $scope.pending = false;
            }
        );
    };

    $scope.$watch('currentPage', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.search();
        }
    }, true);

    $scope.search();

});
