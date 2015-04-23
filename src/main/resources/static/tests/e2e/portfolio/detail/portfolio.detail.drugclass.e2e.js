var PortfolioDetailPage = require ('./pages/portfolio.detail.page.js');

describe('The CLASS DETAIL TAB on PORTFOLIO DETAIL page with only JNJ', function () {

    PortfolioDetail = new PortfolioDetailPage();

    it('should navigate to drug class page when clicking on individual drug class', function () {
        PortfolioDetail.setCookies();
        browser.get('#/portfolio/detail/'+PortfolioDetail.testedId.toString()+'/drugclass');
        link = element(by.link('#/druggroup/drugclass/A02BC/overview'));
        expect(link.isPresent()).toBe(true);
    });

    it('should have 47 items in the list', function () {
        PortfolioDetail.Rows.filter(function (elem, index) {
            return elem
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(47);
        });
    });

    it('should have Proton pump inhibitors in the list of drug classes', function () {
        expect(element(by.linkText('Proton pump inhibitors')).isPresent()).toBe(true);
    });

    it('should have a CSV export button', function () {
        expect(PortfolioDetail.csvButton.isPresent()).toBe(true);
    });

    it('should have 5 columns', function () {
        expect(PortfolioDetail.Columns()).toEqual(5);
    });

});
