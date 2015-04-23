describe('Controller: PortfolioIndicationCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('portfolio'));
    beforeEach(module('company'));

    var scope, ctrl, companyChartService, state;

    beforeEach(inject(function ($state, $rootScope, $controller) {
        scope = $rootScope.$new();
        state = {};
        state.current = {'name': 'portfolio.detail.indication'};
        var indicationData = [{}];
        var rxsignalSummaryData = [{}];
        mockPortfolioIndicationService = sinon.stub({
            mapRxScoreRxSignal: function () {
            },
            finalizeScoreSignal: function () {
            },
            reduceScoreSignal: function () {
            },
            getGridData: function () {
            }
        });

        ctrl = $controller('PortfolioIndicationCtrl', {
            $scope: scope,
            $state:state,
            IndicationData: indicationData,
            RxsignalSummaryData: rxsignalSummaryData,
            portfolioIndicationService: mockPortfolioIndicationService
        });

    }));

    describe("Controller initialization and basic functions", function () {

        it('should be defined and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();
        }));

        it('should have title "Indications"', inject(function () {
            expect(scope.title).toBe('Indications');
        }));

    });

});
