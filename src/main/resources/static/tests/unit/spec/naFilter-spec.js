describe('naFilter', function() {

	beforeEach(module('aex.utils'));

	it('should return N/A for string vales...', inject(function($filter) {
        var filter = $filter('naFilter');


		expect(filter('someString')).toEqual('N/A');


    }));


    it('should return N/A for string vales...', inject(function($filter) {
        var filter = $filter('naFilter');
        expect(filter(0.12000,2)).toEqual('0.12');
    }));

    it('should return N/A for string vales...', inject(function($filter) {
        var filter = $filter('naFilter');
        expect(filter(5.05,0)).toEqual('5');

    }));
    it('should return 3 decimal places for numeric vales...', inject(function($filter) {
        var filter = $filter('naFilter');
        expect(filter(25.151355,3)).toEqual('25.151');
    }));


});