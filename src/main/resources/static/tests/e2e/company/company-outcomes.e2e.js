var CompanyPage = require ('./pages/company.page.js');

describe('The Outcomes Tab on Company page for Mylan', function () {

    CompanyPage = new CompanyPage();

    beforeEach(function () {
        browser.get('#/company/'+CompanyPage.testedId.toString()+'/outcomes/cumulative');
    });

    it('should have at least 22 items in the list', function () {
        expect(CompanyPage.getTotalRows()).toBeGreaterThan(22);
    });

    it('should have a total outcome rate of ' +CompanyPage.performistOutcome+ ' for cumulative data', function () {
        expect(CompanyPage.getCellVal(8, 'colt1')).toEqual(CompanyPage.performistOutcome);
    });

    it('should have a total outcome rate of ' +CompanyPage.performistOutcome2014+ ' for 2014 data', function () {
        CompanyPage.getOutcomes('2014');
        expect(CompanyPage.getCellVal(8, 'colt1')).toEqual(CompanyPage.performistOutcome2014);
    });

});
