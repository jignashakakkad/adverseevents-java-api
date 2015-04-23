describe('Controller: rxscoreDrugChartCtrl', function() {

	beforeEach(module('drugs'));

	var scope,ctrl;

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
        var Drug = [{},{}];
        $controller('rxscoreDrugComponentsChartCtrl',
            {$scope: scope, Drug: Drug });

        scope.$digest();
    }));

	it('should be able to initialize with scope defined', inject(function() {

		expect(scope).toBeDefined();

	}));

});
