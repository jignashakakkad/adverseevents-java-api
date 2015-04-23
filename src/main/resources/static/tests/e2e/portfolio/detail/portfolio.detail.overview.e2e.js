var PortfolioDetailPage = require ('./pages/portfolio.detail.page.js');

describe('The OVERVIEW DETAIL TAB on PORTFOLIO page with only JNJ', function () {

    PortfolioDetail = new PortfolioDetailPage();

    it('should navigate to company page when clicking on individual company', function () {
        PortfolioDetail.setCookies();
        browser.get('#/portfolio/detail/'+PortfolioDetail.testedId.toString()+'/overview/');
        browser.executeScript('window.scrollTo(0,10000);').then(function () {
            link = element(by.link('#/company/14-1/overview'));
            // expect(link.isPresent()).toBe(true);
        });
    });

    it('should have 1 item in the list', function () {
        PortfolioDetail.Rows.filter(function (elem, index) {
            return elem
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(1);
        });
    });

    xit('should have Johnson & Johnson in the list of companies', function () {
        expect(element(by.linkText('Johnson & Johnson')).isPresent()).toBe(true);
    });

    it('should have a CSV export button', function () {
        expect(PortfolioDetail.csvButton.isPresent()).toBe(true);
    });

    it('should have 12 columns', function () {
        expect(PortfolioDetail.Columns()).toEqual(12);
    });

    it('should have a summary panel', function () {
        expect(PortfolioDetail.summaryPanel.isPresent()).toBe(true);
    });

    it('should have a panel for top 8 drugs by 2013 revenue', function () {
        expect(PortfolioDetail.topDrugsPanel.isPresent()).toBe(true);
    });

    it('should display the top companies highchart in the company overview substate', function() {
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            expect(PortfolioDetail.topChartTitle.getText()).toBe('Top 8 Companies by Total Product Revenue');
        });
    });

    it('should navigate to drug overview substate from top dropdown', function () {
        PortfolioDetail.overviewDropdown.click();
        PortfolioDetail.drugOverviewButton.click();
        expect(browser.getCurrentUrl()).toContain('/overview/drug-overview');
    });

    it('should display the top drugs highchart in the drug overview substate', function() {
        expect(PortfolioDetail.topChartTitle.getText()).toBe('Top 8 Drugs by 2014 Revenue');
    });

    it('should have 16 columns in the drug overview substate', function() {
        browser.executeScript('window.scrollTo(0,10000);').then(function () {
            expect(PortfolioDetail.Columns()).toEqual(16);
        });
    });

    it('should navigate to drug detail substate from top dropdown', function () {
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            PortfolioDetail.drugOverviewDropdown.click();
            PortfolioDetail.drugDetailButton.click();
            expect(browser.getCurrentUrl()).toContain('/overview/drug-detail');
        });
    });

    it('should display the top drugs highchart in the drug detail substate', function() {
        expect(PortfolioDetail.topChartTitle.getText()).toBe('Top 8 Drugs by 2014 Revenue');
    });

    it('should have 16 columns in the drug detail substate', function() {
        browser.executeScript('window.scrollTo(0,10000);').then(function () {
            expect(PortfolioDetail.Columns()).toEqual(16);
        });
    });

});
