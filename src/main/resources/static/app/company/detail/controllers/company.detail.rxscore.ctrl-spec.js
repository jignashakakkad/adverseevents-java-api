describe('Controller: CompanyRxscoreCtrl', function() {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('company'));

    var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('CompanyRxscoreCtrl', {$scope: scope, RxscoreData: [{}]});
    }));

    it('should be able to initialize and have defined $scope', inject(function() {

        expect(scope).toBeDefined();

    }));

});
