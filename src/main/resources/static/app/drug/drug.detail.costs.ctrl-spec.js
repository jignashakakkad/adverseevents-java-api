describe("Controller: costsDrugCtrl", function(){

    var scope, $httpBackend, controllerConstructor, mockScoresData, tooltipCommonService, mockGridData, mockPieData, mockDrugCostService;

    beforeEach(module('common.tooltip'));
    beforeEach(module('drugs'));

    beforeEach(function() {


        mockDrugCostService = sinon.stub({
            costChartConfig: function() {},
            getDrugCostColumnDefinition: function() {},
            getChartNumbers: function() {},
            getGridNumbers: function() {},
            getDefaultGridOptions: function() {},
            getPieChartNumbers: function() {},
            localStorageClear: function() {},
            getCustomGridColumns: function() {},
            setCustomGridColumns: function() {},
            getTooltip: function() {}
        });

        module(function($provide) {
            $provide.value('drugCostsService', mockDrugCostService);
        });

        inject(function($rootScope, $controller, _tooltipCommonService_, _$httpBackend_) {
            scope = $rootScope.$new();
            mockPieData = sinon.stub({data: function() {}});
            mockScoresData = sinon.stub({data: function() {}});
            mockGridData = sinon.stub({data: function() {}});
            $httpBackend = _$httpBackend_;
            tooltipCommonService = _tooltipCommonService_
            controllerConstructor = $controller;
        });
        $httpBackend.expectGET('app/common/tooltip/json/tooltip.json').respond([{},{},{}]);





    });


    afterEach(function(){
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should initialize the controller successfully', function() {
        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        expect(ctrl).toBeDefined();

    });

    it('should have the TooltipModel available in the global scope', function() {

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });
        var win;

        inject(function($window){
            win = $window;

            expect(win.TooltipModel).toBeDefined();
            expect(typeof win.TooltipModel).toBe('function');
        });

    });

    it('should set the scope costChartConfig to the result of costChartConfig', function() {

        var mockCostChartConfigData = {};
        mockDrugCostService.costChartConfig.returns(mockCostChartConfigData);

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        expect(scope.costChartConfig).toBe(mockCostChartConfigData);
    });

    it('should set the scope onLabel to the first result in array CostsForPieChart.data', function() {

        var mockPieResult = 1;
        mockPieData.data = [1,2];

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        expect(scope.onLabel).toBe(mockPieResult);

    });

    it('should set the scope offLabel to the second result in array CostsForPieChart.data', function() {

        var mockPieResult = 2;
        mockPieData.data = [1,2];

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        expect(scope.offLabel).toBe(mockPieResult);

    });

    it('should set the scope headers to the result of getCustomGridColumns', function() {

        var mockDrugCostColDef = function() {};
        mockDrugCostService.getCustomGridColumns.returns(mockDrugCostColDef);

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        expect(scope.headers).toBe(mockDrugCostColDef);
    });

    it('should set the scope bigNumbers to the result of CostScoresForChart.data[0]', function() {

        var mockBigNumbers = 1;
        mockScoresData.data = [1,2];

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        expect(scope.bigNumbers).toBe(mockBigNumbers);
    });

    it('should set the scope title to "Top 10 Adverse Events by RxCost (2010 - 2014)"', function() {

        var mockTitle = 'Top 10 Adverse Events by RxCost (2010 - 2014)';

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        expect(scope.title).toBe(mockTitle);
    });

    it('should set the scope gridNumbers to the result of CostsForGrid.data', function() {

        var mockGridNumbers = mockGridData.data;

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        expect(scope.gridNumbers).toBe(mockGridNumbers);

    });

    it('should set the scope drugCostGridOptions to the result of getDefaultGridOptions', function() {

        var mockDrugCostGridOptions = {};
        mockDrugCostService.getDefaultGridOptions.returns(mockDrugCostGridOptions);

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        expect(scope.drugCostGridOptions).toBe(mockDrugCostGridOptions);

    });

    it('should not call localStorageClear svc on initialization', function() {

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        spyOn(scope, 'localStorageClear');
        expect(scope.localStorageClear).not.toHaveBeenCalled();

    });

    it('should call the localStorageClear svc only when $scope.localStorageClear() is called', function() {

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        spyOn(scope, 'localStorageClear');
        scope.localStorageClear();
        expect(scope.localStorageClear).toHaveBeenCalled();

    });

    it('should call gridUpdate when $scope.gridUpdate() is called', function() {

        var mockGridNumbers = {};
        mockDrugCostService.getGridNumbers.returns(mockGridNumbers);

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        spyOn(scope, 'gridUpdate');
        scope.gridUpdate();
        expect(scope.gridUpdate).toHaveBeenCalled();
    });

    // need to mock success callback for example to work
    xit('should set gridNumbers to response when gridUpdate is called', function() {

        var mockGridNumbers = {};
        mockDrugCostService.getGridNumbers.returns(mockGridNumbers);

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        scope.gridUpdate();
        expect(scope.gridNumbers).toBe(mockGridNumbers);
    });

    it('should run gridUpdate within the watch block when toggle value changes', function() {

        var ctrl = controllerConstructor('costsDrugCtrl', {
            $scope: scope,
            CostScoresForChart: mockScoresData,
            CostsForGrid: mockGridData,
            CostsForPieChart: mockPieData
        });

        spyOn(scope, 'gridUpdate');

        // set toggle initial value
        scope.toggle = true;
        scope.$digest();

        // update toggle, then run digest
        scope.toggle = false;
        scope.$digest();

        expect(scope.gridUpdate).toHaveBeenCalled();
    });

});
