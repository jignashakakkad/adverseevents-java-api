angular.module('AdverseEventsExplorer.main').directive('chartRxscoreAggregate', function() {
	return {
		restrict: 'E',
		scope: {
            data: '=',
            axis: '=',
            categories: '='
		},
		//templateUrl: 'common/directives/chart-rxscore-drug.html',
		link: function(scope, element, attrs, fn) {
            var chart = c3.generate({
                bindto: element[0],
                 data: scope.data,
                axis: {rotated: true, x: { type: 'category',  categories: scope.categories  } }
            }).transform('bar');
        }
	};
});

angular.module('AdverseEventsExplorer.main').directive('chartRxscoreComponentsAggregate', function() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            axis: '=',
            components: '='
        },
        //templateUrl: 'common/directives/chart-rxscore-drug.html',
        link: function(scope, element, attrs, fn) {
            var chart = c3.generate({
                bindto: element[0],
                data: scope.data,
                axis: {rotated: true, x: { type: 'category',  categories: scope.components  } }
            }).transform('bar');
        }
    };
});
