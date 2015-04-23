describe('Controller: CompanyIndicationCtrl', function () {
    beforeEach(module('common'));
    beforeEach(module('common.tooltip'));
    beforeEach(module('company'));

    var scope, ctrl;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        rxsignal_summary_data = [{}, {}];
        drugclass_data = [{}, {}];

        ctrl = $controller('CompanyIndicationCtrl', {

            $scope: scope,
            RxsignalSummaryData: rxsignal_summary_data,
            DrugclassData: drugclass_data,
            IndicationData: [{},{}]
        });
    }));

    xit('should define orderByField of metric_weighted_rxscore', inject(function () {

        expect(scope.orderByField).toEqual('metric_weighted_rxscore');

    }));

    xit('should reverse sort by default', inject(function () {

        expect(scope.reverseSort).toEqual(true);

    }));

});
