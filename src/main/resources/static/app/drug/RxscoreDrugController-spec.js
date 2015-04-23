describe('Controller: rxscoreDrugCtrl', function() {

	beforeEach(module('drugs'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('rxscoreDrugCtrl', {$scope: scope, Drug:[{rxscore:41.00}]});
    }));

	it('should be defined and able to initialize with $scope', inject(function() {

        expect(ctrl).toBeDefined;
        expect(scope).toBeDefined;

	}));
    it('should be have an rxscore value of 41.00', inject(function() {

		expect(scope.Drug.rxscore).toEqual(41.00);

	}));
});
