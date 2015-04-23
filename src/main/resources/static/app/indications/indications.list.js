angular.module('indications').controller('IndicationsListCtrl', function ($scope) {
    $scope.Title = 'Indications List Table';
    $scope.ListItems = [
        {'indication_id': 'N00008551', 'indication_name': 'The -itis', 'measure_pscount': 154000},
        {'indication_id': 'N00005011', 'indication_name': 'Cauliflower Ear', 'measure_pscount': 40100},
        {'indcation_id': 'N00001515', 'indication_name': 'Rheumatoidism', 'measure_pscount': 40500}
    ];

    $scope.Indications = $scope.ListItems;
});