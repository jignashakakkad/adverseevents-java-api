/**
 * Created by cerdman on 1/7/15.
 */
describe('Module: portfolio.details.services', function () {

    var service = null, BaseOutput = null;
    beforeEach(module('portfolio.detail.services'));

    describe('Service: portfolioSummaryService', function () {

        beforeEach(inject(function (_portfolioSummaryService_) {
            service = _portfolioSummaryService_;
            BaseOutput = {"Class": {}, "Indication": {}, "Drug": {}, "Metrics": {}};

        }));

        it('the service should NOT be undefined', function () {
            expect(service).not.toBeUndefined();
        });

        it('should expose the getSummary method', function () {
            expect(service.getSummary).toBeDefined();
            expect(typeof service.getSummary).toBe('function');
        });

        it('should return the default collection from getSummary if Revenues is empty', function () {
            var _summary = service.getSummary([], [{}], [{}], [{}]);

            expect(_summary).toEqual(BaseOutput);
        });

    });

    describe('Service: portfolioChartService', function () {
        beforeEach(inject(function (_portfolioChartService_) {
            service = _portfolioChartService_;
            BaseOutput = {"Class": {}, "Indication": {}, "Drug": {}, "Metrics": {}};

        }));

        //TODO add stuff

    });

    describe('Service: portfolioGridService', function () {
        beforeEach(inject(function (_portfolioGridService_) {
            service = _portfolioGridService_;
            BaseOutput = {"Class": {}, "Indication": {}, "Drug": {}, "Metrics": {}};

        }));

        //TODO add stuff

    });

});
