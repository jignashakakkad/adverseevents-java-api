(function () {
    'use strict';

    // DetailCtrl
    angular.module('druggroup.detail').controller('DrugGroupDetailCtrl', ['$controller', '$filter', '$scope', '$log', '$state', '$stateParams', '$window', '$location', 'toastPopup', 'DrugGroup', 'Fullscreen', 'localStorageService', 'MainTabService', DrugGroupDetailCtrl]);
    function DrugGroupDetailCtrl($controller, $filter, $scope, $log, $state, $stateParams, $window, $location, toastPopup, DrugGroup, Fullscreen, localStorageService, MainTabService) {
        if ($state.is("druggroup.detail")) {
            $state.go("druggroup.detail.overview");
        }
        $scope.$on("$stateChangeSuccess", function () {
            Raven.setTagsContext({state: $state.current.name});
        });
        //TODO sort this out
        $controller('LocalStorageController', {$scope: $scope});
        var drugGroupTabs = [
            {
                "heading": 'Overview',
                "sref": "druggroup.detail.overview",
                active: false,
                icon: 'fa fa-th',
                disabled: false
            },
            {
                "heading": 'Monitor',
                "sref": "druggroup.detail.monitor",
                active: false,
                icon: 'fa fa-newspaper-o',
                disabled: false
            },
            {
                "heading": 'Adverse Events',
                "sref": "druggroup.detail.adevents({datatype:'IR'})",
                active: false,
                icon: 'fa aexicon-radio-tower',
                disabled: false
            },
            {
                "heading": 'RxSignal',
                "sref": "druggroup.detail.rxsignal",
                active: false,
                icon: 'fa fa-rss',
                disabled: false
            },
            {
                "heading": 'RxCost',
                "sref": "druggroup.detail.costs",
                active: false,
                icon: 'fa fa-usd',
                disabled: false
            },
            {
                "heading": 'RxScore',
                "sref": "druggroup.detail.rxscore",
                active: false,
                icon: 'fa fa-bar-chart-o',
                disabled: false
            },
            {
                "heading": 'Outcomes',
                "sref": "druggroup.detail.outcomes",
                active: false,
                icon: 'fa fa-warning',
                disabled: false
            },
            {
                "heading": 'Reporting',
                "sref": "druggroup.detail.quarterly",
                active: false,
                icon: 'fa aexicon-pulse',
                disabled: false
            }

        ];

        MainTabService.setTabs(drugGroupTabs);

        $scope.goFullscreen = function () {

            // Fullscreen
            if (Fullscreen.isEnabled()) {
                Fullscreen.cancel();
            } else {
                Fullscreen.all();
            }
        };
        $scope.isFullScreen = false;
        $scope.goFullScreenViaWatcher = function () {
            $scope.isFullScreen = !$scope.isFullScreen;
        };

        $scope.localStorageClear = function (key) {
            $scope.clearLocalStorage($state.current.name, key);
            $state.reload();
        };

        $scope.localStorageClearAll = function () {
            $scope.clearLocalStorage("druggroup.detail");
            $state.reload();
        };

        $scope.DrugGroup = DrugGroup[0];

        if (DrugGroup[0] == undefined) {
            $state.go("druggroup.list", {type: $stateParams.type}).then(function(){
                toastPopup.showNoDataToast("<span class='toasty-text'>Not enough current data for selected Drugclass</span>");
            });
        } else {
            $scope.DrugGroup.pscount = d3.sum(DrugGroup.plain(), function (d) {
                if (typeof d.metric_pscount === 'number') {
                    return d.metric_pscount;
                }
            });
        }

        $scope.data_updated = '06/30/2014';
        $scope.rxscore = false;
        var pascalFilter = $filter('pascalCaseFilter');
        $scope.drugclass_id = $stateParams.id;
        $scope.DrugGroupType = pascalFilter($stateParams.type);
    }

})();
