describe('Company Services Module (company.services)', function() {

    beforeEach(module('company.services'));

    it('should expose the companyService method', inject(function(companyService) {

        expect(companyService).toBeDefined();

    }));
    it('should expose the companyChartService method', inject(function(companyChartService) {

        expect(companyChartService).toBeDefined();
        expect(companyChartService.getOverviewChart()).toBeDefined();

    }));
    it('should expose the companyRxsignalGridService method: .getRxsignalGrid', inject(function(companyRxsignalGridService) {

        expect(companyRxsignalGridService.getColDefs).toBeDefined();

        describe('the getColDefs(detail) column def collections have min length of 5', function () {
        expect(companyRxsignalGridService.getColDefs('detail')).toBeDefined();

            expect(companyRxsignalGridService.getColDefs('detail').length).toBeGreaterThan(5);

        });
        describe('the getColDefs(summary) column def collections should have minimum length of 5', function () {
        expect(companyRxsignalGridService.getColDefs('summary')).toBeDefined();

            expect(companyRxsignalGridService.getColDefs('summary').length).toBeGreaterThan(5);

        });
    }));

    it('should expose the companyGridService methods: .getColDefs(), setColDefs', inject(function(companyGridService) {

        expect(companyGridService).toBeDefined();
        expect(companyGridService.getColDefs).toBeDefined();
        expect(companyGridService.setColDefs).toBeDefined();

    }));
    it('should expose the companySummaryService methods: getSummary()', inject(function(companySummaryService) {


        expect(companySummaryService).toBeDefined();
        expect(companySummaryService.getSummary).toBeDefined();

    }));

});
