angular.module('AdverseEventsExplorer.main').filter('casesFilter', function() {
    return function(input, caseSource) {
        var out = [];
        for (var i = 0; i < input.length; i++){
            if(input[i].case_source === caseSource){
                out.push(input[i]);
            }
        }
        return out;
    };
});
