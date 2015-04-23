describe('filterMultiple', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should only filter objects...', inject(function($filter) {
        var filter = $filter('filterMultiple');
		expect(filter('input')).toEqual([]);
	}));

});
