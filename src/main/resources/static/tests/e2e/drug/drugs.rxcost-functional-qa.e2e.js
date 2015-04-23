describe('The drug rxcost route', function () {

    var drug = 'AMBIEN';

    function getCell(num) {
        return element.all(by.css('td')).then(function(cells) {
            _avgPtCost = cells[num].getText();
            return _avgPtCost;
        });
    }

    function uncheckDrugs(limit) {
        element(by.className('fa-cog')).click();
        element.all(by.className('multiSelectLi')).then(function(options) {
            for (x = 0; x < limit; x++) {
                options[x].click();
            };
        });
    }

    // beforeEach(function () {

    // });

    it('should display the drug rxcost tab for ' +drug, function () {
        browser.get('#/drugs/detail/28/cost');
        expect(element(by.css('#drugdetail-report-header')).getText()).toContain(drug);
    });

    it('should display a summary panel with data', function() {
        _avgPtCost = getCell(1);
        expect(_avgPtCost).not.toBe(undefined);
    });

    it('should display a pie chart with on label vs off label cost data', function () {
       expect(element(by.css('path'))).toBeDefined();
    });

    it('should display a table with the top 10 adverse events by cost', function () {
        expect(element.all(by.repeater('row in renderedRows')).count()).toBe(10);
    });

    it('should remove a column, then display custom configured page on referesh', function () {
        browser.executeScript('window.scrollTo(0,500);').then(function () {
            uncheckDrugs(2);
        });
        browser.get('#/drugs/detail/28/cost');
        expect(element.all(by.css('.ngHeaderSortColumn')).count()).toBe(5);
    });

    it('should reset column order to default on local storage clear', function () {
        browser.executeScript('window.scrollTo(0,10000);').then(function () {
            element(by.buttonText("Restore Default Settings")).click();
            expect(element.all(by.css('.ngHeaderSortColumn')).count()).toBe(6);
        });
    });

    it('should display all adverse events on show all AE button click', function () {
        browser.executeScript('window.scrollTo(0,10000);').then(function () {
            element(by.buttonText("Show All Adverse Events")).click();
            expect(element.all(by.repeater('row in renderedRows')).count()).toBeGreaterThan(10);
        });
    });

    it('should display just 10 results one show fewer AE button click', function () {
        browser.executeScript('window.scrollTo(0,10000);').then(function () {
            element(By.buttonText("Show Fewer Adverse Events")).click();
            expect(element.all(by.repeater('row in renderedRows')).count()).toBe(10);
        });
    });

    xit('should not allow navigation to rxcost tab for a drug with no cost data', function () {
        // browser.get('/#/drugs/detail/8594/');
        // costneed to implement functionality
    });

});
