describe('Controller: PortfolioOverviewCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('portfolio'));
    beforeEach(module('company'));

    var scope, ctrl, companyChartService;

    beforeEach(inject(function ($state, $rootScope, $controller) {
        scope = $rootScope.$new();
        var revenues = [{}];
        var companyData = [{}];
        var drugData = [{}];

        ctrl = $controller('PortfolioOverviewCtrl', {
            $scope: scope,
            Revenues: revenues,
            DrugOverviewData: drugData,
            CompanyOverviewData: companyData
        });

    }));

    describe("Controller initialization and basic functions", function () {

        it('should have be defined and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();
        }));

        it('should have a title of Companies by default', inject(function () {
            expect(scope.overview.gridTitle).toBe('Companies');
        }));

        it('should have be return the color red when formatting scores over 61.83', inject(function () {
            var highRxScore = scope.formatRxscore(62.84);
            expect(highRxScore).toBe('red');
        }));

        it('should have have a chart config defined to display top revenues', inject(function () {
            expect(scope.chartConfig).not.toBeNull();
        }));

    });

});
