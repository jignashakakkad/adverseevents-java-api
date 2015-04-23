describe('Filter: titleCase', function() {

	beforeEach(module('company'));

	it('should convert lowecase words: \'some\' to \'Some\' ', inject(function($filter) {

        var filter = $filter('titleCase');

		expect(filter('input')).toEqual('Input');

	}));
    it('should work on multi word phrases: \'some text\' to \'Some Text\' ', inject(function($filter) {

        var filter = $filter('titleCase');

        expect(filter('input text')).toEqual('Input Text');

    }));
});
