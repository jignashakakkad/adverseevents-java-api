angular.module('AdverseEventsExplorer.main').filter('toHtmlList', function($sce) {
	return function(input,arg) {
		var output = '<ul class="list-group">';
        angular.forEach(input,function(d) {
            if (typeof (d.toString()) === "string"){
                output += '<li class="list-group-item">'+ d.toString() + '</li>';
            }
        });
        output +='</ul>';
        return $sce.getTrustedHtml(output);
	};
});
