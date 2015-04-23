describe('DrugRxscoreCtrl', function() {

	beforeEach(module('drugs'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      	scope = $rootScope.$new();
		createController = function() {
			return $controller('DrugRxscoreCtrl', {
				$scope: scope
			});
		};
    }));

	it('should ...', inject(function() {

		expect(1).toEqual(1);

	}));

});
