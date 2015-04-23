var CompanyPage = require ('./pages/company.page.js');

describe('The Class Tab on Company page for Mylan', function () {

    CompanyPage = new CompanyPage();

    beforeEach(function () {
        browser.get('#/company/'+CompanyPage.testedId.toString()+'/drugclass');
    });

    it('should have at least 22 items in the list', function () {
        expect(CompanyPage.getTotalRows()).toBeGreaterThan(22);
    });

    it('should have ' +CompanyPage.triazoleDrugs+ ' drugs for Triazole Derivatives', function () {
        expect(CompanyPage.getCellVal(4, 'colt1')).toEqual(CompanyPage.triazoleDrugs);
    });

    it('should have a Total Weighted RxScore of ' +CompanyPage.triazoleTotal+ ' for Triazole Derivatives', function () {
        expect(CompanyPage.getCellVal(4, 'colt3')).toEqual(CompanyPage.triazoleTotal);
    });

});
