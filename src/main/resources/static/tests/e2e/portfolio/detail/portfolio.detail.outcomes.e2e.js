var PortfolioDetailPage = require ('./pages/portfolio.detail.page.js');

describe('The OUTCOMES DETAIL TAB on PORTFOLIO page with only JNJ', function () {

    PortfolioDetail = new PortfolioDetailPage();

    it('should navigate to drug rxsignal page when clicking on individual drug', function () {
        PortfolioDetail.setCookies();
        browser.get('#/portfolio/detail/'+PortfolioDetail.testedId.toString()+'/outcomes/cumulative');
        link = element(by.link('#/drugs/detail/210/rxsignal'));
        expect(link.isPresent()).toBe(true);
    });

    it('should have 23 initially rendered items in the list', function () {
        PortfolioDetail.Rows.filter(function (elem, index) {
            return elem
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(23);
        });
    });

    it('should have ACIPHEX in the list of drugs', function () {
        expect(element(by.linkText('Aciphex')).isPresent()).toBe(true);
    });

    it('should have a CSV export button', function () {
        expect(PortfolioDetail.csvButton.isPresent()).toBe(true);
    });

    it('should have 10 columns', function () {
        expect(PortfolioDetail.Columns()).toEqual(10);
    });

    it('should display 2014 data when selected from dropdown', function() {
        PortfolioDetail.get2014Data();
        element(by.link('#/portfolio/detail/'+PortfolioDetail.testedId.toString()+'/outcomes/2014')).click();
        var compleraTotal = PortfolioDetail.getCellVal(2, 'colt1');
        expect(compleraTotal).toContain(0.00)
    });

});
