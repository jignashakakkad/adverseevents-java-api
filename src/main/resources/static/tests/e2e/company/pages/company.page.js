module.exports = function() {

    // Updated 2015-03-19 for new data values by @cerdman

    this.SummaryRxScore2013 = element(by.binding('Summary.Metrics.metric_rxscore_2013.label'));
    this.testedId = '37-1';
    this.testTabNameFirst = 'Overview';
    this.testTabNameLast = 'Class';
    this.testTotalTabs = 9;
    this.Tabs = element.all(by.repeater('tab in tabs'));
    this.firstTabName = element(by.repeater('tab in tabs').row("0"));
    this.rxscoreBadge = element(by.model('second'));
    this.mylanRxscore = '31.16';
    this.ReportingTable = element.all(by.model('rowItems'));
    this.JNJtestedId = '14-1';
    this.renderedRows = element.all(by.repeater('row in renderedRows'));
    this.barChart = element(by.css('.highcharts-container'));
    this.aloprimROR = '248.93';
    this.aloprimPS = '412';
    this.aloprimIR = '0.0018%';
    this.stavudineWatchlist = '46';
    this.stavudineAvgROR = '4.68';
    this.performistOutcome = '0.1400%';
    this.performistOutcome2014 = '0.00%';
    this.sotalolRxScore = '35.86';
    this.sotalolPI = 'AtrialFibrillation';
    this.MDDRxScore = '46.82';
    this.MDDRxSignalADE = '35,870';
    this.triazoleDrugs = '1';
    this.triazoleTotal = '53.23';

    this.uncheckColumns = function(limit) {
        element(by.className('fa-cog')).click();
        element.all(by.className('multiSelectLi')).then(function(options) {
            for (x = 0; x < limit; x++) {
                options[x].click();
            };
        });
    };

    this.getOutcomes = function(year) {
        element(by.buttonText('Cumulative Data')).click();
        element(by.linkText(year)).click();
    };

    this.getCellVal = function(rowNum, colClass) {
        return this.renderedRows.then(function(rows) {
            return rows[rowNum].element(by.className(colClass)).getText()
                .then(function (data) {
                return data.replace(/ /g,'');
            });
        });
    };

    this.getTotalRows = function() {
        return this.renderedRows.then(function (rows) {
            return rows.length;
        });
    };
}
