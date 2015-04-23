module.exports = function() {

    // new code, actively used
    var getPortfolioManager;
    this.testedId = 1470;
    this.Rows = element.all(by.repeater('row in renderedRows'));
    this.Columns = element.all(by.css('ngHeaderSortColumn'));
    this.csvButton = element(by.className('fa-file-excel-o'));
    this.summaryPanel = element(by.className('col-md-5'));
    this.topDrugsPanel = element(by.css('#chart'));
    this.bubbleChartPanel = element(by.css('#company-rxsignal-bubblechart'));
    this.outcomesYearBtn = element(by.buttonText('Cumulative Data'));
    this.topChartTitle = element(by.binding('overview.chartTitle'));
    this.overviewDropdown = element(by.buttonText('Company Overview'));
    this.drugOverviewButton = element(by.link('#/portfolio/detail/'+this.testedId+'/overview/drug-overview'));
    this.drugOverviewDropdown = element(by.buttonText('Drug Overview'));
    this.drugDetailButton = element(by.link('#/portfolio/detail/'+this.testedId+'/overview/drug-detail'));

    this.Columns = function() {
        element(by.className('fa-cog')).click();
        return element.all(by.css('.multiSelectLi')).then(function (cols) {
            return cols.length;
        });
    };

    this.get2014Data = function() {
        this.outcomesYearBtn.click();
    };

    this.getCellVal = function(rowNum, colClass) {
        return this.Rows.then(function(rows) {
            return rows[rowNum].element(by.className(colClass)).getText()
                .then(function (data) {
                    return data.replace(/ /g,'');
                });
        });
    };

    this.getPortfolioManager = function () {
        element(by.className('dropdown-toggle')).click();
        var Menu = element.all(by.css('.dropdown-menu li'));

        Menu.filter(function (elem, index) {
            return elem.getText().then(function(item){
                return item === 'Formulary Manager';
            });
        }).then(function(filteredElems){
            filteredElems[0].click();
        });

        element(by.buttonText('Launch Formulary')).click();
    };

    getPortfolioManager = this.getPortfolioManager;

    this.setCookies = function() {
        browser.get('#/');

        browser.manage().deleteAllCookies();
        browser.executeScript('window.localStorage.clear();');

        browser.manage().addCookie("aex['uid']","6661785");
        browser.manage().addCookie("auth","1");
        browser.manage().addCookie("user_portfolio_name","0");

        browser.manage().addCookie("user_email","e2edetail@adverseevents.com");
        browser.manage().addCookie("user_pass","welcome2015");
        getPortfolioManager();
    };

    // old code, unsure if used anywhere
    this.Tab = '';
    this.expect_tabs_len_start = 0;
    this.expect_tabs_len_end = 2;
    this.company_count = 0;
    this.drug_count = 0;
    this.Tabs = element.all(by.repeater('tab in tabs'));
    this.Contents = {
        'Companies': element.all(by.repeater('company in companies')),
        'Drugs': element.all(by.repeater('drug in drugs'))
    };
    this.Drugs = element.all(by.repeater('drug in drugs'));
    this.Results = element.all(by.repeater('item in items'));
    this.tabHeaders = element.all(by.css('tab-heading'));
    this.placeholder_text = 'Portfolio name';
    this.portfolio_title = element(by.css('tab-heading'));
    this.active_portfolio_title = element(by.binding('activeTab'));
    this.portfolio_create_btn = element.all(by.buttonText("Create New"));
    this.portfolio_create_input = element.all(by.cssContainingText('modal-header'));
};
