describe('Controller: PortfolioNewsCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('portfolio'));
    beforeEach(module('company'));

    var scope, ctrl, state;

    beforeEach(inject(function ($state, $rootScope, $controller) {
        scope = $rootScope.$new();
        state = {};
        state.current = {'name': 'portfolio.detail.news'};
        var newsEventsData = [{}];

        ctrl = $controller('PortfolioNewsCtrl', {
            $scope: scope,
            $state: state,
            NewsEventsData: newsEventsData
        });

    }));

    describe("Controller initialization and basic functions", function () {

        it('should have be defined and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();
        }));

        it('should have a title "News and Events"', inject(function () {
            expect(scope.title).toBe('News and Events');
        }));

    });

});
