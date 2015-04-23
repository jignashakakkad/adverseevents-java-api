var PortfolioDetailPage = require ('./pages/portfolio.detail.page.js');

describe('The REPORTING TAB on PORTFOLIO DETAIL page for portfolio with only JNJ', function () {

    PortfolioDetail = new PortfolioDetailPage();

    // beforeEach(function () {

    // });

    it('should have 23 items in the list', function () {
        PortfolioDetail.setCookies();
        browser.get('#/portfolio/detail/'+PortfolioDetail.testedId.toString()+'/reporting');
        PortfolioDetail.Rows.filter(function (elem, index) {
            return elem
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(23);
        });
    });

    it('should have Victoza in the list of drugs', function () {
        expect(element(by.linkText('Victoza')).isPresent()).toBe(true);
    });

    it('should have a CSV export button', function () {
        expect(PortfolioDetail.csvButton.isPresent()).toBe(true);
    });

    it('should have 13 columns', function () {
        expect(PortfolioDetail.Columns()).toEqual(13);
    });

});
