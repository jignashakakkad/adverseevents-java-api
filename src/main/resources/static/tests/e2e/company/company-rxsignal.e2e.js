var CompanyPage = require ('./pages/company.page.js');

describe('The RxSignal tab on the Company page for Mylan', function () {

    CompanyPage = new CompanyPage();

    beforeEach(function () {
        browser.get('#/company/'+CompanyPage.testedId.toString()+'/rxsignal-summary');
    });

    it('should have at least 22 items in the list', function () {
        expect(CompanyPage.getTotalRows()).toBeGreaterThan(22);
    });

    it('should have an Active Rxsignal of ' +CompanyPage.stavudineWatchlist+ ' for Stavudine', function () {
        expect(CompanyPage.getCellVal(0, 'colt2')).toEqual(CompanyPage.stavudineWatchlist);
    });

    it('should have an Avg. ROR of ' +CompanyPage.stavudineAvgROR+ ' for Stavudine', function () {
        expect(CompanyPage.getCellVal(0, 'colt5')).toEqual(CompanyPage.stavudineAvgROR);
    });
});
