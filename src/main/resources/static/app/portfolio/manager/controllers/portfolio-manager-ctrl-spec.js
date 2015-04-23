/**
 * @module test.portfolioManager
 * @name portfolioManagerItemsCtrl
 * @description
 * Tests for portfolioManagerItemsCtrl under portfolioManager
 * _Enter the test description._
 * */


xdescribe('Controller: PortfolioManagerCtrl', function () {

    // load the controller's module

    beforeEach(module('portfolio.manager'));

    var ctrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('PortfolioManagerCtrl', {
            $scope: scope
        });
    }));

    it('should be defined', function () {
        expect(scope).toBeDefined();
    });
});
