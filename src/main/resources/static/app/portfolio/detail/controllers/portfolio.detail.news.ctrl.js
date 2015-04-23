(function (){
    'user strict';

    angular
    .module('portfolio.detail')
    .controller('PortfolioNewsCtrl', ['$scope', '$controller', '$state', 'portfolioService', 'NewsEventsData', 'portfolioNewsService', 'GridModel', PortfolioNewsCtrl]);

    function PortfolioNewsCtrl($scope, $controller, $state, portfolioService, NewsEventsData, portfolioNewsService, GridModel) {

        var vm = $scope;
        var GridModels = [];
        var currentState = $state.current.name;

        // Use Tooltip Common component
        var tooltipModel = new TooltipModel();
        tooltipModel.setModules([currentState]);
        tooltipModel.setUseCommonModule(false);
        $controller('TooltipController', {$scope: $scope, TooltipModel: tooltipModel});

        // Set common nggrid component - new GridModel(statename, gridname, usecustomcoldef); -- be sure to use a unique gridname
        var gridModel = new GridModel(currentState, 'portfolioNews', false);

        vm.newsData = portfolioService.getStripped(NewsEventsData)
        vm.title = 'News and Events';

        gridModel.setData(vm.newsData);
        GridModels.push(gridModel);
        $controller('GridController', {$scope: $scope, GridModels: GridModels});

        // watch when any colum settings changed from grid settings and push to local storage
        $scope.$on('ngGridEventColumns', setCustomGridConfig, true);

        // Call back for watchers
        function setCustomGridConfig(oldVal, newVal) {
            var config = [];
            if (!!newVal && newVal.length > 0) {
                angular.forEach(newVal, function (col) {
                    config.push(_.pick(col, 'field', 'displayName', 'cellClass', 'width', 'visible', 'cellFilter', 'cellTemplate', 'pinned', 'headerCellTemplate'));
                });
                gridModel.resetColDefs(config);
            }
        }

    };
})();
