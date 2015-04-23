angular.module('AdverseEventsExplorer.main').filter('drugclassLabel', function() {
    return function(input) {
        var label = input;

        if (input === "Drugclass") {
            label = "Drug Class";
        }

        return label;
    };
});
