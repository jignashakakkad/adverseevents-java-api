var CompanyPage = require ('./pages/company.page.js');

describe('The REPORTING TAB on COMPANY page for JNJ', function () {

    CompanyPage = new CompanyPage();

    beforeEach(function () {
        browser.get('#/company/'+CompanyPage.JNJtestedId.toString()+'/reporting');
    });

    it('should have at least 22 items in the list', function () {
        expect(CompanyPage.getTotalRows()).toBeGreaterThan(22);
    });

    it('should have REMICADE in the list of drugs', function () {
        CompanyPage.renderedRows.then(function (rows) {
            expect(rows[1].element(by.className('col0')).getText()).toContain('Remicade');
        });
    });

});
