/**
 * Created by cerdman on 2/4/15.
 */
 by.addLocator('link',
    /**
     * Find <a> element by href attribute
     * @param {string} href
     * @param {Node} [parentElement=]
     * @returns {Array.<Node>}
     */
    function (href, parentElement) {
        parentElement = parentElement || document;
        var links = parentElement.querySelectorAll('a');
        return Array.prototype.filter.call(links, function (link) {
            return (link.href && ((link.href === href) || (link.href === (link.baseURI + href))));
        });
    });

describe("The RxScore tab on Drug Page: Enbrel", function () {
    it('AEA-22: it should have an entry for Biological response modifiers that loads the chart.', function () {
        browser.get('#/drugs/detail/2526/rxscore');

        var chartDrug = element(by.cssContainingText('span.indented.tree-label.ng-binding', 'Biological Response Modifiers '));
        var elementLink = element(by.link('#/drugs/detail/2526/overview'));
        chartDrug.click().then(function(e){
            expect(chartDrug.getText()).toBe('Biological Response Modifiers');
        });

    });

    it('AEA-22: it should have an entry for biological response modifiers with an entry for ENBREL', function () {
        var chartDrug = element(by.cssContainingText('span.indented.tree-label.ng-binding', 'Biological Response Modifiers '));
        var elementLink = element(by.link('#/drugs/detail/2526/overview'));
        chartDrug.click().then(function(){
            expect(elementLink.getText()).toBe('ENBREL');
        });

    });

    it('AEA-22: it should have an entry for biological response modifiers with a link to drugid 1850', function () {
        var chartDrug = element(by.cssContainingText('span.indented.tree-label.ng-binding', 'Biological Response Modifiers '));
        var elementLink = element(by.link('#/drugs/detail/1850/overview'));
        chartDrug.click().then(function(){
            expect(elementLink.getText()).not.toBe('ENBREL');
        });

    });
});
