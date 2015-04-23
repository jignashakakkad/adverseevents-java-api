(function () {
    'use strict';
    //  Listcontroller
    angular.module('druggroup.list').controller('DrugGroupListCtrl', ['$stateParams', 'drugGroupService', DrugGroupListCtrl]);
    function DrugGroupListCtrl($stateParams, drugGroupService) {
        if ($stateParams.type) {
            this.drugGroupList = drugGroupService.getAll($stateParams.type).$object;
            if ($stateParams.type === 'indication') {
                this.title = "Indications (NDF-RT)";
            } else if ($stateParams.type === 'drugclass') {
                this.title = "Anatomical Therapeutic Class (ATC) Drug Classification";
            } else if ($stateParams.type === 'mechanism') {
                this.title = "Mechanism of Action (MoA)";
            }
        }
    }
})();
