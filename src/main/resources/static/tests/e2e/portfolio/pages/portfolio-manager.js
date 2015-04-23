function PortfolioManager() {


    "use strict";
    this.Tab = '';


    function PortfolioContents(){
        return {
            'Companies': element.all(by.repeater('company in companies')),
            'Drugs': element.all(by.repeater('drug in drugs'))
        }
    };


    function Portfolios() {
        this.Model = element.all(by.css('tab-heading'));
    }

    Portfolios.prototype.byName = function (query) {

        this.Model.filter(function (elem) {
            return query.indexOf(elem.getText()) !== -1;
        }).then(function (filteredElem) {
            return filteredElem;
        });
    };

    this.Search = {
            model: element(by.model('searchInput')),
            clear: this.model.clear(),
            query: this.model.sendKeys,
            find: this.query
        }

}

module.exports = PortfolioManager;
