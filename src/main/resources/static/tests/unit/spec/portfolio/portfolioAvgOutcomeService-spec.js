describe('portfolioAvgOutcomeService', function() {

	var outcomes = [{"product_drugname":"Sumavel Dosepro","aedrug_id":3194,"indication_name":"Migraine Disorders","outc_cod":"DE","metric_pscount":1,"metric_totalcount":2,"metric_icumulative":0,"metric_i2011":0,"metric_i2012":0,"metric_i2013":0},{"product_drugname":"Sumavel Dosepro","aedrug_id":3194,"indication_name":"Migraine Disorders","outc_cod":"HO","metric_pscount":5,"metric_totalcount":9,"metric_icumulative":0,"metric_i2011":0,"metric_i2012":0,"metric_i2013":0},{"product_drugname":"Sumavel Dosepro","aedrug_id":3194,"indication_name":"Migraine Disorders","outc_cod":"LT","metric_pscount":2,"metric_totalcount":2,"metric_icumulative":0,"metric_i2011":0,"metric_i2012":0,"metric_i2013":0},{"product_drugname":"Sumavel Dosepro","aedrug_id":3194,"indication_name":"Migraine Disorders","outc_cod":"NS","metric_pscount":6,"metric_totalcount":15,"metric_icumulative":0,"metric_i2011":0,"metric_i2012":0,"metric_i2013":0},{"product_drugname":"Sumavel Dosepro","aedrug_id":3194,"indication_name":"Migraine Disorders","outc_cod":"OT","metric_pscount":4,"metric_totalcount":7,"metric_icumulative":0,"metric_i2011":0,"metric_i2012":0,"metric_i2013":0}];
	var averages = { ps_count_avg : 2.6666666666666665, total_count_avg : 4.333333333333333, total_outcome_2011_avg : 0, total_outcome_2012_avg : 0, total_outcome_2013_avg : 0, three_year_avg : 0 };
	beforeEach(module('portfolio'));

	it('should produce an average of all company or portfolio drug outcomes', inject(function(portfolioAvgOutcomeService) {

		expect(portfolioAvgOutcomeService.getAvgOutcomes(outcomes)).toEqual(averages);

	}));

});
