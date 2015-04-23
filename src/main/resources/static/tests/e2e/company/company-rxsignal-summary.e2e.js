var CompanyPage = require ('./pages/company.page.js');

describe('The RxSignal Summary tab on the Company page for Mylan', function () {

    CompanyPage = new CompanyPage();

    beforeEach(function () {
        browser.get('#/company/'+CompanyPage.testedId.toString()+'/rxsignal');
    });

    it('should have at least 22 items in the list', function () {
        expect(CompanyPage.getTotalRows()).toBeGreaterThan(22);
    });

    it('should have an ROR of ' +CompanyPage.aloprimROR+ ' for Aloprim', function () {
        expect(CompanyPage.getCellVal(0, 'colt8')).toContain(CompanyPage.aloprimROR);
    });

    it('should have ' +CompanyPage.aloprimPS+ ' Primary Suspects for Aloprim', function () {
        expect(CompanyPage.getCellVal(0, 'colt10')).toEqual(CompanyPage.aloprimPS);
    });

    it('should have an Incidence Rate of ' +CompanyPage.aloprimIR+ ' for Aloprim', function () {
        expect(CompanyPage.getCellVal(0, 'colt14')).toEqual(CompanyPage.aloprimIR);
    });
});
