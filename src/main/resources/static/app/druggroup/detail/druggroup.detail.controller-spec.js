describe("Controller: druggroup.detail.controller", function(){

    var scope, controllerConstructor, mockMainTabService, mockToastPopup, mockDrugGroup, mockFullscreen, stateParams, $state;

    angular.module('druggroup.detail').filter('pascalCaseFilter', function () {
        return function (input, arg) {
            var arr = input.split(/\s|_/);
            for (var i = 0, l = arr.length; i < l; i++) {
                arr[i] = arr[i].substr(0, 1).toUpperCase() +
                        (arr[i].length > 1 ? arr[i].substr(1).toLowerCase() : "");
            }
            return arr.join("");
        };
    });

    beforeEach(module('ui.router'));
    beforeEach(module('druggroup.detail'));

    beforeEach(function() {

        mockMainTabService = sinon.stub({
            getTabs: function() {},
            setTabs: function() {}
        });

        mockToastPopup = sinon.stub({
            log: function() {},
            loginError: function() {},
            loginSuccess: function() {},
            showToast: function() {},
            showNoDataToast: function() {}
        });

        mockFullscreen = sinon.stub();

        module(function($provide) {
            $provide.value('MainTabService', mockMainTabService);
            $provide.value('toastPopup', mockToastPopup);
            $provide.value('Fullscreen', mockFullscreen);
        });

        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            mockDrugGroup = {0: {pscount: function() {}}, plain: function() { return [{metric_pscount: 1},{metric_pscount: 4}] }};
            controllerConstructor = $controller;
            stateParams = {id: 0, type: 'Indication'};
        });

    });

    it('should initialize the controller successfully', function() {

        var ctrl = controllerConstructor('DrugGroupDetailCtrl', {
            $scope: scope,
            $stateParams: stateParams,
            DrugGroup: mockDrugGroup
        });

        expect(ctrl).toBeDefined();
    });

    xit('should redirect to list page if not enough drugclass data', inject(function(_$state_) {
        //create mockDrugGroup with no data, which should call state.go
        mockDrugGroup = {pscount: function() {}};

        var mockState = {
            includes: function (string) {
                return false
            }
        };

        var $state = _$state_;
        $state.includes = mockState.includes;
        //spy on state.go and return empty then function
        spyOn($state, 'go').callThrough(function(state, params) {
            return { then: function() {}};
        });

        var ctrl = controllerConstructor('DrugGroupDetailCtrl', {
            $scope: scope,
            $stateParams: stateParams,
            DrugGroup: mockDrugGroup
        });

        expect($state.go).toHaveBeenCalled();
    }));

});
