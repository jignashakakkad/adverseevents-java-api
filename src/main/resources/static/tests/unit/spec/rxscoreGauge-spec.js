describe('rxscoreGauge', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should ...', inject(function($filter,$sce) {

        var filter = $filter('rxscoreGauge');

		expect(filter('<span>&#10;</span><li class=\"list-group-item\">i</li>&#10;<li class=\"list-group-item\">n</li>&#10;<li class=\"list-group-item\">p</li>&#10;<li class=\"list-group-item\">u</li>&#10;<li class=\"list-group-item\">t</li>&#10;')).toEqual('output');

	}));

});
