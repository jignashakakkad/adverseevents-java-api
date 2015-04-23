(function () {
    'use strict';

    angular
        .module('drugs')
        .controller('DrugOutcomesCtrl', ['$scope', '$controller', '$state', 'ResolvedData', 'JavaAPIData','utilService', 'drugOutcomesService', DrugOutcomesCtrl]);

    function DrugOutcomesCtrl($scope, $controller, $state, ResolvedData, JavaAPIData, utilService, drugOutcomesService) {

        var vm = $scope;
        var currentState = $state.current.name;
        var utilFn = utilService;
        console.log('here.....');
        console.log(JavaAPIData);
            vm.javaDrudId = JavaAPIData.data.drugId;
            vm.psCount = JavaAPIData.data.count;
        // Config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        // Unwrap resolved data
        var OutcomesSeries = ResolvedData.OutcomesChart[0];
        var outcomes = ResolvedData.Outcomes[0];

        vm.formatOutcomes = utilService.formatter.outcomes;
        vm.chartConfig = drugOutcomesService.getOutcomesChart(outcomes, OutcomesSeries);
        vm.gridOptions = drugOutcomesService.getGridOptions();
        vm.colDefs = drugOutcomesService.getCustomGridColumns(currentState);

        ResolvedData.OutcomesIncidence.then(function(data){
            vm.OutcomesIncidence = data[0];
        });



        vm.localStorageClear = function () {
            drugOutcomesService.localStorageClear(currentState);
        };

        // watch when any column settings changed from grid settings and saved into localstorage
        vm.$watch('gridOptions.$gridScope.columns', functionChangeGrid, true);

        // callback for watchers
        function functionChangeGrid(newVal, oldVal) {
            if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
                angular.noop();
            } else {
                var config = [];
                angular.forEach(newVal, function (col) {
                    config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'headerCellTemplate', 'cellFilter', 'cellTemplate', 'pinned'));
                });
                drugOutcomesService.setCustomGridColumns(currentState, config);
            }
        }
    }
})();
