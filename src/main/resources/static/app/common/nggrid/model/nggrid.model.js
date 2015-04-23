(function () {
    'use strict';
    /**
     * 
     */
    angular.module('common.nggrid').factory('GridModel', ['gridCommonService', GridModelDefinition]);
    function GridModelDefinition(gridCommonService) {
        /**
         * @ngdoc object
         * @namespace common.nggrid
         * @name common.nggrid.object:GridModel
         * @param {String} stateName current state name
         * @param {String} gridName unique grid name
         * @param {boolean} useCustomColDef Use dynamic column definition
         * @description 
         * <p>GridModel is a generalize object which contains basic setting for 
         * ng-grid and you can also override any configuration of ng-grid using this
         * GridModel object. <br/>
         * You can create this using <code>new GridModel();<code>;
         * </p>
         * @example 
         * <p>If We want to implement nggrid in Overview tab of RxOutcome
         * Report<br/>
         * We can have code like <br/><br/>
         * <code>
         * var gridModel = new GridModel('druggroup.detail.overview', 'incidenceRates', false);
         * </code>
         * </p>
         */
        function GridModel(stateName, gridName, useCustomColDef) {
            var self = this;
            self.data;
            self.useCustomColDef = useCustomColDef;
            /**
             * @ngdoc property
             * @name options
             * @type object
             * @propertyOf common.nggrid.object:GridModel 
             * @description Accepts the extra configuration parameter for ng-grid options.
             */
            self.options = {
                enableSorting: true,
                enableColumnResize: true,
                showGroupPanel: true,
                enableCellGrouping: true,
                showColumnMenu: true,
                enablePinning: true,
                enableRowSelection: false,
                showFilter: true,
                jqueryUITheme: true,
                plugins: [new ngGridFlexibleHeightPlugin({"maxHeight": 500}), new ngGridCsvExportPlugin()],
            };
            /**
             * @ngdoc property
             * @type {JSON}
             * @private
             * @name common.nggrid.object:GridModel#extendedOptions
             * @propertyOf common.nggrid.object:GridModel 
             * @description Accepts the extra configuration parameter for ng-grid options.
             */
            self.extendedOptions = {};

            /**
             * @ngdoc colDefs
             * @name common.nggrid.object:GridModel#colDefs
             * @propertyOf common.nggrid.object:GridModel 
             * @type {JSON}
             * @description 
             * <p align='justify'>Accepts Column Definition for the Grid. Either it reads from JSON file <br/>
             * or you can set it from outside using setColDefs method, <br/>
             * but make sure you set useCustomColDef to true
             * </p>
             */
            self.colDefs = {};
            /**
             * @ngdoc gridName
             * @type {String}
             * @name common.nggrid.object:GridModel#gridName
             * @propertyOf common.nggrid.object:GridModel 
             * @description 
             * <p>
             * GridName is passed through constructor, Make sure you pass <br/>
             * unique gridName per state.
             * </p>
             */
            self.gridName = gridName;
            self.stateName = stateName;
            self.gridStorageName = stateName + '.' + gridName + ".gridCols";
            self.headerCellTemplate = '<div class="ngHeaderSortColumn test" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">'
                    + '<div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter"'
                    + 'popover="{{Tooltipper(col.displayName)}}">'
                    + '{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>'
                    + '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>'
                    + '<div class="ngSortPriority">{{col.sortPriority}}</div>'
                    + '<div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div>'
                    + '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>';
            // init data of Grid model..
            if (!useCustomColDef) {
                gridCommonService.setGridColDefinition(this);
            }
        }


        // defining prototype
        GridModel.prototype = {
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#getOptions
             * @returns {JSON} Returns options
             * @methodOf common.nggrid.object:GridModel
             * @description
             * This method returns the options property of GridModel.
             */
            getOptions: function () {
                return this._options;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#setOptions
             * @param {object} options Configuration options of Grid
             * @methodOf common.nggrid.object:GridModel
             * @description
             * This method sets the options property of GridModel.
             */
            setOptions: function (options) {
                this._options = options;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#getColDefs
             * @methodOf common.nggrid.object:GridModel
             * @returns {JSON} Returns Column Definition of Grid
             * @description
             * This method sets the options property of GridModel.
             */
            getColDefs: function () {
                return this.colDefs;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#setColDefs
             * @param {JSON} colDefs current state name
             * @methodOf common.nggrid.object:GridModel
             * @description
             * <p>This method sets the colDefs property of GridModel,<br/> 
             * If Column definition is not found from localstorage </p>
             */
            setColDefs: function (colDefs) {
                var cols = gridCommonService.getGridColumns(this.gridStorageName);
                if (!cols) {
                    this.colDefs = colDefs;
                    gridCommonService.setStorageGridColumns(this.gridStorageName, colDefs);
                } else {
                    this.colDefs = cols;
                }
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#resetColDefs
             * @param {JSON} colDefs current state name
             * @methodOf common.nggrid.object:GridModel
             * @description
             * <p>This method resets the colDefs property of GridModel and add it to LocalStorage</p>.
             */
            resetColDefs: function (colDefs) {
                this.colDefs = colDefs;
                gridCommonService.setStorageGridColumns(this.gridStorageName, colDefs);
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#setData
             * @param {object} data Data Object for Grid
             * @methodOf common.nggrid.object:GridModel
             * @description
             * This method sets the data of GridModel.
             */
            setData: function (data) {
                this.data = data;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#getData
             * @methodOf common.nggrid.object:GridModel
             * @returns {Object} Data Object for Grid.
             * @description
             * This method returns the data property of GridModel.
             */
            getData: function () {
                return this.data;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#setDataForGrid
             * @param {String} dataParam Scope Variable name which contains data for Grid
             * @methodOf common.nggrid.object:GridModel
             * @description
             * This method sets the data property of GridModel.options.<br/>
             * like options.data = scopeVarNameThatContainsData
             */
            setDataForGrid: function (dataParam) {
                this._options['data'] = dataParam;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#setColumnDefinitionForGrid
             * @param {String} colDefParam Scope Variable name which contains Column Definition for Grid
             * @methodOf common.nggrid.object:GridModel
             * @description
             * This method sets the data property of GridModel.options.<br/>
             * like options.columnDefs = scopeVarNameThatContainsColumnDefs
             */
            setColumnDefinitionForGrid: function (colDefParam) {
                this._options['columnDefs'] = colDefParam;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#setColDefPropertyValue
             * @param {String} property Property to be set
             * @param {String} propertyValue Property value to be set
             * @methodOf common.nggrid.object:GridModel
             * @description
             * <p>This method sets the extra columnDefs property</p>.
             * @example
             * <p>If we want to override cellTemplate of every column for the grid</p><br/>
             * <code>
             * gridModel.setColDefPropertyValue('cellTemplate','Overridding Cell Template');
             * </code>
             */
            setColDefPropertyValue: function (property, propertyValue) {
                _.each(this.colDefs, function (colDef) {
                    colDef[property] = propertyValue;
                });
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#setFieldColDefPropertyValue
             * @param {String} field for which we want overide property
             * @param {String} property Property to be set
             * @param {String} propertyValue Property value to be set
             * @methodOf common.nggrid.object:GridModel
             * @description
             * <p>This method sets the extra columnDefs property</p>.
             * @example
             * <p>If we want to override cellTemplate of only drug_name column for the grid</p><br/>
             * <code>
             * gridModel.setFieldColDefPropertyValue('drug_name','cellTemplate','Overridding Cell Template');
             * </code>
             */
            setFieldColDefPropertyValue: function (field, property, propertyValue) {
                var fieldJSON = _.where(this.colDefs, {field: field});
                fieldJSON[property] = propertyValue;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#setOptionConfigProperty
             * @param {String} property property to be set
             * @param {Object} propertyValue Property Value to be set
             * @methodOf common.nggrid.object:GridModel
             * @description
             * This method sets the extran configuration of GridModel.options.
             * @example <p> If we want to set sortInfo
             * gridModel.setOptionConfigProperty('sortInfo', {fields:['a'], directions:['asc']});
             * </p>
             */
            setOptionConfigProperty: function (property, propertyValue) {
                this.extendedOptions[property] = propertyValue;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#getGridName
             * @returns {String} gridName
             * @methodOf common.nggrid.object:GridModel
             * @description
             * This method returns the grid name of GridModel.
             */
            getGridName: function () {
                return this.gridName;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:GridModel#setGridStorageName
             * @param {String} gridStorageName LocalStorage key for Grid
             * @methodOf common.nggrid.object:GridModel
             * @description
             * This method sets the grid Storage Name of GridModel.
             */
            setGridStorageName: function (gridStorageName) {
                this.gridStorageName = gridStorageName;
            }
        };

        Object.defineProperty(GridModel.prototype, "options", {
            get: function () {
                this._options = _.extend(this._options, this.extendedOptions);
                return this._options;
            },
            set: function (val) {
                this._options = val;
            }
        });
        return (GridModel);
    }

})();
