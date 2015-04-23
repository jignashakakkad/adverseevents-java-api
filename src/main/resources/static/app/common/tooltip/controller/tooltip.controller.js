(function () {
    'use strict';
    /**
     * @ngdoc controller
     * @name common.tooltip.controller:TooltioController
     * @requires $scope
     * @requires TooltipModel
     * @requires tooltipCommonService
     * @description This controller when initiated loads tooltip from json and passes to the calling controller.
     */
    angular.module('common.tooltip').controller('TooltipController', ['$scope', 'TooltipModel', 'tooltipCommonService', TooltipController]);
    function TooltipController($scope, TooltipModel, tooltipCommonService) {
        var dc = $scope;
        tooltipCommonService.getToolTipList(TooltipModel).then(function() {
            dc.Tooltipper = tooltipCommonService.getToolTip;
            dc.getTooltip = tooltipCommonService.getToolTip;
        });
    }
})();
