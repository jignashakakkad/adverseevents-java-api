angular.module('AdverseEventsExplorer.main').filter('rxscoreGauge', function ($sce) {
    return function (input, arg) {
        var output = "<span>";
        angular.forEach(input, function (d) {
            if (typeof(d) === "string") {
                output += "\n<li class=\"list-group-item\">" + d.toString() + "</li>";
            }
        });
        output += "\n</ul>";
        return $sce.getTrustedHtml(output);
    };
});