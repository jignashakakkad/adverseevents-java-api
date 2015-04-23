describe('The RxOutcome report', function () {

    var outcomeSignalCount = '';
    var summarySignalCount = '';
    var outcomesTestIndication = 'Multiple Sclerosis';

    function getTecfideraRx(colNum) {
        browser.get('#/druggroup/indication/N0000002052/rxsignal');
        return element.all(by.repeater('row in renderedRows')).then(function(rows) {
            _outcomeSignalCount = rows[9].element(by.className(colNum)).getText()
            .then(function (data) {
                return data.replace(/ /g,'');
            });
            return _outcomeSignalCount;
        });
    }

    function getTecfideraSummaryRx(colNum) {
        browser.get('#/company/25-1/rxsignal-summary');
        return element.all(by.repeater('row in renderedRows')).then(function(rows) {
             _summarySignalCount = rows[6].element(by.className(colNum)).getText()
             .then(function (data) {
                return data.replace(/ /g,'');
            });
            return _summarySignalCount;
        });
    }

    function getDrugSignalCount(style) {
        browser.get('#/drugs/detail/2285/rxsignal');
        return element.all(by.css('.colt1'+style))
            .then(function (data) {
                return (data.length);
            });

        return _drugSignalCount;
    }

    function getCellValue(colNum) {
        return element.all(by.repeater('row in renderedRows')).then(function(rows) {
            cell = rows[0].element(by.className(colNum)).getText()
                .then(function (data) {
                return data.replace(/ /g,'');
            });
            return cell;
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

    function filterDrugs(input) {
        element(by.model("filterText")).sendKeys(input);
    }

    function getRowCol(rowNum, colNum) {
        return element.all(by.repeater('row in renderedRows')).then(function(rows) {
             _cellVal = rows[rowNum].element(by.className(colNum)).getText()
             .then(function (data) {
                return data;
            });
            return _cellVal;
        });
    }

    beforeEach(function () {
        browser.get('#/druggroup/indication/N0000002052/rxsignal');
    });

    it('should load the outcomes rxsignal tab for ' +outcomesTestIndication, function () {

        expect(element(by.className('panel-heading')).getText()).toEqual('RxSignal Summary for ' +outcomesTestIndication);

    });

    xit('should have values in the rxsignal tab matching the active signal count in the company rxsignal summary page', function () {

        expect(getTecfideraRx('colt2')).toEqual(getTecfideraSummaryRx('colt2'));

    });

    xit('should have values in the rxsignal tab matching the drug page active signal count ', function () {

        expect(getTecfideraRx('colt2')).toEqual(getDrugSignalCount('red'));

    });

    xit('should have values in the rxsignal tab matching the watchlist signal count in the company rxsignal summary page', function () {

        expect(getTecfideraRx('colt3')).toEqual(getTecfideraSummaryRx('colt3'));

    });

    xit('should have values in the rxsignal tab matching the drug page watchlist signal count ', function () {

        expect(getTecfideraRx('colt3')).toEqual(getDrugSignalCount('yellow'));

    });

    it('should have values in the adverse events tab for the Fosamax column when viewing Postmenopausal Osteoporosis report', function () {

        browser.get('#/druggroup/indication/N0000003303/adverseevents/IR');
        uncheckDrugs(14);
        var fosamaxCell = getCellValue('colt14');
        expect(fosamaxCell).not.toEqual('NaN%');

    });

    it('should display Drug Class in header for barbiturates and derivatives', function () {

        browser.get('#/druggroup/drugclass/N03AA/overview');
        expect(element(by.binding('DrugGroup.parentResource.route')).getText()).toEqual('Drug Class Report: Barbiturates and derivatives');

    });

    it('should match the cell contents of the pancreatitis events for the drug victoza',function(){
        browser.get('#/druggroup/indication/N0000000954/adverseevents/IR');
        uncheckDrugs(34);
        filterDrugs('pancreatitis');
        var _cellValue = getRowCol(1, 'colt34');
        expect(_cellValue).toBe("-");

    });

});
