describe('Controller: CompanyDrugclassCtrl', function() {

    beforeEach(module('company'));
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('company.services'));
    beforeEach(module('ui.router'));

    var scope, ctrl, rxsignal_summary_data, drugclass_data, $httpBackend;

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
        scope = $rootScope.$new();
        rxsignal_summary_data = [{},{}];
        drugclass_data = [{},{}];
        $httpBackend = _$httpBackend_;


        ctrl = $controller('CompanyDrugclassCtrl', {
            $scope: scope,
            RxsignalSummaryData: rxsignal_summary_data,
            DrugclassData: drugclass_data
        });
        $httpBackend.expectGET('app/common/tooltip/json/tooltip.json').respond(200,[{},{}]);
        scope.$digest();
    }));

    afterEach(function () {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    it('should have the vm.colDefs property defined and of length 6', inject(function() {

        expect(scope.colDefs.length).toEqual(6);

    }));
    it('should have the proper title Drug Class Control', inject(function() {

        expect(scope.title).toEqual('Drug Class Control');

    }));

    it('should have the toolTipper method defined', inject(function() {

        expect(scope.myData).toBeDefined();

    }));


});
