describe('incidenceFilter', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should ...', inject(function($filter) {

        var filter = $filter('incidenceFilter');

		expect(filter('0.004')).toEqual('0.4000%');

	}));

});
