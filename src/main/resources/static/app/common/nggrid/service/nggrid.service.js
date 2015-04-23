(function () {
    'use strict';

    function GridService(GRIDCONSTANTS, localStorageService) {
        var exports = {
            setGridColDefinition: setGridColDefinition,
            changeGridCallback: changeGridCallback,
            getGridColumns: getGridColumns,
            setStorageGridColumns: setStorageGridColumns
        };

        /**
         * @ngdoc method
         * @name common.nggrid.service:gridCommonService#setGridColDefinition
         * @methodOf common.nggrid.service:gridCommonService
         * @param {GridModel} gridModel GridModel object
         * @description This method reads column definition either from constants or local storage and sets it.
         */
        function setGridColDefinition(gridModel) {
            var gridColumns = getGridColumns(gridModel.gridStorageName);
            if (!gridColumns) {
                console.log(gridModel.stateName);
                var t = GRIDCONSTANTS[gridModel.stateName + '.grid'];
                t = t[gridModel.gridName];
                gridModel.resetColDefs(_.extend(t, {headerCellTemplate: gridModel.headerCellTemplate}));
            } else {
                gridModel.resetColDefs(gridColumns);
            }
        }

        /**
         * @ngdoc method
         * @name common.nggrid.service:gridCommonService#changeGridCallback
         * @methodOf common.nggrid.service:gridCommonService
         * @param {ngColumn} newVal Changed values of grid cols
         * @returns {ngColumn} Returns Array of ngColumns.
         */
        function changeGridCallback(newVal) {
            var config = [];
            angular.forEach(newVal, function (col) {
                config.push(_.pick(col, 'field', 'displayName', 'width', 'visible', 'cellFilter', 'cellTemplate', 'pinned', 'headerCellTemplate'));
            });
            return config;
        }

        /**
         * @ngdoc method
         * @name common.nggrid.service:gridCommonService#getGridColumns
         * @methodOf common.nggrid.service:gridCommonService
         * @param {String} gridStorageName localStorage key of grid
         * @returns {ngColumn|undefined} Returns undefined or array of ngColumns
         * @description This method reads data from localstorage and returns it.
         */
        function getGridColumns(gridStorageName) {
            var gridColumns = localStorageService.get(gridStorageName);
            return gridColumns;
        }

        /**
         * @ngdoc method
         * @name common.nggrid.service:gridCommonService#setStorageGridColumns
         * @methodOf common.nggrid.service:gridCommonService
         * @param {String} gridStorageName localStorage key
         * @param {ngColumn} newColumns Array of ngColumns
         * @description This method sets ngColumns to the localstorage.
         */
        function setStorageGridColumns(gridStorageName, newColumns) {
            localStorageService.set(gridStorageName, angular.toJson(newColumns));
        }

        return exports;
    }
    /**
     * @ngdoc service
     * @namespace common.nggrid
     * @name common.nggrid.service:gridCommonService
     * @requires $http
     * @requires localStorageService
     * @description GridCommonService is used by GridModel.
     */
    angular.module('common.nggrid').service('gridCommonService', ['GRIDCONSTANTS', 'localStorageService', GridService]);
})();