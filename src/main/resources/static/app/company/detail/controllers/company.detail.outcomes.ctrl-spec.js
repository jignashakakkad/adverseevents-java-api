describe('Controller: CompanyOutcomesCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('company'));

    var scope, ctrl, OutcomesData, mock_collection = [{},{}], OutcomesData, $stateParams, $httpBackend;


    beforeEach(inject(function($controller, $rootScope, _companyService_, _$httpBackend_) {
        companyService = sinon.stub({companyService: function getStripped(){}});
        $httpBackend = _$httpBackend_;
        OutcomesData = [{},{}];
        scope = $rootScope.$new();
        $stateParams = {datayear: '2014'};

        $controller('CompanyOutcomesCtrl',
            {$scope: scope, $stateParams: $stateParams, companyService: _companyService_, OutcomesData: OutcomesData });

        $httpBackend.expectGET('app/common/tooltip/json/tooltip.json').respond(200,[{},{}]);
        scope.$digest();

    }));

    afterEach(function () {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('it should be able to initialize and have $scope defined', function () {
        expect(scope).toBeDefined();
    });
    it('it should be able to initialize with the title outcomes control', function () {
        expect(scope.title).toBe("Outcomes Control");
    });

    it('it should have the vm.formatOutcomesRate method defined', function(){
        "use strict";
        expect(scope.formatOutcomesRate).toBeDefined();
    });

    it('it should have vm.datayear defined for 2014', function() {


        expect(scope.datayear).toEqual('2014');

    });

    it('it should have return cumulative data for anything else', function() {

        $stateParams.datayear = 2015;


        expect(scope.datayear).toEqual('2014');

    });
});
