describe('The portfolio manager route', function () {

    var testedId = '1';
    var expect_tabs_len_start = 0;
    var expect_tabs_len_end = 2;
    var company_count = 0;
    var drug_count = 0;
    var Tabs = element.all(by.repeater('tab in tabs'));
    var Companies = element.all(by.repeater('company in PortView.companies'));
    var Drugs = element.all(by.repeater('drug in PortView.drugs'));
    var Results = element.all(by.repeater('item in PortView.items'));
    var tabHeaders = element.all(by.css('tab-heading'));

    var placeholder_text = 'Portfolio name';
    var portfolio_title = element(by.css('tab-heading'));
    var active_portfolio_title = element(by.binding('PortView.activeTab'));
    var portfolio_create_btn = element.all(by.buttonText("Create New"));
    var portfolio_create_input = element.all(by.cssContainingText('modal-header'));
    var ptor;

    var _queries = {
        "company_tick": ["PFE", 1 ],
        "company_name": ["Cephalon", 1],
        "drugname_full": ["Ambien", 2],
        "drugname_generic": ["zolpidem", 5]
    };

    // beforeEach(function () {

    // });

    it('should bypass portfolio login screen', function () {
        browser.get('#/portfolio');
        expect(element(by.css('.port-manager-header')).getText()).toEqual("Formulary Manager");
    });

    it('should change tool name to Portfolio Manager on cookie presence', function() {
        browser.get('#/portfolio/manager');
        browser.manage().deleteCookie('user_portfolio_name');
        browser.manage().addCookie('user_portfolio_name', "1");
        expect(element(by.css('.port-manager-header')).getText()).toEqual("Portfolio Manager");
    });

    it('should have no tabs to start', function () {
        Tabs.filter(function (elem, index) {
            return elem.getTagName('tab-heading');
        }).then(function (filteredElements) {
            if(filteredElements.length > 0){
                var times = 0;
                console.log("WARNING: Portfolios existed on spec start. Number is: " + filteredElements.length);
                tabHeaders.first().click();

                while(times < filteredElements.length - 1) {

                    element(by.id('portfolio-delete-button')).click();
                    element(by.css('[ng-click="ok()"]')).click();
                    times++;
                    browser.sleep(300);
                }
            }
        });
        Tabs.filter(function (elem, index) {
            return elem.getTagName('tab-heading');
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(expect_tabs_len_start);
        });

    });

    it('should have a button with title Create New', function () {
        portfolio_create_btn.get(0).then(function (el) {
            expect(el.getText()).toEqual("Create New");
        });
    });

    it('should have an empty portfolio name on click of Create Btn', function () {
        portfolio_create_btn.first().click().then();
        var ainput = element(by.model('CreateView.portfolios.portName'));
        expect(ainput.getText()).toBe('');
    });

    it('should create a new portfolio when modal form is completed', function () {
        browser.get('#/portfolio/manager');

        portfolio_create_btn.first().click();
        element(by.model('CreateView.portfolios.portName')).sendKeys('Test');
        browser.sleep(1000);

        element(by.id('portfolio-modal-create-button')).click();
        Tabs.filter(function (elem, index) {
            return elem.getTagName('tab-heading');
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(expect_tabs_len_end);
        });
    });

    it('should not allow portfolio create using a duplicate portfolio name', function () {
        portfolio_create_btn.first().click().then();
        element(by.model('CreateView.portfolios.portName')).sendKeys('Test');
        browser.sleep(500);

        expect(element(by.css('button[disabled]')).isPresent()).toBe(true);

    });

    it('should display a list of results on search', function () {
        element(by.id('portfolio-modal-cancel-button')).click();
        browser.sleep(500);
        element(by.model('searchInput')).clear();
        element(by.model('searchInput')).sendKeys('tev');
        expect(element(by.css('div.no-results.ng-hide')).isPresent()).toBe(true);

    });

    it('have search results by Company Stock Ticker: '+_queries.company_tick[0], function () {
        var _q = _queries.company_tick;
        element(by.model('searchInput')).clear();
        element(by.model('searchInput')).sendKeys(_q[0]);
        Results.filter(function(el, index){
            return el;
        }).then(function(filteredElements){
            browser.sleep(500);
            expect(filteredElements.length).toBe(_q[1]);
        });
    });

    it('should display Test as the starting active title', function () {
        expect(portfolio_title.getText()).toEqual('Test');
    });

    it('have search results by Company name for:  '+_queries.company_name[0], function () {
        var _q = _queries.company_name;
        element(by.model('searchInput')).clear();

        element(by.model('searchInput')).sendKeys(_q[0]);
        Results.filter(function(el, index){
            return el;
        }).then(function(filteredElements){
            expect(filteredElements.length).toBe(_q[1]);
        });
    });

    it('have search results by Brand Drug name for: '+_queries.drugname_full[0], function () {
        var _q = _queries.drugname_full;
        element(by.model('searchInput')).clear();

        element(by.model('searchInput')).sendKeys(_q[0]);
        Results.filter(function(el, index){
            return el;
        }).then(function(filteredElements){
            expect(filteredElements.length).toBe(_q[1]);
        });
    });

    // for future functionality - search by generic
    // it('have search results by Generic Drug name for: '+_queries.drugname_generic[0], function () {
    //     var _q = _queries.drugname_generic;
    //     element(by.model('searchInput')).sendKeys(_q[0]);
    //     Results.filter(function(el, index){
    //         return el.getTagName('td');
    //     }).then(function(filteredElements){
    //         expect(filteredElements.length).toBe(_q[1]);
    //     });
    //     element(by.model('searchInput')).clear();
    // });

    it('should add Company to companies pane on add button click', function () {
        element(by.model('searchInput')).clear();

        element(by.model('searchInput')).sendKeys('TEVA:US');
        element(by.css('tbody tr:nth-child(1) .add-to-port-btn')).click();
        expect(element.all(by.repeater('company in PortView.companies')).count()).toBe(company_count+1);
    });

    it('should add drug to drugs pane on add button click', function () {
        element(by.model('searchInput')).clear();
        element(by.model('searchInput')).sendKeys('tev-tropin');
        element(by.css('tbody tr:nth-child(1) .add-to-port-btn')).click();
        expect(element.all(by.repeater('drug in PortView.drugs')).count()).toBe(drug_count+1);
        element(by.model('searchInput')).clear();
    });

    it('should create a second portfolio and switch to that tab', function () {
        portfolio_create_btn.first().click().then();
        browser.sleep(500);

        element(by.model('CreateView.portfolios.portName')).sendKeys('Test 2');
        browser.sleep(500);
        element(by.id('portfolio-modal-create-button')).click();
        expect(tabHeaders.get(1).getText()).toEqual('Test 2');

    });

    it('should then change back to Test portfolio on click of first portfolio tab', function () {
        tabHeaders.first().click();
        expect(tabHeaders.first().getText()).toEqual('Test');
    });

    it('should remove company from companies pane on delete button click', function () {
        element.all(by.repeater('company in PortView.companies')).then(function(companies) {
            var deleteBtn = companies[0].element(by.css('.btn-warning')).click();
        });
        expect(element.all(by.repeater('company in PortView.companies')).count()).toBe(company_count);
    });

    it('should remove drug from drugs pane on delete button click', function () {
        element.all(by.repeater('drug in PortView.drugs')).then(function(drugs) {
            var deleteBtn = drugs[0].element(by.css('.btn-warning')).click();
        });
        expect(element.all(by.repeater('drug in PortView.drugs')).count()).toBe(drug_count);
    });

    it('should delete all portfolios', function () {
        var times = 0;
        while(times < 2) {
            browser.sleep(1000);
            element(by.id('portfolio-delete-button')).click();
            element(by.css('[ng-click="ok()"]')).click();
            times++;
        }
        Tabs.filter(function (elem, index) {
            return elem.getTagName('tab-heading');
        }).then(function (filteredElements) {
            expect(filteredElements.length).toEqual(expect_tabs_len_start);
        });
    });

});
