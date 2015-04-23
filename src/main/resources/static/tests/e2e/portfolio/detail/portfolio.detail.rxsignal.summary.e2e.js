var PortfolioDetailPage = require ('./pages/portfolio.detail.page.js');

describe('The RXSIGNAL SUMMARY DETAIL TAB on PORTFOLIO page with only JNJ', function () {

    PortfolioDetail = new PortfolioDetailPage();


    it('should navigate to drug page when clicking on individual drug', function () {
        PortfolioDetail.setCookies();
        browser.get('#/portfolio/detail/'+PortfolioDetail.testedId.toString()+'/rxsignal-summary');
        link = element(by.link('#/drugs/detail/2055/rxsignal'));
        expect(link.isPresent()).toBe(true);
    });

    it('should have 23 initially rendered items in the list', function () {
        PortfolioDetail.Rows.filter(function (elem, index) {
            return elem
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(23);
        });
    });

    it('should have REMICADE in the list of drugs', function () {
        expect(element(by.linkText('Prezista')).isPresent()).toBe(true);
    });

    it('should have a CSV export button', function () {
        expect(PortfolioDetail.csvButton.isPresent()).toBe(true);
    });

    it('should have 10 columns', function () {
        expect(PortfolioDetail.Columns()).toEqual(10);
    });

    it('should have a bubble chart panel', function () {
        expect(PortfolioDetail.bubbleChartPanel.isPresent()).toBe(true);
    });

});
