describe('originalPropsFilter', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should ...', inject(function($filter) {

        var filter = $filter('propsFilter');

		expect(filter('input')).toEqual('input');

	}));

});
