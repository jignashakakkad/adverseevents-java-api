describe("Controller: DrugGroupCostCtrl", function () {

    var scope, state, controllerConstructor, mockDrugGroupCostData, mockDrugGroupCostService, mockDrugGroup, $httpBackend, GridModel;


    beforeEach(module('common.tooltip'));
    beforeEach(module('common.nggrid'));
    beforeEach(module('druggroup'));

    beforeEach(function () {

        mockDrugGroupCostService = sinon.stub({
            getDrugGroupCosts: function () {
            },
            getCostChartConfig: function () {
            },
            setDrugGroupName: function () {
            }
        });

        mockDrugGroup = [{dimLabel: '', dimCode: '', dimType: ''}];


        module(function ($provide) {
            $provide.value('drugGroupCostService', mockDrugGroupCostService);
            $provide.value('DrugGroup', mockDrugGroup);

        });

        inject(function ($rootScope, $controller, _DrugGroup_, _$httpBackend_, _GridModel_) {
            scope = $rootScope.$new();
            state = {};
            state.current = {'name':'druggroup.detail.costs'};
            scope.DrugGroup = mockDrugGroup;
            GridModel = _GridModel_;
            $httpBackend = _$httpBackend_;
            mockDrugGroupCostData = sinon.stub({data: function () {
                }});
            controllerConstructor = $controller;
        });

        $httpBackend.expectGET('app/common/tooltip/json/tooltip.json').respond([{}, {}, {}]);
//        $httpBackend.expectGET('app/common/ngrid/json/druggroup.detail.costs.grid.json').respond([{}, {}, {}]);

    });

    xit('DrugGroupCostCtrl : should initialize the controller successfully', function () {

        var ctrl = controllerConstructor('DrugGroupCostCtrl', {
            $scope: scope,
            DrugGroupCostData: mockDrugGroupCostData
        });
        expect(ctrl).toBeDefined();
    });

    xit('DrugGroupCostCtrl : should set the scope patientCostsHeader to the result of getPatientCostsGridColumns', function () {
        var mockDrugCostGroupColDef = function () {
        };

        var ctrl = controllerConstructor('DrugGroupCostCtrl', {
            $scope: scope,
            DrugGroupCostData: mockDrugGroupCostData
        });
        expect(scope.patientCostsHeader).toBe(mockDrugCostGroupColDef);
    });

    it('DrugGroupCostCtrl : GridModel Should be instantiable from Controller', function () {
        var ctrl = controllerConstructor('DrugGroupCostCtrl', {
            $scope: scope,
            $state: state,
            DrugGroupCostData: mockDrugGroupCostData
        });
        expect(new GridModel('druggroup.detail.costs','outcomesCosts', false)).not.toBe(undefined);
    });

    it('DrugGroupCostCtrl : GridModel Should be instantiable from grid with gridName', function () {
        var ctrl = controllerConstructor('DrugGroupCostCtrl', {
            $scope: scope,
            $state: state,
            DrugGroupCostData: mockDrugGroupCostData,
        });
        expect(new GridModel('druggroup.detail.costs','outcomesCosts', false).getGridName()).toEqual('outcomesCosts');
    });
    
    it('DrugGroupCostCtrl : GridModel should init grid data for the scope', function () {
        var gridModels = [];
        var gridModel = new GridModel('druggroup.detail.costs','outcomesCosts', false);
        gridModels.push(gridModel);
        var ctrl = controllerConstructor('DrugGroupCostCtrl', {
            $scope: scope,
            $state: state,
            DrugGroupCostData: mockDrugGroupCostData,
        });
        var data = controllerConstructor('GridController', {
            $scope: scope,
            GridModels : gridModels,
        });
        expect(scope.outcomesCosts).not.toBe(undefined);
    });
//
    it('DrugGroupCostCtrl : GridModel should init grid options for the scope', function () {
        var gridModels = [];
        var gridModel = new GridModel('druggroup.detail.costs','outcomesCosts', false);
        gridModels.push(gridModel);
        var ctrl = controllerConstructor('DrugGroupCostCtrl', {
            $scope: scope,
            $state: state,
            DrugGroupCostData: mockDrugGroupCostData,
        });
        var data = controllerConstructor('GridController', {
            $scope: scope,
            GridModels : gridModels,
        });
        expect(scope.outcomesCosts.options.columnDefs).not.toBe(undefined);
    });


});
