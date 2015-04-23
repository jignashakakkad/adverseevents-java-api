var CompanyPage = require ('./pages/company.page.js');

describe('The Indication Tab on Company page for Mylan', function () {

    CompanyPage = new CompanyPage();

    beforeEach(function () {
        browser.get('#/company/'+CompanyPage.testedId.toString()+'/indication');
    });

    it('should have at least 22 items in the list', function () {
        expect(CompanyPage.getTotalRows()).toBeGreaterThan(22);
    });

    it('should have a weighted RxScore of ' +CompanyPage.MDDRxScore+ ' for Major Depressive Disorder', function () {
        expect(CompanyPage.getCellVal(5, 'colt2')).toEqual(CompanyPage.MDDRxScore);
    });

    it('should have ' +CompanyPage.MDDRxSignalADE+ ' RxSignal Active ADE\'s for Major Depressive Disorder', function () {
        CompanyPage.uncheckColumns(3);
        expect(CompanyPage.getCellVal(5, 'colt5')).toEqual(CompanyPage.MDDRxSignalADE);
    });

});
