describe('Controller: CompanyOverviewCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('company'));

    var scope, ctrl;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        var overview = [{}];
        var revenues = [{}];
        var rxsignal_summary_data = [{}];
        var rxscore_data = [{}];

        ctrl = $controller('CompanyOverviewCtrl', {
            $scope: scope,
            Overview: overview,
            Revenues: revenues,
            RxscoreData: rxscore_data,
            RxsignalSummaryData: rxsignal_summary_data
        });

    }));

    describe("Initialization check", function () {

        it('should have be definited and able to initialize $scope', inject(function () {
            expect(scope).toBeDefined();

        }));

    });

});
