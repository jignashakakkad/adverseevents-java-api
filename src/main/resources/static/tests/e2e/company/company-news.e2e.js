var CompanyPage = require ('./pages/company.page.js');

describe('The Events tab on the Company page for Mylan', function () {

    CompanyPage = new CompanyPage();

    beforeEach(function () {
        browser.get('#/company/'+CompanyPage.testedId.toString()+'/news');
    });

    it('should have at least 22 items in the News and Events Control list', function () {
        expect(CompanyPage.getTotalRows()).toBeGreaterThan(22);
    });

});
