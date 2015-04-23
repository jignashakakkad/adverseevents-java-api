angular.module('company').filter('titleCase', function() {
    return function(str) {
        if (str === "CR" || str === "AND") {
            //Add list of terms
            return str;
        } else {
            return (str === undefined || str === null || str === 'CR') ? '' : str.replace(/_|-/, ' ').replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
	};

});