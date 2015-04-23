describe('Controller: CompanyDetailCtrl', function () {

    beforeEach(module('common.controllers'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('company'));

    beforeEach(module('toast.services'));

    var scope, ctrl;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        var overview_data = [{}];
        var rxscore_data = [{class_indication:[]}];
        var rxsignal_summary_data = [{}];
        var products_data = [{},{}];
        var revenues_data = [{class_indication:[]},{class_indication:[]},{class_indication:[]}];
        var exposure_data = [{},{},{}];

        ctrl = $controller('CompanyDetailCtrl', {
            $scope: scope,
            Overview: overview_data,
            RxscoreData: rxscore_data,
            RxsignalSummaryData: rxsignal_summary_data,
            Products: products_data,
            Revenues: revenues_data,
            Exposure: exposure_data
        });

    }));

    it('should be able to initialize $scope', inject(function () {
        expect(scope).toBeDefined();
    }));

});
