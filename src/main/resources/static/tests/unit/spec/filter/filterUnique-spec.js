describe('filterUnique', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should filter unique values ...', inject(function($filter) {

        var dfilter = $filter('filterUnique');

		expect(dfilter('bb')).toEqual(dfilter('bb'));

	}));

});
