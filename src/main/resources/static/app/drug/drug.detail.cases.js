angular.module('drugs').controller('DrugCasesCtrl', function ($scope, $filter, $state, $debounce, $stateParams, utilService, Drug, Cases, Restangular) {
    $scope.caseFilter = {
        dateLimit: '',
        outcomes: [
            {"outc_cod": "1"},
            {"outc_cod": 'OT'},
            {"outc_cod": 'HO'},
            {"outc_cod": 'DE'},
            {"outc_cod": 'LT'},
            {"outc_cod": 'RI'},
            {"outc_cod": 'NS'},
            {"outc_cod": 'CA'}
        ],
        caseLimit: 10,
        selectedSource: "1",
        selectedGender: "1",
        selectedOccp: "1",
        selectedOutc: "1",
        init: false
    };

    var utilFn = utilService;
    $scope.outcomeFormatter = utilFn.formatter.outcomes;
    $scope.genderFormatter = utilFn.formatter.gender;
    $scope.reporterFormatter = utilFn.formatter.reporters;
    $scope.outcomeName = function (outc_cod) {
        var d = $scope.outcomeFormatter(outc_cod);
        return d.name;
    };
    $scope.outcomeId = function (outc_cod) {
        var d = $scope.outcomeFormatter(outc_cod);
        return d.name;
    };

    $scope.reporterName = function (occp_cod) {

        var d = $scope.reporterFormatter(occp_cod);
        if (d) {

            return d.name;
        }
    };
    $scope.reporterId = function (occp_cod) {

        var d = $scope.reporterFormatter(occp_cod);
        if (d) {

            return d.id;
        }
    };
    $scope.genderName = function (gender) {

        var d = $scope.genderFormatter(gender);
        if (d) {

            return d.name;
        }
    };
    $scope.genderId = function (gender) {

        var d = $scope.genderFormatter(gender);
        if (d) {

            return d.name;
        }
    };


    var filterCases;
    filterCases = function () {
        $scope.Cases = Cases[0];
        var filters = {occp: $scope.caseFilter.selectedOccp, outc: $scope.caseFilter.selectedOutc, source: $scope.caseFilter.selectedSource, gndr: $scope.caseFilter.selectedGender};
        var query = {};
        for (var i in filters) {
            var filterVal = (filters[i] === undefined) ? 1 : filters[i];
            query['filters[' + i + ']'] = filterVal;
        }

        $scope.Cases.get(query).then(function (d) {

            var caseList = d[0];

            $scope.CaseList = caseList.cases;
        });
    };


    $scope.$watchCollection('caseFilter', function (newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }

        $debounce(filterCases, 500);
    });

    $scope.caseLimit = 50;
    filterCases();
});