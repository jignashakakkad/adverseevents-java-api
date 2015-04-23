angular.module('AdverseEventsExplorer.main').filter('pctgFilter', function () {
    return function (input, arg) {
        var precision = Math.abs(arg) >= 0 ? Math.abs(arg) : 4;
        var format = d3.format('.' + precision.toString()  + '%');
        return format(d3.round(input, 4));
    };
});
