describe("Service: drugCostsService", function () {

    var mockTooltipService, $httpBackend, drugCostsService, mockResponse;
    var mockResponse = 'test response';
    var drugId = 28;
    var mockPieData = [{"metric_sum_dimension_key": 5207565},{"metric_sum_dimension_key": 7789682}];

    beforeEach(module('drugs'));

    beforeEach(function () {
        mockTooltipService = sinon.stub({
            getTooltip: function () {}
        });

        inject(function(_$httpBackend_, _drugCostsService_) {
            $httpBackend = _$httpBackend_;
            drugCostsService = _drugCostsService_;
        });

    });

    afterEach (function () {
        $httpBackend.verifyNoOutstandingExpectation ();
        $httpBackend.verifyNoOutstandingRequest ();
    });

    it('should send a GET request to the drug cost api endpoint for cost summary scores', function() {
        $httpBackend.expectGET('http://www.adverseevents.com/api/drug/'+ drugId +'/costs/eachrx').respond(mockResponse);

        drugCostsService.getChartNumbers(drugId)
            .then(function (response) {
                expect(response.data).toBe(mockResponse);
            });
        $httpBackend.flush();
    });

    it('should send a GET request to the drug cost api endpoint for data table numbers', function() {
        $httpBackend.expectGET('http://www.adverseevents.com/api/drug/'+ drugId +'/costs/event').respond(mockResponse);

        drugCostsService.getGridNumbers(drugId, '')
            .then(function (response) {
                expect(response.data).toBe(mockResponse);
            });
        $httpBackend.flush();
    });

    it('should send a GET request to the drug cost api endpoint for pie chart numbers', function() {
        $httpBackend.expectGET('http://www.adverseevents.com/api/drug/'+ drugId +'/costs/event/by/onlabel').respond(mockResponse);

        drugCostsService.getPieChartNumbers(drugId)
            .then(function (response) {
                expect(response.data).toBe(mockResponse);
            });
        $httpBackend.flush();
    });

    it('should return a config object for the pie chart', function(){
        pieConfigData = drugCostsService.costChartConfig(mockPieData);
        expect(pieConfigData).toBeDefined();
    });

    it('should return an array of 6 colDefs', function(){
        colDefs = drugCostsService.getDrugCostColumnDefinition();
        expect(colDefs.length).toEqual(6);
    });

    it('should return an object of data table options', function(){
        gridOptionsData = drugCostsService.getDefaultGridOptions();
        expect(Object.keys(gridOptionsData).length).toBeGreaterThan(11);
    });

    it('should have the ngGrid CSV Plugin available in global scope', function () {
        gridOptionsData = drugCostsService.getDefaultGridOptions();
        inject(function ($window) {
            var compare = JSON.stringify;
            expect(typeof gridOptionsData.plugins[0]).toBe('object');
            expect(compare(gridOptionsData.plugins[0])).toEqual(compare(new $window.ngGridCsvExportPlugin()));
            expect($window.ngGridCsvExportPlugin).not.toBe(undefined);
});
    });
    it('should have the ngGrid Resize Plugin available in global scope', function () {
        gridOptionsData = drugCostsService.getDefaultGridOptions();
        inject(function ($window) {
            var compare = JSON.stringify;
            expect(typeof gridOptionsData.plugins[1]).toBe('object');
            expect(compare(gridOptionsData.plugins[1])).toEqual(compare(new $window.ngGridFlexibleHeightPlugin()));
            expect($window.ngGridFlexibleHeightPlugin).not.toBe(undefined);
            expect(gridOptionsData.plugins[1].scope).not.toBe(undefined);
        });
    });
});


