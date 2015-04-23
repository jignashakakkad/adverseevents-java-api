(function () {
    'use strict';
    function ToolTipService($http) {
        var exports = {
            getToolTipList: getToolTipList,
            formatTooltipModel: formatTooltipModel,
            getToolTip: getToolTip
        };

        exports.toolTipModel;
        /**
         * @ngdoc method 
         * @name common.tooltip.service:tooltipCommonService#getToolTip
         * @methodOf common.tooltip.service:tooltipCommonService
         * @param {String} displayName pophover text for which tool tip needs to be fetched.
         * @returns {method} Returns directly method access to controller
         * @description This method returns the method access to controller to get tooltip.
         */
        function getToolTip(displayName) {
            return exports.toolTipModel.getTooltip(displayName);
        }
        /**
         * @ngdoc method 
         * @name common.tooltip.service:tooltipCommonService#getToolTipList
         * @methodOf common.tooltip.service:tooltipCommonService
         * @param {Object} TooltipModel object of TooltipModel
         * @returns {TooltipModel} Returns object of TooltipModel with tooltipList
         * @description This method returns the object of TooltipModek with setting tooltipList
         *  from json according to the state it is being called.
         */
        function getToolTipList(TooltipModel) {
            formatTooltipModel(TooltipModel);
            return $http.get('app/common/tooltip/json/tooltip.json').success(function (response) {
                var t = response;
                if (!!TooltipModel.getModules()) {
                    var tData = [];
                    _.each(TooltipModel.getModules(), function (module) {
                        angular.extend(tData, _.where(t, {module: module}));
                    });
                    TooltipModel.setTooltipList(tData);
                } else {
                    TooltipModel.setTooltipList(t);
                }
                exports.toolTipModel = TooltipModel;
                return TooltipModel;
            });
        }
        /**
         * @ngdoc method 
         * @name common.tooltip.service:tooltipCommonService#formatTooltipModel
         * @methodOf common.tooltip.service:tooltipCommonService
         * @param {Object} TooltipModel object that passed from controller to be formatted.
         * @description This method set modules according to current state and common if asked for.
         */
        function formatTooltipModel(TooltipModel) {
            if (!TooltipModel) {
                var tooltipModel = new ToolTipModel();
                tooltipModel.setModules(["common"]);
                TooltipModel = tooltipModel;
            }
            if (TooltipModel.useCommonModule) {
                if (!_.contains(TooltipModel.getModules(), 'common')) {
                    TooltipModel.getModules().push('common');
                }
            }
        }
        return exports;
    }
    /**
     * @ngdoc service
     * @name common.tooltip.service:tooltipCommonService
     * @requires $http
     * @description This service is used by controller to retrieve data and sends tooltip data on UI.
     */
    angular.module('common.tooltip').service('tooltipCommonService', ['$http', ToolTipService]);
})();
