describe('Drug Report Presentation Logic Suite', function() {

    // Setup fixture vars
    var _GENERIC_REGION_, _BASE_DATE_, _DATE_REGION_, _TITLE_SUFFIX_;
    var RxScoreGauge;
    var Title = element(by.css('#drugdetail-report-header'));

    // Note use of _CAPS_ for GLOBAL_CONSTANTS.
    _TITLE_SUFFIX_= ' Drug Report';
    _DATE_REGION_ = 'Data Complete Through';
    _BASE_DATE_ = '06/30/2014';
    _GENERIC_REGION_ = 'Generic Name:';

    RxScoreGauge = element(by.id('RxScoreGauge'));

    describe("Scenario-0: Active Drug; FOIA data older than FAERS data; Has RxScore;", function () {
        var _name = 'AMBIEN';
        var _generic = 'zolpidem tartrate';
        var _rxscore = '29.';
        var _title = _name + _TITLE_SUFFIX_;

        beforeEach(function() {
            browser.get('#/drugs/detail/28/overview');
        });

        it('should show `'+_title+'` as the TITLE in header section', function() {
            expect(Title.getText()).toContain(_title);
        });

        it('should have an Generic name value in header region of: ' + _generic, function() {
            var _el = element(by.css('#drugdetail-generic-label', _GENERIC_REGION_));
            expect(_el.getText())
                .toContain(_generic);
        });

        it('should have `Data updated through:` value in header of: ' + _BASE_DATE_, function() {
            var _el = element(by.cssContainingText('.h4', _DATE_REGION_));
            expect(_el.getText())
                .toContain(_BASE_DATE_);
        });

        it('should NOT show withdrawn in the title header', function() {
            expect(Title.getText()).not.toContain('Withdrawn');
        });

        it('should have an `RxScoreGauge` gauge present', function() {
            expect(RxScoreGauge.getText())
                .toContain('RxScore');
        });

        it('should have an `RxScoreGauge` gauge value of: '+_rxscore, function() {
            expect(RxScoreGauge.getText())
                .toContain(_rxscore.toString());
        });
    });

    describe('Scenario-1: Withdrawn Drug; No FOIA; No RxScore if Withdrawn;', function() {
        var _name = 'VIOXX';
        var _generic = "refecoxib";
        var _title = _name+_TITLE_SUFFIX_;
        var _rxscore = "N/A";
        var Title = element(by.cssContainingText('.title', _title));

        beforeEach(function() {
            browser.get('#/drugs/detail/5067/overview');
        });

        it('since withdrawn, should show `'+_title+'` on page load in title header section', function() {
            expect(Title.getText())
                .toContain('Withdrawn');
        });


        it('should NOT have an `RxScoreGauge` element that is not empty in the title section', function() {
            expect(RxScoreGauge.getText())
                .not.toContain('RxScore');
        });

        it('should NOT have an `RxScoreGauge` element with the score value of: '+_rxscore, function() {
            expect(RxScoreGauge.getText())
                .not.toContain(_rxscore.toString());
        });

    });

    describe('Scenario-2: Active Drug; DOES HAVE RxSignal; DOES HAVE specific FOIA request Data; Data is newer than FAERS;', function() {

        var aedrug_name = 'SOVALDI';
        var firstTestedInput = aedrug_name;
        var firstExpectedOutput = aedrug_name+' Drug Report';
        var dateValue = '03/06/2015';
        var genericRegion = 'Generic name';
        var aedrug_generic = 'sofosbuvir';
        var thirdTestedInput = aedrug_name;
        var thirdExpectedOutput = 'Data Complete Through:';
        var secondTestedInput = 'ambi';
        var secondExpectedOutput = 2;
        var headerName = element(by.cssContainingText('.title',firstTestedInput));
        var headerRxscore = element(By.id('RxScoreGauge'));
        var firstTestedRxScore = '61.';
        var divRxsignal = element(By.id('rxsignal-grid'));

        beforeEach(function() {
            browser.get('#/drugs/detail/7847');
        });

        it('should show `'+firstExpectedOutput+'` on page load in title header section', function() {
            expect(element(by.css('.title')).getText()).toContain(firstExpectedOutput);
        });

        it('should have an generic name value in title section of: '+ aedrug_generic, function() {
            var el = element(by.css('#drugdetail-generic-label'));
            expect(el.getText()).toContain(aedrug_generic);
        });

        it('should have an `Data complete through:` value in title section of: '+dateValue, function() {
            var el = element(by.css('.title'));
            expect(el.getText()).toContain(dateValue);
        });

        it('should have an `RxScoreGauge` element that is not empty in the title section', function() {
            expect(headerRxscore.getText()).toContain('RxScore');
        });

        it('should have an `RxScoreGauge` element with the score value of: '+firstTestedRxScore, function() {
            expect(headerRxscore.getText()).toContain(firstTestedRxScore.toString());
        });

        it('should have an `RxSignalGrid` element with the score value of: '+firstTestedRxScore, function() {
            expect(headerRxscore.getText()).toContain(firstTestedRxScore.toString());
        });

    });



});

describe("RxOutcome Compare in Drug Report - RxSignal tab", function () {
    "use strict";

    // Locator for the comparison fa-table Icon in rxsignal tab
    var firstLocator = element.all(by.css('.fa.fa-table'));

    // Locator for the Compare by Class
    var byClassText = 'Compare by Class';
    var byClassEl = element(by.cssContainingText('a.btn.btn-primary',byClassText));
    var byIndiText = 'Compare by Indication';
    var byIndiEl = element(by.cssContainingText('a.btn.btn-primary',byIndiText));
    var height = 1080;
    var width = 1900;
    var newWindowHandle;
    var drugClassLink = '/druggroup/drugclass/N05CF/adverseevents/IR';
    var indicationLink = '/druggroup/indication/AEI00000014/adverseevents/IR';
    var appWindow = browser.getWindowHandle();

    function switchToWindow(button, expectedUrl) {
        button.click().then(function () {
            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[1];
                browser.switchTo().window(newWindowHandle).then(function () {
                    expect(browser.driver.getCurrentUrl()).toContain(expectedUrl);
                    browser.driver.close().then(function () {
                         browser.switchTo().window(appWindow);
                     });
                });
            });
        });
    }

    beforeEach(function() {
        /**
         * Commented out to try and dx
         * issues with portfolio click target.
         */
        // browser.driver.manage().window().setSize(height, width);
        browser.get('#/drugs/detail/28/rxsignal');
        // since everything we do depends on clicking on the menu - we STAY DRY by putting it in our beforeEach
        firstLocator.first().click();
    });

    it("should pop-up the compare menu when clicking the compare icon with an option for compare by DRUGCLASS", function () {
        byClassEl.getText().then(function(val){
            expect(val)
                .toBe(byClassText);
        });
    });

    it("should pop-up the compare menu when clicking the compare icon with an option for compare by INDICATION", function () {
        // We want to make our assertion inside the promise so that it isn't tested before the DOM is ready.
        byIndiEl.getText().then(function(val){
            expect(val)
                .toBe(byIndiText);
        });
    });

    it('should go to the N05CF DrugClass report and specifically the AE tab when compare clicked', function() {
        switchToWindow(byClassEl, drugClassLink);
    });

    it('should go to the Indication RxOutcome report and specifically the AE tab when compare clicked', function() {
        switchToWindow(byIndiEl, indicationLink);
    });

    it('should switch back to main window',function(){
        browser.switchTo().window(appWindow);
        byClassEl.getText().then(function(val){
            expect(val)
                .toBe(byClassText);
        });
        expect(1).toEqual(1);
    });
});

