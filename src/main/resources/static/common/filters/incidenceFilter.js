angular.module('AdverseEventsExplorer.main').filter('incidenceFilter', function () {
    return function (input, arg) {
        if (d3.round(input, 8) === 0) {
            return '-';
        } else {
            var format = d3.format('.4%');
            return format(d3.round(input, 6));
        }

    };
});

