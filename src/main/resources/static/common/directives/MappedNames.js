angular.module('AdverseEventsExplorer.main').directive('MappedNames', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            termNames: '@'
		},
		templateUrl: 'common/directives/MappedNames.html',
		link: function(scope, element, attrs, fn) {




		}
	};
});
