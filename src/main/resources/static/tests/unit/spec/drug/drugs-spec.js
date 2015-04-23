describe('DrugsCtrl', function() {

	beforeEach(module('drugs'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('DrugsListCtrl', {$scope: scope});
    }));

	it('should have Title of "Drugs"...', inject(function() {
        var title = "Drugs";
        var $scope = scope;

        $scope.Title = "Drugs";

		expect($scope.Title).toEqual("Drugs");

	}));



});
