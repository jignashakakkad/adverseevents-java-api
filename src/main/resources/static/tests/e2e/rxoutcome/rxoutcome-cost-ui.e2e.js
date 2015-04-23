function RxoutcomePage() {
    this.drugGroupId = "N0000002052";
    this.drugGroupType = "indication";

    this.tabs = element.all(by.repeater('tab in tabs'));
    this.host = "localhost";
    this.get = function (tab) {
        browser.get('#/druggroup/' + this.drugGroupType + "/" + this.drugGroupId.toString() + '/' + tab);
    };
    this.noOfColumns = 6;

}

describe('RxOutcomePage : Local Storage logic test Suite', function () {
    var page = new RxoutcomePage();
    beforeEach(function () {
    });

    it('It should contain 6 columns in grid', function () {
        page.get("cost");
        var grid = element(by.id('drugGroupPatientCostsGrid'));
        grid.all(by.repeater('col in renderedColumns')).then(function (cols) {
            var column = cols.length / 26;
            expect(column).toEqual(page.noOfColumns);
        });
    });
    
    it('It should allow Column selection from grid settigs and should reflect the grid', function () {
        page.get("cost");
        var grid = element(by.id('drugGroupPatientCostsGrid'));
        var el = element(by.className('fa-cog'));
        browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
        el.click();
        element.all(by.className('multiSelectLi')).then(function (options) {
            for (x = 1; x < 2; x++) {
                options[x].click();
            }
        });
        grid.all(by.repeater('col in renderedColumns')).then(function (cols) {
            var column = cols.length / 26;
            expect(column).toEqual(page.noOfColumns-1);
        });
    });

    it('It should contain local storage for Outcomes Cost Grid', function () {
        page.get("cost");
        browser.executeScript('return window.localStorage.getItem("aex.druggroup.detail.costs.outcomesCosts.gridCols");').then(function (data) {
            expect(data).not.toBe(null);
        });
    });

    it('should only remove aex.outcomesCost grid header from local storage', function () {
        page.get("cost");
        // get element by css
        element.all(by.css('.restoreSortButton')).then(function (items) {
            items[0].click();
        });
        // Check it should still contain rxsignal localStorage
        browser.executeScript('return window.localStorage.getItem("aex.druggroup.detail.costs.outcomesCosts.gridCols");').then(function (data) {
            expect(data).toBe(null);
        });
    });

});

describe('RxOutcomePage Cost tab: Grid View test Suite', function () {
    var page = new RxoutcomePage();
    beforeEach(function () {
        //
    });
    it('drugGroupPatientCostsGrid should contain 25 rows', function () {
        page.get("cost");
        var grid = element(by.id('drugGroupPatientCostsGrid'));
        grid.all(by.repeater('row in renderedRows')).then(function (rows) {
            expect(rows.length).toBe(25);
        });
    });




});
