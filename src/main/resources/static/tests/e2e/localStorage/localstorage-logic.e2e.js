function CompanyPage() {
    this.companyId = "14-1";
    this.tabs = element.all(by.repeater('tab in tabs'));
    this.get = function (tab) {
        browser.get('#/company/' + this.companyId.toString() + '/'+tab);
    };

}
describe('Local Storage logic test Suite', function () {
    var page = new CompanyPage();
    beforeEach(function () {
       //
    });
    it('It should contain local storage for Overview', function () {
        page.get("overview");
        browser.executeScript('return window.localStorage.getItem("aex.company.detail.overview.gridCols")').then(function (data) {
            expect(data).not.toBe(null);
        });
    });
    it('It should contain local storage for Rxsignal', function () {
        page.get("rxsignal");
        browser.executeScript('return window.localStorage.getItem("aex.company.detail.rxsignal.gridCols")').then(function (data) {
            expect(data).not.toBe(null);
        });
    });
    it('should only remove aex.companyOverviewDetailGrid from local storage and leave companyRxsignalGrid', function(){
       page.get("overview");
       browser.executeScript('return window.localStorage.getItem("aex.company.detail.rxsignal.gridCols")').then(function (data) {
            expect(data).not.toBe(null);
       });
       browser.executeScript('return window.localStorage.getItem("aex.company.detail.overview.gridCols")').then(function (data) {
            expect(data).not.toBe(null);
       });
       // get element by css
       element(by.className("restoreSortOverviewCompanyGrid")).click();
       // Check it should still contain rxsignal localStorage
       browser.executeScript('return window.localStorage.getItem("aex.company.detail.rxsignal.gridCols")').then(function (data) {
            expect(data).not.toBe(null);
       });
    });

});
