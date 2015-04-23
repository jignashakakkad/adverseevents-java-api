describe('Controller: HomeSearchCtrl', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('HomeSearchCtrl', {$scope: scope});
    }));

	it('should be able initialize...', inject(function() {

		expect(ctrl).toBeDefined();

	}));
    it('should be able initialize...', inject(function() {

        expect(ctrl).toBeDefined();

    }));
});
