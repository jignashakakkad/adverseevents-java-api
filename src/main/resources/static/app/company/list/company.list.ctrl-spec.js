
describe('Controller: CompanyListCtrl', function() {

    beforeEach(module('company'));

    var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('CompanyListCtrl', {
            $scope: scope,
            List: [{},{},{},{},{}]
        });
    }));

    it('should be defined and able to initialize scope variable', inject(function() {
        expect(scope).toBeDefined();
    }));

    it('should have a list collection of List', inject(function() {
        expect(scope.List).toBeDefined();
    }));
});
