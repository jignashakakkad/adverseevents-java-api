describe('Service: common.tooltipService', function () {

  beforeEach(module('common'));
  beforeEach(module('common.tooltip'));

    it('should have the .getToolTip method defined', inject(function (tooltipCommonService) {
        expect(tooltipCommonService.getToolTip).toBeDefined();
    }));

    it('should have the .getToolTipList method defined', inject(function (tooltipCommonService) {
        expect(tooltipCommonService.getToolTipList).toBeDefined();
    }));

    it('should have the .formatTooltipModel', inject(function (tooltipCommonService) {
        expect(tooltipCommonService.formatTooltipModel).toBeDefined();
  }));
});
