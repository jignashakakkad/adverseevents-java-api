describe('DrugCasesCtrl', function() {

	beforeEach(module('drugs'));

	var scope,ctrl,Drug;

    beforeEach(inject(function($rootScope, Drug, $controller) {
      scope = $rootScope.$new();
        Drug = {};
      ctrl = $controller('DrugCasesCtrl', {$scope: scope, Drug: Drug});
    }));

	it('should ...', inject(function() {

		expect(1).toEqual(1);

	}));

});
