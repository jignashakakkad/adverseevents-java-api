describe('casesFilter', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should ...', inject(function($filter) {

        var filter = $filter('casesFilter');

		expect(filter([])).toEqual([ ]);

	}));

});
