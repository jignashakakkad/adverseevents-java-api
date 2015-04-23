angular.module('AdverseEventsExplorer.main').filter('filterUnique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] === undefined){
                unique[input[i][key]] = key;
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});
