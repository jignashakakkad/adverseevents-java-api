/**
 * @module test.portfolio.users
 * @name portfolioUserService
 * @description
 * Tests for portfolioUserService under portfolio.users
 * _Enter the test description._
 * */


describe('Service: portfolioUserService', function () {

    // load the service's module
    beforeEach(module('portfolio.users'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (portfolioAuthService) {
        service = portfolioAuthService;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined ', function () {
        expect(service).toBeDefined();
    });
});
/**
 * @module test.portfolio.users
 * @name portfolio.usersCtrl
 * @description
 * Tests for portfolio.usersCtrl under portfolio.users
 * _Enter the test description._
 * */


xdescribe('Controller: portfolio.manager.PortfolioLoginCtrl', function () {

    // load the controller's module
    beforeEach(module('portfolio.manager'));

    var ctrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('PortfolioLoginCtrl', {
            $scope: scope
        });
    }));

    it('should be defined', function () {
        expect(ctrl).toBeDefined();
    });
});
