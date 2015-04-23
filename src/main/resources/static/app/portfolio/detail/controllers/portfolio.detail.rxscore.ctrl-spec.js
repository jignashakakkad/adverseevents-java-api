describe('Controller: PortfolioRxscoreCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('portfolio'));
    beforeEach(module('company'));

    var scope, ctrl, companyChartService, state;

    beforeEach(inject(function ($state, $rootScope, $controller) {
        scope = $rootScope.$new();
        var rxscoreData = [{}];
        state = {};
        state.current = {'name': 'portfolio.detail.rxscore'};
        ctrl = $controller('PortfolioRxscoreCtrl', {
            $scope: scope,
            $state: state,
            RxscoreData: rxscoreData
        });

    }));

    describe("Controller initialization and basic functions", function () {

        it('should have be defined and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();
        }));

        it('should have title: "Product RxScore Breakdown"', inject(function () {
            expect(scope.title).toBe("Product RxScore Breakdown");
        }));

    });

});
