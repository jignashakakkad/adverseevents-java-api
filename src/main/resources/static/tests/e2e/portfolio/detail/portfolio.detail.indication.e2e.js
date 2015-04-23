var PortfolioDetailPage = require ('./pages/portfolio.detail.page.js');

describe('The INDICATION DETAIL TAB on PORTFOLIO page with only JNJ', function () {

    PortfolioDetail = new PortfolioDetailPage();

    by.addLocator('link',
        /**
         * Find <a> element by href attribute
         * @param {string} href
         * @param {Node} [parentElement=]
         * @returns {Array.<Node>}
         */
        function (href, parentElement) {
            parentElement = parentElement || document;
            var links = parentElement.querySelectorAll('a');
            return Array.prototype.filter.call(links, function (link) {
                return (link.href && ((link.href === href) || (link.href === (link.baseURI + href))));
            });
        });

    //beforeEach(function () {


    //});

    it('should navigate to indication page when clicking on individual indication', function () {
        PortfolioDetail.setCookies();
        browser.get('#/portfolio/detail/'+PortfolioDetail.testedId.toString()+'/indication');
        spafLink = element(by.link('#/druggroup/indication/AEI00000049/overview'));
        expect(spafLink.isPresent()).toBe(true);
    });

    it('should have 30 items in the list', function () {
        PortfolioDetail.Rows.filter(function (elem, index) {
            return elem
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(30);
        });
    });

    it('should have SPAF (Stroke Prevention in Atrial Fibrillation Patients) in the list of indications', function () {
        expect(element(by.linkText('SPAF (Stroke Prevention in Atrial Fibrillation Patients)')).isPresent()).toBe(true);
    });

    it('should have a CSV export button', function () {
        expect(PortfolioDetail.csvButton.isPresent()).toBe(true);
    });

    it('should have 5 columns', function () {
        expect(PortfolioDetail.Columns()).toEqual(5);
    });

});
