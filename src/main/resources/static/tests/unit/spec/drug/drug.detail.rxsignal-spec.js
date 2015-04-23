describe('DrugRxsignalCtrl', function() {

	beforeEach(module('drugs'));

	var scope,ctrl,GridData,GridCols,Drug;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      GridData = {};
      GridCols = {};
      Drug = {'drugclasses':[],'indications':[],'mechanisms':[]};
      ctrl = $controller('DrugRxsignalCtrl', {$scope: scope, Drug: {'drugclasses':[],'indications':[],'mechanisms':[]}, GridData: {}, GridCols: {}});
    }));

	it('should ...', inject(function() {

		expect(1).toEqual(1);

	}));

});
