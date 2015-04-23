describe('Controller: CompanyNewsCtrl', function() {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('company'));

    var scope = null, ctrl;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('CompanyNewsCtrl', {$scope: scope, NewsEventsData: [{},{}]});
    }));

    it('should be defined and able to initialize scope', inject(function() {

        expect(scope).toBeDefined();

    }));

});
