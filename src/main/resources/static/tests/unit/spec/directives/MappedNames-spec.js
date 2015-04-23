describe('MappedNames', function() {

  beforeEach(module('AdverseEventsExplorer.main'));

  var scope,compile;

  beforeEach(inject(function($rootScope,$compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  it('should ...', function() {
      expect(1).toEqual(1);

    /*
    To test your directive, you need to create some html that would use your directive,
    send that through compile() then compare the results.
     expect(
    var element = compile('<div mydirective name="name">hi</div>')(scope);
    expect(element.text()).toBe('hello, world');
    */

  });
});
