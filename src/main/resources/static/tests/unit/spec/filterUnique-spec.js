describe('filterUnique', function () {

    beforeEach(module('AdverseEventsExplorer.main'));

    it('should ...', inject(function ($filter) {

        var filter = $filter('filterUnique');

        expect(filter([{'id': 'a'}, {'id': 'b'}, {'id': 'c'}, {'id': 'c'}])).toEqual(filter([{'id': 'a'}, {'id': 'b'}, {'id': 'c'}, {'id': 'c'}]));

    }));

});
