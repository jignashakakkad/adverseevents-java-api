describe('casesFilter', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should return only cases of source FOIA.', inject(function($filter) {

        var filter = $filter('casesFilter');
        var cases = [{isr: 1, case_source: 'FOIA'},{isr:2, case_source:"FAERS"}];
		expect(filter(cases, 'FOIA')).toEqual([cases[0]]);

	}));

});
