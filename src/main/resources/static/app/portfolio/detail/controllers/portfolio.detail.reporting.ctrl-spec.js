describe('Controller: PortfolioReportingCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('portfolio'));
    beforeEach(module('company'));

    var scope, ctrl, companyChartService, state;

    beforeEach(inject(function ($state, $rootScope, $controller) {
        scope = $rootScope.$new();
        var quarterlyData = [{}];
        state = {};
        state.current = {'name': 'portfolio.detail.reporting'};
        ctrl = $controller('PortfolioReportingCtrl', {
            $scope: scope,
            $state: state,
            QuarterlyData: quarterlyData
        });

    }));

    describe("Controller initialization and basic functions", function () {

        it('should have be defined and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();
        }));

        it('should have title: "Quarterly Reporting"', inject(function () {
            expect(scope.title).toBe("Quarterly Reporting");
        }));

    });

});
