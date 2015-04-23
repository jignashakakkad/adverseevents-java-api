describe('Controller: drugs.DrugsListCtrl', function() {

	beforeEach(module('drugs'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      createController = function() {
        return $controller('DrugsListCtrl', {
          $scope: scope
        });
      };
    }));

	it('should be able initialize...', inject(function() {

		expect(1).toEqual(1);

	}));

});
