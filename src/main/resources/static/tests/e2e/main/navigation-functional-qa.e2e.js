describe('Site Navigation Functional Workout', function () {
    var TypeAhead = element(by.model('item.selected'));
    var placeholder = 'Search any drug, company, indication, drug class or mechanism of action.';
    var TypeaheadElement = element(by.partialButtonText(placeholder));



    describe('Company Search and Navigation', function () {
        var firstTestedInput = 'PFE:US';
        var firstExpectedOutput = 'Pfizer, Inc. PFE:US';
        var secondTestedInput = 'pfi';
        var secondExpectedOutput = 2;
        beforeEach(function () {
            browser.get('#/drugs');
        });
        it('should show default placeholder text: ' + placeholder, function () {
            var el = TypeAhead;
            expect(el.getText())
                .toBe(placeholder);
        });

        it('should respond with PFIZER (PFE:US) to input: ' + firstTestedInput, function () {
            TypeaheadElement.click();
            element(by.model('$select.search')).sendKeys(firstTestedInput);
            expect(element(by.binding('item.thisName')).getText())
                .toBe(firstExpectedOutput);
        });

        it('should go to the ' + firstExpectedOutput + ' COMPANY PAGE when clicking result for input: ' + firstTestedInput, function () {
            TypeaheadElement.click();
            element(by.model('$select.search')).sendKeys(firstTestedInput);
            expect(element(by.binding('item.thisName')).click().then(function () {
                return element(by.css('.company-header-name', firstExpectedOutput)).getText();
            })).toBeTruthy();
        });

        it('should contain a list of more than ' + secondExpectedOutput + ' items for input: ' + secondTestedInput, function () {
            TypeaheadElement.click();
            element(by.model('$select.search')).sendKeys(secondTestedInput);
            expect(element.all(by.binding('item.thisName')).count())
                .toEqual(secondExpectedOutput);
        });

    });

    describe('Drug Search and Navigation', function () {

        // testing drug navigation
        var firstTestedInput = 'ambien c';
        var firstExpectedOutput = 'AMBIEN CR';
        var secondTestedInput = 'ambi';
        var secondExpectedOutput = 2;

        // testing rxoutcome navigation
        var rxOutcome = 'SPAF (Stroke Prevention in Atrial Fibrillation)';
        var rxOutcomeInput = 'SPAF';

        beforeEach(function () {
            browser.get('#/drugs');
            TypeaheadElement.click();
        });

        it('Searching Drug: should respond to input: ' + firstTestedInput, function () {
            element(by.model('$select.search')).sendKeys(firstTestedInput);
            expect(element(by.binding('item.thisName')).getText())
                .toBe(firstExpectedOutput);
        });

        it('Navigation to Drug: should go to the ' + firstExpectedOutput + ' PAGE when clicking result', function () {
            element(by.model('$select.search')).sendKeys(firstTestedInput);
            expect(element(by.binding('item.thisName')).click().then(function () {
                return element(by.cssContainingText('.title', firstExpectedOutput)).getText();
            })).toContain(firstExpectedOutput + ' Drug Report');
        });

        it('Navication to DrugClass: should go to the ' + rxOutcome + ' PAGE when clicking result for input: ' + rxOutcomeInput, function () {
            element(by.model('$select.search')).sendKeys(rxOutcomeInput);
            expect(element(by.binding('item.thisName')).click().then(function () {
                return element(by.cssContainingText('.title', 'RxOutcome')).getText();
            })).toContain('RxOutcome');
        });


        it('should contain a list of more than ' + secondExpectedOutput + ' items for input: ' + secondTestedInput, function () {
            element(by.model('$select.search')).sendKeys(secondTestedInput);
            expect(element.all(by.binding('item.thisName')).count())
                .toBeGreaterThan(secondExpectedOutput);
        });


    });
});
