xdescribe('The COMPANY LIST for Tysabri', function () {

    var testedId = '9-1';



    var Company = element.all(by.repeater('tab in tabs'));
    var SummaryRxScore2013 = element.all(by.model('Metrics'));

    var firstTabName = element(by.repeater('tab in tabs').row("0"));
    var rxscoreBadge = element(by.model('second'));


    beforeEach(function () {

        browser.get('#/drugs/'+testedId.toString()+'/overview');

    });


    it('should have a 2013 rxscore of 48.5', function () {
            console.log(SummaryRxScore2013);
            expect(SummaryRxScore2013).toEqual(48.5);

    });



});
