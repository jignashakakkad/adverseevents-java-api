angular.module('AdverseEventsExplorer.main').controller('MoAsListCtrl', function ($scope) {
    $scope.Title = 'MoAs List Table';
    $scope.ListItems = [
        {'aemoA_id': 1, 'aemoA_name': 'Nausea', 'measure_pscount': 203785},
        {'aemoA_id': 4, 'aemoA_name': 'Drug Ineffective', 'measure_pscount': 195475},
        {'aemoA_id': 7, 'aemoA_name': 'Death', 'measure_pscount': 166223}
    ];

    $scope.moAs = $scope.ListItems;
});