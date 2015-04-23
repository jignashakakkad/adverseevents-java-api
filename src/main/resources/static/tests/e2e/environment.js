/**
 * Created by cerdman on 3/17/15.
 */
var exports;

exports.protractorFiles = {

    specs:[
    'portfolio/detail/portfolio.detail.indication.e2e.js',
    'portfolio/detail/portfolio.detail.data.qa.e2e.js',
    'portfolio/detail/portfolio.detail.drugclass.e2e.js',
    'portfolio/detail/portfolio.detail.news.e2e.js',
    'portfolio/detail/portfolio.detail.outcomes.e2e.js',
    'portfolio/detail/portfolio.detail.overview.e2e.js',
    'portfolio/detail/portfolio.detail.reporting.e2e.js',
    'portfolio/detail/portfolio.detail.rxsignal.e2e.js',
    'portfolio/detail/portfolio.detail.rxsignal.summary.e2e.js',
    'drug/drugdetail-ui.e2e.js',
    'drug/drugdetail-presentation-logic.e2e.js',
    'main/navigation-functional-qa.e2e.js',
    'company/company-presentation-logic.e2e.js',
    'company/company-overview.e2e.js',
    'company/company-rxsignal-summary.e2e.js',
    'company/company-reporting.e2e.js',
    'company/company-rxsignal.e2e.js',
    'company/company-news.e2e.js',
    'company/company-outcomes.e2e.js',
    'company/company-rxscore.e2e.js',
    'company/company-indication.e2e.js',
    'company/company-class.e2e.js',
    'rxoutcome/rxoutcome-presentation-logic.e2e.js',
    'portfolio/portfolio.manager-functional-qa.e2e.js'
    ],

    suites: {
        'smoke': ['drug/drugdetail-ui.e2e.js',
            'main/navigation-functional-qa.e2e.js',
            'company/company-presentation-logic.e2e.js',
            'company/company-overview.e2e.js',
            'portfolio/portfolio.manager-functional-qa.e2e.js'
        ],
        'company': ['company/company*.e2e.js'],
        'portfolio': ['portfolio/portfolio.manager-functional-qa.e2e.js'],
        'portfolio-detail': [
            'portfolio/detail/portfolio.detail.indication.e2e.js',
            'portfolio/detail/portfolio.detail.data.qa.e2e.js',
            'portfolio/detail/portfolio.detail.drugclass.e2e.js',
            'portfolio/detail/portfolio.detail.news.e2e.js',
            'portfolio/detail/portfolio.detail.outcomes.e2e.js',
            'portfolio/detail/portfolio.detail.overview.e2e.js',
            'portfolio/detail/portfolio.detail.reporting.e2e.js',
            'portfolio/detail/portfolio.detail.rxsignal.e2e.js',
            'portfolio/detail/portfolio.detail.rxsignal.summary.e2e.js'
        ],
        'drug': ['drug/drugdetail-presentation-logic.e2e.js'],
        'rxoutcome': ['rxoutcome/*.e2e.js']
    }
};
