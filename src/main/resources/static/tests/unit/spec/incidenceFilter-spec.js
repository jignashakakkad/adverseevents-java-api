describe('incidenceFilter', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should take a float and return a string float(4) percentage...', inject(function($filter) {

        var filter = $filter('incidenceFilter');

		expect(filter(0.01400)).toEqual('1.4000%');

	}));

    it('should return a "-" when given 0...', inject(function($filter) {

        var filter = $filter('incidenceFilter');

        expect(filter(0)).toEqual('-');

    }));

});
