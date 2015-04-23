var CompanyPage = require ('./pages/company.page.js');

describe('The RxScore Tab on Company page for Mylan', function () {

    CompanyPage = new CompanyPage();

    beforeEach(function () {
        browser.get('#/company/'+CompanyPage.testedId.toString()+'/rxscore');
    });

    it('should have at least 22 items in the list', function () {
        expect(CompanyPage.getTotalRows()).toBeGreaterThan(22);
    });

    it('should have an RxScore of ' +CompanyPage.sotalolRxScore+ ' for Sotalol', function () {
        expect(CompanyPage.getCellVal(0, 'colt2')).toEqual(CompanyPage.sotalolRxScore);
    });

    it('should have a Primary Indication of ' +CompanyPage.sotalolPI+ ' for Sotalol', function () {
        CompanyPage.uncheckColumns(3);
        expect(CompanyPage.getCellVal(0, 'colt5')).toEqual(CompanyPage.sotalolPI);
    });

});
