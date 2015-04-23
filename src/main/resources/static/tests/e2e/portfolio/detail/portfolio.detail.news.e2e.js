var PortfolioDetailPage = require ('./pages/portfolio.detail.page.js');

describe('The EVENTS DETAIL TAB on PORTFOLIO page with only JNJ', function () {

    PortfolioDetail = new PortfolioDetailPage();


    it('should navigate to drug rxsignal page when clicking on individual drug', function () {
        PortfolioDetail.setCookies();
        browser.get('#/portfolio/detail/'+PortfolioDetail.testedId.toString()+'/news');
        link = element(by.link('#/drugs/detail/7741/overview'));
        expect(link.isPresent()).toBe(true);
    });

    it('should have correct links for article headlines', function () {
        var headlineUrl = element(by.link('http://www.adverseevents.com/explorer/#/drugs/detail/7741/monitor?article=6236'));
        expect((headlineUrl).isPresent()).toBe(true)
    });

    it('should have 23 initially rendered items in the list', function () {
        PortfolioDetail.Rows.filter(function (elem, index) {
            return elem
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(23);
        });
    });

    it('should have REMICADE in the list of drugs', function () {
        expect(element(by.linkText('Remicade')).isPresent()).toBe(true);
    });

    it('should have a CSV export button', function () {
        expect(PortfolioDetail.csvButton.isPresent()).toBe(true);
    });

    it('should have 6 columns', function () {
        expect(PortfolioDetail.Columns()).toEqual(6);
    });

});
