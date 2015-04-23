describe('Controller: CompanyReportingCtrl', function () {

        beforeEach(module('common'));
        beforeEach(module('common.tooltip'));
        beforeEach(module('company'));

        var scope, ctrl;

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('CompanyReportingCtrl', {$scope: scope, QuarterlyData: [{}]});
        }));

        it('should be able to initialize and have a scope obj', inject(function () {

            expect(scope).toBeDefined();

        }));

        it('should strip out and normalize the restangular object myData', inject(function () {

            expect(scope.myData.length).toBe(1);

        }));



});
