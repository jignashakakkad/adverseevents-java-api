describe('toHtmlList', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should ...', inject(function($filter, $sce) {

        var filter = $filter('toHtmlList');
        var list_of_items = ['this','that'];
		expect(filter(list_of_items)).toEqual('<ul class="list-group"><li class="list-group-item">'+ 'this' + '</li>'+'<li class="list-group-item">'+ 'that' + '</li></ul>');

	}));

});
