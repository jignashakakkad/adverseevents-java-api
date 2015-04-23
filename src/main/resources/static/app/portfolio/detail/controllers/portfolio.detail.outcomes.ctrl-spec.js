describe('Controller: PortfolioOutcomesCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('portfolio'));
    beforeEach(module('company'));

    var scope, ctrl;

    beforeEach(inject(function ($state, $rootScope, $controller) {
        scope = $rootScope.$new();
        var outcomesData = [{}];
        var averageOutcomesData = [{}];

        mockPortfolioOutcomesService = sinon.stub({
            getDatayear: function() {},
            getOutcomePivotTable: function() {},
            getOutcomePivotTableHeader: function() {},
            getMinMaxOutcomesData: function() {},
            getOutcomeGridColumns: function() {},
            getGridOptions: function() {},
            setCustomGridColumns: function() {},
            getCustomGridColumns: function() {}
        });

        ctrl = $controller('PortfolioOutcomesCtrl', {
            $scope: scope,
            OutcomesData: outcomesData,
            AverageOutcomesData: averageOutcomesData,
            portfolioOutcomesService: mockPortfolioOutcomesService
        });

    }));

    describe("Controller initialization and basic functions", function () {

        it('should be defined and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();
        }));

        it('should have title "Outcomes"', inject(function () {
            expect(scope.title).toBe('Outcomes');
        }));

    });

});
