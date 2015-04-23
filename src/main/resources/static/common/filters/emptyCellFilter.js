angular.module('AdverseEventsExplorer.main').filter('emptyCellFilter', function ($filter) {
    return function (input, cellFilter, args1, args2) {
        var cell;

        if (cellFilter == undefined) {
            cell = (input > 0) ? input : '-';
        } else {
            cell = (input > 0) ? $filter(cellFilter)(input, args1, args2) : '-';
        }

        return cell;
    };
});

