describe('Drug Report Basic Page Function', function () {

    //Helper function to check for classes - http://stackoverflow.com/questions/20268128/how-to-test-if-an-element-has-class-using-protractor
    var hasClass = function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    describe('The ui-tabs tabset on drug page for AMBIEN', function () {

        var testedId = 28;

        var testTabNameFirst = 'Overview';
        var testTabNameLast = 'Cases';
        var testTotalTabs = 7;

        var Tabs = element.all(by.repeater('tab in tabs'));

        var firstTabName = element(by.repeater('tab in tabs').row("0"));
        var rxscoreBadge = element(by.model('second'));


        beforeEach(function () {
            browser.get('#/drugs/detail/' + testedId.toString());
        });


        it('should have a total of 7 tabs', function () {
            Tabs.filter(function (elem, index) {
                return elem.getTagName('tab-heading').getText();
            }).then(function (filteredElements) {
                expect(filteredElements.length).toEqual(testTotalTabs);
            });
        });

        it('should have the last tab named: ' + testTabNameLast, function () {
            Tabs.filter(function (elem, index) {
                return elem.getTagName('tab-heading').getText();
            }).then(function (filteredElements) {
                expect(filteredElements[filteredElements.length - 1].getText()).toEqual('Cases');
            });
        });

        it('should have the first tab named: ' + testTabNameFirst, function () {
            Tabs.filter(function (elem, index) {
                return elem.getTagName('tab-heading').getText();
            }).then(function (filteredElements) {
                expect(filteredElements[filteredElements.length - filteredElements.length].getText()).toEqual('Overview');
            });
        });

        xit('AEA-81 - Restore button should have btn-info class to match rest of site', function () {
            browser.sleep(3000);
            browser.get('#/drugs/detail/'+ testedId.toString() + '/rxsignal');
            expect(hasClass(element(by.partialButtonText('Restore Default Settings')), 'btn-info')).toBe(true);

        });

    });

});
