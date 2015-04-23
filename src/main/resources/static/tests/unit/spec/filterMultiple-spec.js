describe('filterMultiple', function() {

	beforeEach(module('AdverseEventsExplorer.main'));

	it('should return an array of objects...', inject(function($filter) {

        var filter = $filter('filterMultiple');
        var anObject = {"propA": "that guy","propB":"that other guy"};
		expect(filter(anObject,'t')).toEqual([anObject]);

	}));


    it('should return only matching properties...', inject(function($filter) {

        var filter = $filter('filterMultiple');
        var anObject = [{"id": "that guy","propA":"name", "propB":"dude"},{"id": "that guys","propA":"nameBra", "propB":"bro"},{"id": "that zug","propA":"nameBraa", "propB":"brocephius"}];
        var filtered = filter(anObject, "propA");

        expect(filtered).toEqual(anObject);

    }));

});
