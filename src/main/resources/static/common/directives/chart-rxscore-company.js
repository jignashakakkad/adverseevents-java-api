angular.module('AdverseEventsExplorer.main').directive('chartRxscoreCompany', function() {
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
