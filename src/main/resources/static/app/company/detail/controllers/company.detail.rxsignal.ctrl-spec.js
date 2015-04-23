describe('Controller: CompanyRxsignalCtrl', function() {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('company'));

    var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('CompanyRxsignalCtrl', {$scope: scope, RxsignalData:[{},{}], RxsignalSummaryData: [{},{},{}]});
    }));

    it('should be defined and able to initialize the scope var', inject(function($rootScope) {
        expect(scope).toBeDefined();
    }));
    it('should have $scope.summaryData defined with length 3', inject(function() {
        expect(scope.summaryData.length).toEqual(3);
    }));
    it('should have Rxsignal count of zero if not defined rxsignal data', inject(function() {
        expect(scope.rxsignal_count).toEqual(0);
    }));
});
