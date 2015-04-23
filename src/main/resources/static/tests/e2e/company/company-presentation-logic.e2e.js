var CompanyPage = require ('./pages/company.page.js');

describe('The tabset on the COMPANY page for MYLAN', function () {

    CompanyPage = new CompanyPage();

    beforeEach(function () {
        browser.get('#/company/'+CompanyPage.testedId.toString()+'/overview');
    });

    it('should have a total of 9 tabs', function () {
        CompanyPage.Tabs.filter(function (elem, index) {
            return elem.getTagName('tab-heading').getText()
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(CompanyPage.testTotalTabs);
        });
    });

    it('should have the last tab named: ' + CompanyPage.testTabNameLast, function () {
        CompanyPage.Tabs.filter(function (elem, index) {
            return elem.getTagName('tab-heading').getText()
        }).then(function (filteredElements) {
            expect(filteredElements[filteredElements.length - 1].getText()).toEqual(CompanyPage.testTabNameLast);
        });
    });

    it('should have the first tab named: ' + CompanyPage.testTabNameFirst, function () {
        CompanyPage.Tabs.filter(function (elem, index) {
            return elem.getTagName('tab-heading').getText()
        }).then(function (filteredElements) {
            expect(filteredElements[filteredElements.length - filteredElements.length].getText()).toEqual('Overview');
        });
    });

});
