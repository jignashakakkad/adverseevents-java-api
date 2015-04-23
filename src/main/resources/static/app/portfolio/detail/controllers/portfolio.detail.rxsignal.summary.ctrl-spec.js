describe('Controller: PortfolioRxsignalSummaryCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('portfolio'));
    beforeEach(module('company'));

    var scope, ctrl, state;

    beforeEach(inject(function ($state, $rootScope, $controller) {
        scope = $rootScope.$new();
        var rxsignalSummaryData = [{}];
        state = {};
        state.current = {'name': 'portfolio.detail.rxsignal-summary'};
        mockPortfolioRxSignalSummaryService = sinon.stub({
            getRxSignalCount: function () {
            },
            drawChart: function () {
            }
        });

        spyOn(mockPortfolioRxSignalSummaryService, 'drawChart');

        ctrl = $controller('PortfolioRxsignalSummaryCtrl', {
            $scope: scope,
            $state: state,
            RxsignalSummaryData: rxsignalSummaryData,
            portfolioRxSignalSummaryService: mockPortfolioRxSignalSummaryService
        });

    }));

    describe("Controller initialization and basic functions", function () {

        it('should have be defined and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();
        }));

        it('should have title: "RxSignal Summary"', inject(function () {
            expect(scope.title).toBe("RxSignal Summary");
        }));

        it('should call the service drawchart function for bubble chart', inject(function () {
            expect(mockPortfolioRxSignalSummaryService.drawChart).toHaveBeenCalled()
        }));

    });

});
