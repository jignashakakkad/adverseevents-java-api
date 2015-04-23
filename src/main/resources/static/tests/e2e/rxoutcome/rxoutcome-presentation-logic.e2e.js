xdescribe('The RxOutcome report', function () {

    // Note: a failing test qualifies as completing these issues with label == test (so long as test actually exercises what it says it does).
    // Test case: RxOutcome report == Multiple Sclerosis, RxSignal tab. Drug == Tecfidera... Column = 'RxSignal Active' count etc....
    // This number should match the active count in the company rxsignal active total count page, or the total number of cells in the
    // Tecfidera drug report RxSignal tab that have RxSignal == 'Active'.
    // it('should have matching values in rxsignal tab for active signal counts for the drug X between rxoutcome and other pages')
    // it('should have matching values in rxsignal tab for watchlist signal counts for the drug X between rxoutcome and other reports')

    // added to handle the fact that remote debugging has to deal with /explorer/#/ vs. /#/ only on local

    var outcomeSignalCount = '';
    var summarySignalCount = '';
    var outcomesTestIndication = 'Multiple Sclerosis';

    // IMPORTANT !!!!!!!!!!!!!
    // NEED TO SET LOCAL OR REMOTE DEPENDING ON ENV. BECAUSE OF URL DIFFS.
    var TEST_ENV = 'REMOTE-QA'; // or 'REMOTE-QA';
    var BASE_URL = browser.baseUrl;

    function getTecfideraRx(colNum) {
        var _url = BASE_URL+'#/druggroup/indication/N0000002052/rxsignal';
        browser.get(_url);
        return element.all(by.repeater('row in renderedRows')).then(function(rows) {
            _outcomeSignalCount = rows[5].element(by.className(colNum)).getText()
            .then(function (data) {
                return data.replace(/ /g,'');
            });
            return _outcomeSignalCount;
        });
    }

    function getTecfideraSummaryRx(colNum) {
        var _url = BASE_URL+'#/company/25-1/rxsignal-summary';

        browser.get(_url);
        return element.all(by.repeater('row in renderedRows')).then(function(rows) {
             _summarySignalCount = rows[6].element(by.className(colNum)).getText()
             .then(function (data) {
                return data.replace(/ /g,'');
            });
            return _summarySignalCount;
        });
    }

    function getDrugSignalCount(style) {
        var _url = BASE_URL+'#/drugs/detail/2285/rxsignal';
        browser.get(_url);
        return element.all(by.css('.colt1 > div >' +style))
            .then(function (data) {
                return (data.length);
            });
    }

    // beforeEach(function () {

    // });

   xit('should load the outcomes rxsignal tab for ' +outcomesTestIndication, function () {
        var _url = BASE_URL + '#/druggroup/indication/N0000002052/rxsignal';
        browser.get(_url);
        expect(element(by.cssText('text-muted.panel-title')).getText()).toEqual('RxSignal Summary for ' +outcomesTestIndication);

    });

    //below tests will pass when the app data is reconciled and correct
    xit('should have values in the rxsignal tab matching the active signal count in the company rxsignal summary page', function () {

        expect(getTecfideraRx('colt2')).toEqual(getTecfideraSummaryRx('colt2'));

    });

    xit('should have values in the rxsignal tab matching the drug page active signal count ', function () {

        expect(getTecfideraRx('colt2')).toEqual(getDrugSignalCount('.red'));

    });

    xit('should have values in the rxsignal tab matching the watchlist signal count in the company rxsignal summary page', function () {

        expect(getTecfideraRx('colt3')).toEqual(getTecfideraSummaryRx('colt3'));

    });

    xit('should have values in the rxsignal tab matching the drug page watchlist signal count ', function () {

        expect(getTecfideraRx('colt3')).toEqual(getDrugSignalCount('.yellow'));

    });

});
