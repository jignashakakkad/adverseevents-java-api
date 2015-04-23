describe('toTrusted', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should ...', inject(function($filter) {

        var filter = $filter('to_trusted');
        var text = filter('Some String');
		expect(text).toEqual('output');

	}));

});
