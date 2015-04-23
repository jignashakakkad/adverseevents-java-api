/**
 * @ngdoc object
 * @namespace common.tooltip
 * @module common.tooltip
 * @name common.tooltip.object:TooltipModel
 * @description 
 * <p>TooltipModel is a generalize object which contains basic setting for 
 * tooltip and tooltion list for every state. <br/>
 * You can create this using <code>new TooltipModel();<code>
 */
var TooltipModel = function () {
    var self = this;
    self.tooltipList = [];
    self.modules = [];
    self.useCommonModule = false;
};

TooltipModel.prototype = {
    /**
     * @ngdoc method
     * @name common.tooltip.object:TooltipModel#getTooltipList
     * @methodOf common.tooltip.object:TooltipModel
     * @returns {Array} Returns JSON array of tooltips for current state.
     * @description This method returns the list of tooltip data from json accoring to the current state.
     */
    getTooltipList: function () {
        return this.tooltipList;
    },
    /**
     * @ngdoc method
     * @name common.tooltip.object:TooltipModel#setTooltipList
     * @methodOf common.tooltip.object:TooltipModel     
     * @param {JSON} tooltipList tooltipList to be set.
     * @description This method sets tooltip list when triggered.
     */
    setTooltipList: function (tooltipList) {
        this.tooltipList = tooltipList;
    },
    /**
     * @ngdoc method
     * @name common.tooltip.object:TooltipModel#getTooltip
     * @methodOf common.tooltip.object:TooltipModel
     * @param {String} displayName name for which tooltip should be displayed.
     * @returns {String} Returns tooltip data for provided display Name
     * @description This method retrieves tool tip data for provided text.
     */
    getTooltip: function (displayName) {
        return _.pluck(_.where(this.tooltipList, {'key': displayName}), 'value')[0];
    },
    /**
     * @ngdoc method
     * @name common.tooltip.object:TooltipModel#setModules
     * @methodOf common.tooltip.object:TooltipModel
     * @param {Array} modules Array of module string for which tooltip data should be retrieved.
     * @description This method sets modules when triggered
     */
    setModules: function (modules) {
        this.modules = modules;
    },
    /**
     * @ngdoc method
     * @name common.tooltip.object:TooltipModel#getModules
     * @methodOf common.tooltip.object:TooltipModel
     * @returns {Array} modules for which tooltip data should be fetched.
     * @description This method returns the modules.
     */
    getModules: function () {
        return this.modules;
    },
    /**
     * @ngdoc method
     * @name common.tooltip.object:TooltipModel#setUseCommonModule
     * @methodOf common.tooltip.object:TooltipModel
     * @param {boolean} value Set to true of tooltip from common module needs to be fetched.
     * @description This method sets true or false depending on if want to have data from common module.
     */
    setUseCommonModule: function (value) {
        this.useCommonModule = value;
    },
    /**
     * @ngdoc method
     * @name common.tooltip.object:TooltipModel#getUseCommonModule
     * @methodOf common.tooltip.object:TooltipModel
     * @returns {boolean} Returns boolean value if want to have common tooltip data.
     * @description This method returns boolean value if want to use common module.
     */
    getUseCommonModule: function () {
        return this.useCommonModule;
    }

};

angular.module('common.tooltip', []).value('TooltipModel', TooltipModel);