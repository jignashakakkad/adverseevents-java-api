describe('Controller: RxscoreMeterCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('portfolio'));
    beforeEach(module('company'));

    var scope, ctrl;

    beforeEach(inject(function ($state, $rootScope, $controller) {
        scope = $rootScope.$new();

        mockTermService = sinon.stub({
            setVal: function() {},
            setLabel: function() {},
            setType: function() {},
            setData: function() {},
            setKount: function() {},
            getVal: function() {},
            getKount: function() {},
            getLabel: function() {},
            getType: function() {},
            getHeight: function() {},
            setHeight: function() {}
        });

        ctrl = $controller('RxscoreMeterCtrl', {
            $scope: scope,
            termService: mockTermService
        });

    }));

    describe("Controller initialization and basic functions", function () {

        it('should have be defined and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();
        }));

        it('should return false for non-zero numbers', inject(function () {
            var notZero = scope.isScoreZero(1);
            expect(scope.isScoreZero(1)).toBeFalsy();
        }));

    });

});
