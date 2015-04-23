describe('Directive: ui-sref-disable', function() {

    beforeEach(module('AdverseEventsExplorer.main'));

    var scope, compile, toastPopup, el, element, pre, $httpBackend;

    function truthyFn(){
        return true;
    }
    function falsyFn(){
        return false;
    }
    beforeEach(inject(function($rootScope, _$httpBackend_, $compile, _toastPopup_) {

        // from http://stackoverflow.com/questions/15314293/unit-testing-directive-controllers-in-angular-without-making-controller-global
        $httpBackend = _$httpBackend_;
        toastPopup = _toastPopup_;
        $httpBackend.expectGET('app/main.nav.html').respond('');
        $httpBackend.expectGET('app/main.search.html').respond('');
        $httpBackend.expectGET('app/main.html').respond('');
        $httpBackend.expectGET('app/news/news.list.html').respond('');
        $httpBackend.expectGET('app/main.footer.html').respond('');

        el = angular.element('<a ui-sref-disable="disabled" href=\'#\'>Home</a>');
        element = el;
        $compile(el)($rootScope.$new());
        $rootScope.$digest();

        pre = el.controller();

        scope = el.isolateScope() || el.scope();

    }));

    it('should compile.', function() {

        /*
         To test your directive, you need to create some html that would use your directive,
         send that through compile() then compare the results.
         expect(
         var element = compile('<div mydirective name="name">hi</div>')(scope);
         expect(element.text()).toBe('hello, world');
         */

        expect(element.text()).toBe('Home');

    });

    it("should have a scope bindable attribute", function(){


        expect(element.attr('ui-sref-disable')).toBe('disabled');
    });

    xit("has an event listener for $event.click", function () {
        // TODO figure out how to test events inside directive scope

        spyOn(scope, '$$listeners');

        element.click();
        scope.$digest();

        expect(el.on).toHaveBeenCalled();

    });
});
