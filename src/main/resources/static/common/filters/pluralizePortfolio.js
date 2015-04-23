angular.module('AdverseEventsExplorer.main').filter('pluralizePortfolio', function() {
    return function(input) {
        var label = input;

        if (input === "Portfolio") {
            label = "Portfolios";
        } else {
            label = "Formularies";
        }

        return label;
    };
});
