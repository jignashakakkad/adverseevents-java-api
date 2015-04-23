angular.module('AdverseEventsExplorer.main').filter('incidenceFilterMetrics', function () {
    return function () {
        var input = arguments[0];
        if (arguments[1]) {
            var arg1 = arguments[1].arg1;
            var arg2 = arguments[1].arg2;
            var arg3 = arguments[1].arg3;
            var arg4 = arguments[1].arg4;
            if (input !== 0 && d3.round(input, 8) <= 0) {
                return '-';
            } else if (input === 0) {
                if (arg3 === '%' || arg3 === 'f') {
                    var format = d3.format('.' + (arg4 / 2) + (arg3));
                    return format(d3.round(input, arg2 / 2));
                } else {
                    var format = d3.format(arg1);
                    return format(d3.round(input, arg2 / 2));
                }
            } else {
                if (arg3 === '%' || arg3 === 'f') {
                    var format = d3.format('.' + arg4 + arg3);
                    return format(d3.round(input, arg2));
                } else {
                    var format = d3.format(arg1);
                    return format(d3.round(input, arg2));
                }
            }
        }
    };
});
angular.module('AdverseEventsExplorer.main').filter('incidenceFilterMetricsNumber', function () {
    return function (input, arg) {
        if (input !== 0 && d3.round(input, 8) <= 0) {
            return '-';
        } else if(input === 0) {
            var format = d3.format('.4%');
            return format(d3.round(input, 3));
        } else {
            return input > 0 ? input : 0;
        }
    };
});
angular.module('AdverseEventsExplorer.main').filter('incidenceFilterMetricsNumber', function () {
    return function (input, arg) {
        if (input !== 0 && d3.round(input, 8) <= 0) {
            return '-';
        } else {
            return input > 0 ? input : 0;
        }
    };
});
angular.module('AdverseEventsExplorer.main').filter('incidenceFilterMetricsRatio', function () {
    return function (input, arg) {
        var format = d3.format('.2d');
        if (input !== 0 && d3.round(input, 8) <= 0) {
            return '-';
        } else {
            return input > 0 ? d3.round(input,2) : 0.00;
        }
    };
});
