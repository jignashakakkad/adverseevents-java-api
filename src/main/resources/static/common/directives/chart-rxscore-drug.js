angular.module('AdverseEventsExplorer.main').directive('chartRxscoreDrug', function() {
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

angular.module('AdverseEventsExplorer.main').directive('chartRxscoreComponents', function() {
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

angular.module('drugs').directive('chartCaseTimeline', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        //templateUrl: 'common/directives/chart-rxscore-drug.html',
        link: function(scope, element, attrs, fn) {
            //console.log(scope.data);
            var chart = c3.generate({
                bindto: element[0],
                data: {
                    x: 'Date',
                  xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
                    columns: [
                       scope.data.x,
//            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
                        scope.data.y
                    ]
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y-%m-%d'
                        }
                    }
                },
                point: {
                    show: false
                }
            });

        }
    };
});
