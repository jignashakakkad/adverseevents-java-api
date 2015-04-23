var CompanyPage = require ('./pages/company.page.js');

describe('The overview tab on the COMPANY page for MYLAN', function () {

    CompanyPage = new CompanyPage();

    beforeEach(function () {
        browser.get('#/company/'+CompanyPage.testedId.toString()+'/overview');
    });

    it('should have a 2013 rxscore of 33.13', function () {
        expect(CompanyPage.SummaryRxScore2013.getText()).toContain(CompanyPage.mylanRxscore);
    });

    it('should display a bar chart for Top 8 Drugs by 2013 Revenue', function () {
        expect(CompanyPage.barChart.isPresent()).toBe(true);
    });

    it('should have at least 22 items displayed on the Company Products grid', function () {
        expect(CompanyPage.getTotalRows()).toBeGreaterThan(22);
    });

});
