(function () {
  'use strict';

    angular
    .module('company')
    .controller('CompanyOverviewCtrl', ['$scope', '$log', '$rootScope', '$filter', '$state', '$controller', 'companyOverviewService', 'utilService', 'Overview', 'Revenues', 'companyRxscoreService', 'RxscoreData', 'companyService', 'RxsignalSummaryData', 'companyChartService', 'companyGridService', 'tooltipService', 'companySummaryService', CompanyOverviewCtrl]);

    function CompanyOverviewCtrl($scope, $log, $rootScope, $filter, $state, $controller, companyOverviewService, utilService, Overview, Revenues, companyRxscoreService, RxscoreData, companyService, RxsignalSummaryData, companyChartService, companyGridService, tooltipService, companySummaryService) {

        var vm = $scope;
        var currentState = $state.current.name;
        var tmp = companyChartService.getOverviewChart(Revenues.slice(0, 8));

        // config tooltip
        var tooltipModel = new TooltipModel();
        tooltipModel.setUseCommonModule(true);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        vm.ToolTipper = tooltipService.getTooltip;
        vm.colDefs = companyOverviewService.getCustomGridColumns(currentState);
        vm.myData = Revenues;
        vm.chartConfig = tmp;
        vm.gridOptions = companyOverviewService.getGridOptions();

        $rootScope.formatRxscore = function (score) {
            var colors = ['green', 'yellow', '#CD7D0F', 'red'];
            var thresholds = [47.17, 55.81, 61.83, 82.83];
            var s = Math.abs(score);
            if (s >= thresholds[2]) {
                return colors[3];
            } else if (s >= thresholds[1]) {
                return colors[2];
            } else if (s >= thresholds[0]) {
                //yellow
                return colors[1];
            } else if (s >= 1) {
                return colors[0];
            } else {
                return 'grey';
            }
        };

        $rootScope.$on('$stateChangeSuccess', function () {
            $("html, body").animate({scrollTop: 0}, 50);
        });

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
                companyOverviewService.setCustomGridColumns(currentState, config);
            }
        }
    };
})();
