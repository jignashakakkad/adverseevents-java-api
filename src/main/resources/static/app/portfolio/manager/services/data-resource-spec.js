/**
 * @module test.portfolio.manager
 * @name portfolioManagerService
 * @description
 * Tests for portfolioManagerService under portfolio.manager
 * _Enter the test description._
 * */


describe('Service: portfolioManagerService', function () {
    'use strict';
    // load the service's module
    beforeEach(module('ui.router'));
    beforeEach(module('portfolioManager.services'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (portfolioManagerService) {
        service = portfolioManagerService;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });

    it('should have method getPortfolios() defined', function () {
        expect(service.getPortfolios).toBeDefined();
    });

    it('should have method getPortfolio(id) defined', function () {
        expect(service.getPortfolio).toBeDefined();
    });

    it('should have method createPortfolio(portName, user_id) defined', function () {
        expect(service.createPortfolio).toBeDefined();
    });

    it('should have method updatePortfolio(portfolioObject) defined', function () {
        expect(service.updatePortfolio).toBeDefined();
    });

    it('should have method deletePortfolio(portfolioObject) defined', function () {
        expect(service.deletePortfolio).toBeDefined();
    });


    it('should return an object when getting portfolio list', function () {
        var list = service.getPortfolios();
        expect(typeof list).toBe('object');
    });

});
