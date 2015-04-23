describe('drugclassLabel', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should return the input as is if not "drugclass"', inject(function($filter) {

		var filter = $filter('drugclassLabel');
		expect(filter('Indication')).toEqual('Indication');

	}));

	it('should return "Drug Class" when passed "Drugclass"', inject(function($filter) {

		var filter = $filter('drugclassLabel');
		expect(filter('Drugclass')).toEqual('Drug Class');

	}));

});
