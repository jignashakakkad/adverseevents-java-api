describe('Controller: PortfolioRxsignalCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('portfolio'));
    beforeEach(module('company'));

    var scope, ctrl, companyChartService, state;

    beforeEach(inject(function ($state, $rootScope, $controller) {
        scope = $rootScope.$new();
        state = {};
        state.current = {'name': 'portfolio.detail.rxsignal-detail'};
        var rxsignalData = [{}];
        var rxsignalSummaryData = [{}];

        ctrl = $controller('PortfolioRxsignalCtrl', {
            $scope: scope,
            $state:state,
            RxsignalData: rxsignalData,
            RxsignalSummaryData: rxsignalSummaryData
        });

    }));

    describe("Controller initialization and basic functions", function () {

        it('should have be defined and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();
        }));

        it('should have title: "RxSignal Detail"', inject(function () {
            expect(scope.title).toBe("RxSignal Detail");
        }));

    });

});
