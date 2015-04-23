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
    beforeEach(module('portfolio.manager.service'));
    var service, $httpBackend;

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */

    describe('CRUD Operations', function () {
        // instantiate service

        /**
         * Setup test setup helpers
         *
         */
        beforeEach(inject(function (portfolioManagerService, _$httpBackend_) {
            service = portfolioManagerService;
            $httpBackend = _$httpBackend_;
        }));

        /**
         * Setup test tear-down helpers
         *
         */
        afterEach (function () {
            $httpBackend.verifyNoOutstandingExpectation ();
            $httpBackend.verifyNoOutstandingRequest ();
        });

        /**
         * Specs for portfolio API manager
         * Key functionality of our user story and business logic to cover:
         * - It can get a collection of portfolios from backend
         * - It can get a single portfolio object
         * - It can DELETE a single portfolio
         * - It can
         */

        it('portfolioManagerService should be injected and defined', function () {
            expect(service).toBeDefined();
        });

        it('method getPortfolios() defined', function () {
            expect(service.getPortfolios).toBeDefined();
        });

        it('should GET /portfolio/:id', function () {
            expect(service.getPortfolio).toBeDefined();
            $httpBackend.expect('GET', /portfolio\/1/)
                .respond(200, { id : 1, label : 'Test Portfolio' });

            service.getPortfolio(1);

            $httpBackend.flush();
        });

        it('should NOT GET /portfolio/:id when Unauthorized', function () {
            expect(service.getPortfolio).toBeDefined();
            $httpBackend.expect('GET', /portfolio\/1/)
                .respond(401, { message: 'Unauthorized' });

            service.getPortfolio(1)
                .then(function (data) {
                    expect(data.length).toBeFalsy();
                });

            $httpBackend.flush();
        });

        it('method createPortfolio(portName, user_id) defined', function () {
            expect(service.createPortfolio).toBeDefined();
        });

        it('method updatePortfolio(portfolioObject) defined', function () {
            expect(service.updatePortfolio).toBeDefined();
        });

        it('method deletePortfolio(portfolioObject) defined', function () {
            expect(service.deletePortfolio).toBeDefined();
        });

        it('returns an object when getting portfolio list', function () {
            $httpBackend.expect('GET', /portfolio/)
                .respond(200, [{},{},{}]);
            var list = service.getPortfolios();
            $httpBackend.flush();

            expect(typeof list).toBe('object');
        });

    });

    describe(".getPortfolios() - GET All Portfolios", function () {
    });
});
