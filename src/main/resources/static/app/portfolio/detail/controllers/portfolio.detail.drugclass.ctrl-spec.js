describe('Controller: PortfolioDrugclassCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('portfolio'));
    beforeEach(module('company'));

    var scope, ctrl, companyChartService, state;

    beforeEach(inject(function ($state, $rootScope, $controller) {
        scope = $rootScope.$new();
        state = {};
        state.current = {'name':'portfolio.detail.drugclass'};
        var drugClassData = [{}];
        var rxsignalSummaryData = [{}];
        mockPortfolioDrugclassService = sinon.stub({
            mapRxScoreRxSignal: function() {},
            finalizeScoreSignal: function() {},
            reduceScoreSignal: function() {},
            getGridData: function() {}
        });

        ctrl = $controller('PortfolioDrugclassCtrl', {
            $scope: scope,
            $state:state,
            DrugclassData: drugClassData,
            RxsignalSummaryData: rxsignalSummaryData,
            portfolioDrugclassService: mockPortfolioDrugclassService
        });

    }));

    describe("Controller initialization and basic functions", function () {

        it('should be defined and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();
        }));

        it('should have a title of Drug Class Segments', inject(function () {
            expect(scope.title).toBe('Drug Class Segments');
        }));

    });

});
