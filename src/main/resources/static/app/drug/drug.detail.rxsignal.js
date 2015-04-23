(function () {
    'use strict';

    angular
        .module('drugs')
        .controller('DrugRxsignalCtrl', ['$controller', '$scope', '$stateParams', '$state', 'Drug', 'localStorageService', 'GridData', 'drugRxsignalService', DrugRxsignalCtrl]);

    function DrugRxsignalCtrl($controller, $scope, $stateParams, $state, Drug, localStorageService, GridData, drugRxsignalService) {

        var vm = $scope;
        var currentState = $state.current.name;
        var tooltipModel = new TooltipModel();

        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel:tooltipModel});

        vm.aedrug_id = $stateParams.id;
        vm.Drug = Drug[0];
        vm.drugclass = vm.Drug.drugclasses;
        vm.drugclass = vm.Drug.indications;
        vm.formatter = d3.format('.4%');
        vm.myData = GridData;
        vm.gridOptions = drugRxsignalService.getGridOptions();
        vm.colDefs = drugRxsignalService.getCustomGridColumns(currentState);
        vm.menu = drugRxsignalService.getMenu();

        vm.localStorageClear = function() {
            drugRxsignalService.localStorageClear(currentState);
        }

        vm.formatCompare = function (reac, indi, klass) {
            return drugRxsignalService.getFormatCompare(reac, indi, klass);
        };

        // watch when any column settings changed from grid settings and saved into localstorage
        vm.$watch('gridOptions.$gridScope.columns', functionChangeGrid, true);

        // callback for watchers
        function functionChangeGrid(newVal, oldVal) {
            var config = [];
            angular.forEach(newVal, function (col) {
                config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'headerCellTemplate', 'cellFilter', 'cellTemplate', 'pinned'));
            });
            drugRxsignalService.setCustomGridColumns(currentState, config);
        }
    }
})();
