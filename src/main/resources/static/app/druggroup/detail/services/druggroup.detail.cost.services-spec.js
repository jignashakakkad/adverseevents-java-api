describe("Service: drugGroupCostService", function () {

    var $httpBackend, drugGroupCostService, mockResponse, mockTooltipService;
    var mockResponse = 'DrugGroup test response';
    var drugGroupId = 'N0000003198';
    var drugGroupType = 'indication';
    var mockDrugGroupCostData = [{"dimension_type":"drug","aedrug_label":"ELOXATIN",
            "aedrug_id":29,
            "metric_mean_patient_cost":1.231e+4,
            "metric_sum_annual_cost":96210373,
            "metric_drug_price":"Not Available","metric_pctg_event_onlabel_cost":null,
            "metric_sum_costed_patient":7816,"metric_sum_costed_year":17,"metric_rxscore":67.67}];

    beforeEach(module('druggroup'));

    beforeEach(function () {
        inject(function (_$httpBackend_, _drugGroupCostService_) {
            $httpBackend = _$httpBackend_;
            drugGroupCostService = _drugGroupCostService_;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET request to the druggroup cost api endpoint for Patient Costs ', function () {
        $httpBackend.expectGET('http://www.adverseevents.com/api/v1/' + drugGroupType + '/' + drugGroupId + '/costs/by/drug').respond(mockResponse);
        drugGroupCostService.getDrugGroupCosts(drugGroupType, drugGroupId)
                .then(function (response) {
                    expect(response.data).toBe(mockResponse);
                });
        $httpBackend.flush();
    });

    it('should return a config object for the Stacked chart', function(){
        var stackedChartData = drugGroupCostService.getCostChartConfig(mockDrugGroupCostData);
        expect(stackedChartData).toBeDefined();
    });

});
