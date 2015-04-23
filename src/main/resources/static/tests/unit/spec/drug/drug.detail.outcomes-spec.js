describe('DrugOutcomesCtrl', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();

		createController = function() {
			return $controller('DrugOutcomesCtrl', {
				$scope: scope
			});
		};
    }));

	it('should ...', inject(function() {

		expect(1).toEqual(1);

	}));

});
