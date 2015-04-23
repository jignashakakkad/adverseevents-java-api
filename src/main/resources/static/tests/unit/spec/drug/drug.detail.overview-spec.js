describe('DrugDetailOverviewCtrl', function() {

	beforeEach(module('drugs'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
     	scope = $rootScope.$new();
		createController = function() {
			return $controller('DrugDetailOverviewCtrl', {
				$scope: scope
			});
		};
    }));

	xit('should ...', inject(function() {

		expect(1).toEqual(1);

	}));

});
