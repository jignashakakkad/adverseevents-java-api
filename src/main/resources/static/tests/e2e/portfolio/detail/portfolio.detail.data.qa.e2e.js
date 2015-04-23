describe('The OVERVIEW TAB on PORTFOLIO page for PFIZER', function () {

    var testedId = '9-1';
    var testTotalTabs = 9;
    var Tabs = element.all(by.repeater('tab in tabs'));
    var SummaryRxScore2013 = element(by.binding('Summary.Metrics.metric_rxscore_2013.label'));
    // write edge cases for: http://192.168.0.14:9000/#/portfolio/743-1/overview

    // beforeEach(function () {

    // });


    xit('should have a 2013 rxscore of 47.62', function () {
        PortfolioDetail.setCookies();
        PortfolioDetail.getPortfolioManager();
        browser.get('#/portfolio/'+testedId.toString()+'/overview');
        expect(SummaryRxScore2013.getText()).toEqual('47.62');
    });

    // empty until mock data functional
    xit('should display Portfolio name of Test Portfolio', function () {


    });

    // add more when mock data functional
    xit('should display Lead Company column on click', function () {

        $('.ngHeaderButton').click();
        element(by.css('.multiSelectUl li:nth-child(3)')).click();
        expect($('.ngHeaderText.ng-binding.colt2').getText()).toEqual('Lead Company');

    });

    // add more when mock data functional
    xit('should display Partner Companies column on click', function () {

        $('.ngHeaderButton').click();
        element(by.css('.multiSelectUl li:nth-child(4)')).click();
        expect($('.ngHeaderText.ng-binding.colt3').getText()).toEqual('Partner Companies');

    });

    xit('should have Edit Portfolio button', function () {

        expect($('.form-group.inline button:nth-child(2)').getText()).toEqual('Edit Portfolio');

    });

    xit('should have a total of 9 tabs', function () {
        Tabs.filter(function (elem, index) {
            return elem.getTagName('tab-heading').getText()
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(testTotalTabs);
        });
    });

});
