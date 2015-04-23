describe('Common : LocalStorageController', function() {
    
    beforeEach(module('common'));
    beforeEach(module('ui.router'));
    beforeEach(module('LocalStorageModule'));
    
    var scope,ctrl;
    var service;
    
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('LocalStorageController', {$scope: scope});
    }));

    it('should define localStorageService', inject(function(localStorageService) {
         service = localStorageService;
         expect(service).toBeDefined();
    }));

});