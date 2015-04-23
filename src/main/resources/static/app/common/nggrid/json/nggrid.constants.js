(function () {
    'use strict';
    angular.module('common.nggrid', []).constant('GRIDCONSTANTS', {
        'druggroup.detail.costs.grid': {
            "outcomesCosts": [
                {
                    "field": "aedrug_label",
                    "cellClass": "drugName",
                    "width": "197px",
                    "visible": true,
                    "pinned": true,
                    "displayName": "Product Name(s)",
                    "cellTemplate": "<div class=\"ngCellText pull-left\"><a ui-sref=\"drugs.detail.costs({id:row.getProperty('aedrug_id') })\">{{row.getProperty(col.field) | pascalCaseFilter }}</a></div>"
                },
                {
                    "field": "metric_mean_patient_cost_rx",
                    "width": "176px",
                    "visible": true,
                    "displayName": "RxCost Per Prescription",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | currency:$:2 }}</div>"
                },
                {
                    "field": "metric_drug_price_rx",
                    "width": "244px",
                    "visible": true,
                    "displayName": "Retail Price Per Prescription (2014)",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | currency:$:2 }}</div>"
                },
                {
                    "field": "metric_sum_annual_costs_rx",
                    "width": "206px",
                    "visible": true,
                    "displayName": "Total Costs Per Prescription",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | currency:$:2 }}</div>"
                },
                {
                    "field": "metric_sum_costed_rx",
                    "width": "108px",
                    "visible": true,
                    "displayName": "Prescriptions",
                    "cellFilter": "number:0",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | number:0}}</div>"
                },
                {
                    "field": "metric_potential_savings_rx",
                    "width": "*",
                    "visible": true,
                    "displayName": "RxCost Savings (Per Rx)",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | currency:$:0 }}</div>"
                },
                {
                    "field": "metric_mean_patient_cost",
                    "width": "*",
                    "visible": false,
                    "displayName": "RxCost Per Patient",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | currency:$:2 }}</div>"
                },
                {
                    "field": "metric_pctg_event_onlabel_cost",
                    "width": "**",
                    "visible": false,
                    "displayName": "% Costs Unlabeled Risks",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | pctgFilter:2 }}</div>"
                },
                {
                    "field": "metric_rate_ime_serious",
                    "width": "*",
                    "visible": false,
                    "displayName": "Serious AE Rate",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | incidenceFilter }}</div>"
                },
                {
                    "field": "metric_sum_costed_patient",
                    "visible": false,
                    "displayName": "Annual Patients",
                    "cellFilter": "number:0",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | number:0 }}</div>"
                },
                {
                    "field": "metric_mean_cost_otherdrug",
                    "width": "*",
                    "visible": false,
                    "displayName": "Avg. Costs for Other Drugs (Per Patient)",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | currency:$:2 }}</div>"
                },
                {
                    "field": "metric_mean_cost_otherdrug_rx",
                    "width": "*",
                    "visible": false,
                    "displayName": "Avg. Costs for Other Drugs (Per Rx)",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | currency:$:2 }}</div>"
                },
                {
                    "field": "metric_sum_annual_costs",
                    "width": "*",
                    "visible": false,
                    "displayName": "Annual RxCost",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | currency:$:0 }}</div>"
                },
                {
                    "field": "metric_potential_savings",
                    "width": "*",
                    "visible": false,
                    "displayName": "RxCost Savings (Per Patient)",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | currency:$:0 }}</div>"
                },
                {
                    "field": "metric_potential_savings_x5",
                    "width": "*",
                    "visible": false,
                    "displayName": "Potential Savings (Per Patient x5)",
                    "cellTemplate": "<div class=\"ngCellText text-center\">{{row.getProperty(col.field) | currency:$:0 }}</div>"
                }
            ]
        },
        'druggroup.detail.monitor.grid': {
            "eventsGrid": [{
                    "field": "event_dt",
                    "pinned": true,
                    "cellClass": "drugName",
                    "width": "10%",
                    "visible": true,
                    "cellFilter": "date",
                    "displayName": "Date"
                },
                {
                    "field": "product_drugname",
                    "cellClass": "drugName",
                    "width": "20%",
                    "visible": true,
                    "displayName": "Product",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='drugs.detail.rxsignal({id:row.getProperty(\"aedrug_id\") })'>{{row.getProperty(col.field)  | pascalCaseFilter }}</a></div>"
                },
                {
                    "field": "alert_type",
                    "cellClass": "drugName",
                    "width": "50%",
                    "visible": true,
                    "displayName": "Headline",
                    "cellTemplate": "<div class='ngCellText monitor-headline'>{{row.getProperty(col.field)}}</div>"
                },
                {
                    "field": "event_type",
                    "cellClass": "drugName",
                    "width": "20%",
                    "visible": true,
                    "displayName": "Event Type"
                }]
        },
        'druggroup.detail.overview.grid': {
            "incidenceRates": [
                {
                    "field": "product_drugname",
                    "cellClass": "drugName",
                    "width": "220px",
                    "visible": true,
                    "pinned": true,
                    "displayName": "Product Name(s)",
                    "cellTemplate": "<div class='ngCellText pull-left'><a ui-sref='drugs.detail.rxsignal({id:row.getProperty(\"aedrug_id\") })'>{{row.getProperty(col.field) | pascalCaseFilter }}</a></div>"
                },
                {
                    "field": "metric_icumulative_serious",
                    "width": "220px",
                    "visible": true,
                    "cellFilter": "incidenceFilter",
                    "displayName": "Serious Outcome Rate",
                    "cellTemplate": "<div ng-class='{\"ngCellText\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"ngCellText\",\"green\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"green\",\"red\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"red\"}'><p>{{ row.getProperty(col.field) | incidenceFilter}}</p></div>"

                },
                {
                    "field": "metric_icumulative_hosp",
                    "width": "220px",
                    "cellFilter": "incidenceFilter",
                    "visible": true,
                    "displayName": "Hospitalization Rate",
                    "cellTemplate": "<div ng-class='{\"ngCellText\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"ngCellText\",\"green\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"green\",\"red\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"red\"}'><p>{{ row.getProperty(col.field) | incidenceFilter}}</p></div>"

                },
                {
                    "field": "metric_icumulative_ime",
                    "width": "220px",
                    "cellFilter": "incidenceFilter",
                    "visible": true,
                    "displayName": "IME Serious Rate",
                    "cellTemplate": "<div ng-class='{\"ngCellText\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"ngCellText\",\"green\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"green\",\"red\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"red\"}'><p>{{ row.getProperty(col.field) | incidenceFilter}}</p></div>"
                },
                {
                    "field": "metric_icumulative_dme",
                    "width": "*",
                    "cellFilter": "incidenceFilter",
                    "visible": true,
                    "displayName": "DME Serious Rate",
                    "cellTemplate": "<div ng-class='{\"ngCellText\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"ngCellText\",\"green\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"green\",\"red\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"red\"}'><p>{{ row.getProperty(col.field) | incidenceFilter}}</p></div>"

                }
            ]
        },
        'druggroup.detail.quarterly.grid': {
            "reportingGrid": [{
                    "field": "A",
                    "pinned": true,
                    "cellClass": "drugName",
                    "width": "*",
                    "visible": true,
                    "displayName": "Product",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='drugs.detail.rxsignal({id:row.getProperty(\"B\") })'>{{row.getProperty(col.field) | pascalCaseFilter}}</a></div>"
                },
                {
                    "field": "dt_approval",
                    "cellClass": "drugName",
                    "visible": true,
                    "cellFilter": "date:'M/dd/yyyy'",
                    "displayName": "Approval"
                },
                {
                    "field": "evaluate_productRevenue2013",
                    "cellClass": "drugName",
                    "cellFilter": "number:2",
                    "visible": true,
                    "displayName": "Revenue(\"13)"
                },
                {
                    "field": "dt_max_received",
                    "cellClass": "drugName",
                    "visible": true,
                    "cellFilter": "date:'M/dd/yyyy'",
                    "displayName": "Updated"
                },
                {
                    "field": "x0q3",
                    "cellClass": "drugName",
                    "cellFilter": "number",
                    "visible": true,
                    "displayName": "Q3 2012"
                },
                {
                    "field": "x0q4",
                    "cellClass": "drugName",
                    "cellFilter": "number",
                    "visible": true,
                    "displayName": "Q4 2012"
                },
                {
                    "field": "x1q1",
                    "cellClass": "drugName",
                    "cellFilter": "number",
                    "visible": true,
                    "displayName": "Q1 2013"
                },
                {
                    "field": "x1q2",
                    "cellClass": "drugName",
                    "cellFilter": "number",
                    "visible": true,
                    "displayName": "Q2 2013"
                },
                {
                    "field": "x1q3",
                    "cellClass": "drugName",
                    "cellFilter": "number",
                    "visible": true,
                    "displayName": "Q3 2013"
                },
                {
                    "field": "x1q4",
                    "cellClass": "drugName",
                    "cellFilter": "number",
                    "visible": true,
                    "displayName": "Q4 2013"
                },
                {
                    "field": "x2q1",
                    "cellClass": "drugName",
                    "cellFilter": "number",
                    "visible": true,
                    "displayName": "Q1 2014"
                },
                {
                    "field": "x2q2",
                    "cellClass": "drugName",
                    "cellFilter": "number",
                    "visible": true,
                    "displayName": "Q2 2014"
                }
            ]
        },
        'druggroup.detail.rxsignal.grid': {
            "rxsignalSummary": [
                {
                    "field": "product_drugnames",
                    "visible": true,
                    "width": 300,
                    "pinned": true,
                    "displayName": "Product Name(s)",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='drugs.detail.rxsignal({id: row.getProperty(\"aedrug_id\")})'>{{row.getProperty(col.field) | pascalCaseFilter}}</a></div>"
                },
                {
                    "field": "evaluate_productRevenue2013",
                    "displayName": "2013 Revenue",
                    "cellFilter": "number:2",
                    "visible": true
                },
                {
                    "field": "metric_rxsignal_active",
                    "displayName": "Active RxSignal",
                    "cellFilter": "number:0",
                    "visible": true
                },
                {
                    "field": "metric_rxsignal_watchlist",
                    "displayName": "Watchlist RxSignal",
                    "width": "160",
                    "cellFilter": "number:0",
                    "visible": true
                },
                {
                    "field": "metric_reac",
                    "displayName": "Total (Active/Watchlist)",
                    "width": "180",
                    "cellFilter": "number:0",
                    "visible": true
                },
                {
                    "field": "ROR",
                    "width": 90,
                    "cellFilter": "number:2",
                    "visible": true,
                    "displayName": "Avg. ROR"
                },
                {
                    "field": "PRR",
                    "visible": false,
                    "cellFilter": "number:2",
                    "displayName": "Avg. PRR"
                },
                {
                    "field": "metric_rxsignal_ime",
                    "displayName": "IME Serious",
                    "cellFilter": "number:0",
                    "visible": false
                },
                {
                    "field": "metric_rxsignal_dme",
                    "displayName": "DME",
                    "cellFilter": "number:0",
                    "visible": true
                }
            ]
        },
        'portfolio.detail.drugclass.grid': {
            "portfolioDrugclass": [
                {
                    "field": "dimLabel",
                    "width": "352px",
                    "visible": true,
                    "pinned": true,
                    "displayName": "Drug Class",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='druggroup.detail.overview({type:\"drugclass\", id:\"{{row.getProperty(\"dimCode\")}}\"})'>{{row.getProperty(col.field)}}</a></div>"
                },
                {
                    "field": "metric_drugcount",
                    "cellClass": "centerCellText",
                    "width": "141px",
                    "visible": true,
                    "displayName": "Number of Drugs",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? row.getProperty(col.field) : '-'}}</div>"
                },
                {
                    "field": "metric_weighted_rxscore",
                    "cellClass": "centerCellText",
                    "width": "142px",
                    "visible": true,
                    "displayName": "Average RxScore",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? row.getProperty(col.field) : '-'}}</div>"
                },
                {
                    "field": "metrics.metric_reduced_totalsignals",
                    "cellClass": "centerCellText",
                    "width": "174px",
                    "visible": true,
                    "displayName": "# RxSignal Active ADE",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? row.getProperty(col.field) : '-'}}</div>"
                },
                {
                    "field": "metrics.metric_reduced_pscount",
                    "cellClass": "centerCellText",
                    "width": "*",
                    "visible": true,
                    "displayName": "RxSignal ADE Primary Suspect Cases",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                }
            ]
        },
        'portfolio.detail.indication.grid': {
            "portfolioIndication": [
                {
                    "field": "dimLabel",
                    "width": "352px",
                    "visible": true,
                    "pinned": true,
                    "displayName": "Indication",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='druggroup.detail.overview({type:\"indication\", id:\"{{row.getProperty(\"dimCode\")}}\"})'>{{row.getProperty(col.field)}}</a></div>"
                },
                {
                    "field": "metric_drugcount",
                    "cellClass": "centerCellText",
                    "width": "141px",
                    "visible": true,
                    "displayName": "Number of Drugs",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? row.getProperty(col.field) : '-'}}</div>"
                },
                {
                    "field": "metric_weighted_rxscore",
                    "cellClass": "centerCellText",
                    "width": "142px",
                    "visible": true,
                    "displayName": "Average RxScore",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? row.getProperty(col.field) : '-'}}</div>"
                },
                {
                    "field": "metrics.metric_reduced_totalsignals",
                    "cellClass": "centerCellText",
                    "width": "174px",
                    "visible": true,
                    "displayName": "# RxSignal Active ADE",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? row.getProperty(col.field) : '-'}}</div>"
                },
                {
                    "field": "metrics.metric_reduced_pscount",
                    "cellClass": "centerCellText",
                    "width": "*",
                    "visible": true,
                    "displayName": "RxSignal ADE Primary Suspect Cases",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                }
            ]
        },
        'portfolio.detail.news.grid': {
            "portfolioNews": [
                {
                    "field": "event_dt",
                    "width": "133px",
                    "visible": true,
                    "pinned": true,
                    "displayName": "Date",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) | date:'MMMM d, y' }}</div>"
                },
                {
                    "field": "product_drugname",
                    "width": "141px",
                    "visible": true,
                    "displayName": "Product",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='drugs.detail.overview({id: row.getProperty(\"aedrug_id\")})'>{{row.getProperty(col.field) | titleCase}}</a></div>"
                },
                {
                    "field": "metric_pctg_company_userPortfolio_exposed",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number'",
                    "width": "100px",
                    "visible": true,
                    "displayName": "Portfolio Co. Exposed"
                },
                {
                    "field": "alert_type",
                    "width": "522px",
                    "visible": true,
                    "displayName": "Headline",
                    "cellTemplate": "<div class='ngCellText'><a target='_blank' href='{{row.getProperty(\"alert_url\")}}'>{{ row.getProperty(col.field) }}</a></div>"
                },
                {
                    "field": "event_type",
                    "width": "*",
                    "visible": true,
                    "displayName": "Event Type",
                    "cellTemplate": "<div class='ngCellText'>{{ row.getProperty(col.field) }}</div>"
                },
                {
                    "field": "attr_product_company_nameList",
                    "cellClass": "centerCellText",
                    "width": "150px",
                    "visible": false,
                    "displayName": "Company Names"
                }
            ]
        },
        'portfolio.detail.overview.company.grid': {
            "portfolioCompanyOverview": [
                {
                    "field": "company_name",
                    "pinned": true,
                    "width": "220px",
                    "visible": true,
                    "displayName": "Company Name",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='company.detail.overview({id: row.getProperty(\"company_id\")})'>{{row.getProperty(col.field) | titleCase}}</a></p></div>"
                },
                {
                    "field": "metric_fact_aggregate_rxscore",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "width": "162px",
                    "visible": true,
                    "displayName": "Aggregate RxScore (2014)",
                    "cellTemplate": "<div ng-class='{\"ngCellText\" : formatMinMax(col.field, row.getProperty(col.field)) == \"ngCellText\",\"green\" : formatMinMax(col.field, row.getProperty(col.field)) == \"green\",\"red\" : formatMinMax(col.field, row.getProperty(col.field)) == \"red\"}'><p>{{row.getProperty(col.field) | emptyCellFilter:'number':2}}</p></div>"
                },
                {
                    "field": "metric_string_pctg_aggregate_rxscore_rank",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'pctgFilter':2",
                    "pinned": false,
                    "width": "83px",
                    "visible": true,
                    "displayName": "% Rank (Aggregate RxScore)"
                },
                {
                    "field": "metric_mean_rxscore",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "width": "140px",
                    "visible": true,
                    "displayName": "Average RxScore",
                    "cellTemplate": "<div ng-class='{\"ngCellText\" : formatMinMax(col.field, row.getProperty(col.field)) == \"ngCellText\",\"green\" : formatMinMax(col.field, row.getProperty(col.field)) == \"green\",\"red\" : formatMinMax(col.field, row.getProperty(col.field)) == \"red\"}'><p>{{row.getProperty(col.field) | emptyCellFilter:'number':2}}</p></div>"
                },
                {
                    "field": "metric_pctg_mean_rxscore_rank",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "width": "199px",
                    "visible": true,
                    "displayName": "% Rank (Average RxScore)"
                },
                {
                    "field": "metric_fact_mean_rxscore_rank_byIndication",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "width": "165px",
                    "visible": true,
                    "displayName": "Avg. RxScore Rank in Indication"
                },
                {
                    "field": "metric_sum_product_revenue",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'currency':$:2",
                    "pinned": false,
                    "width": "135px",
                    "visible": true,
                    "displayName": "Product Revenues"
                },
                {
                    "field": "metric_sum_rxsignal_active",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "pinned": false,
                    "width": "140px",
                    "visible": false,
                    "displayName": "Active RxSignals"
                },
                {
                    "field": "metric_mean_rxsignal_active",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "pinned": false,
                    "width": "200px",
                    "visible": false,
                    "displayName": "Active RxSignals Per Drug"
                },
                {
                    "field": "metric_sum_rxsignal_activeDme",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "pinned": false,
                    "width": "129px",
                    "visible": false,
                    "displayName": "DME Signals"
                },
                {
                    "field": "metric_mean_rxsignal_activeDme",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':2",
                    "pinned": false,
                    "width": "177px",
                    "visible": false,
                    "displayName": "DME Signals Per Drug"
                },
                {
                    "field": "metric_sum_product_application",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number'",
                    "pinned": false,
                    "width": "140px",
                    "visible": false,
                    "displayName": "Approved Drugs"
                }
            ]
        },
        'portfolio.detail.overview.drug-detail.grid': {
            "portfolioDrugOverview": [
                {
                    "field": "product_name",
                    "pinned": true,
                    "width": "244px",
                    "visible": true,
                    "displayName": "Product Name",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='drugs.detail.overview({id: row.getProperty(\"aedrug_id\")})'>{{row.getProperty(col.field) | titleCase}}</a></p></div>"

                },
                {
                    "field": "subsidiary_company",
                    "pinned": false,
                    "width": "178px",
                    "visible": true,
                    "displayName": "Lead Company"
                },
                {
                    "field": "appl_exclusivity",
                    "pinned": false,
                    "width": "86px",
                    "visible": true,
                    "displayName": "Branded/Generic"
                },
                {
                    "field": "evaluate_productRevenue2014",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'currency':$:2",
                    "pinned": false,
                    "width": "112px",
                    "visible": true,
                    "displayName": "2014 Revenue"
                },
                {
                    "field": "metric_pscount",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "pinned": false,
                    "visible": true,
                    "width": "137px",
                    "displayName": "Primary Suspect Cases"
                },
                {
                    "field": "metric_rxscore",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "visible": true,
                    "width": "80px",
                    "cellFilter": "naFilter",
                    "displayName": "RxScore",
                    "cellTemplate": "<div ng-class='{\"green\" : formatRxscore(row.getProperty(col.field)) == \"green\",\"grey\" : formatRxscore(row.getProperty(col.field)) == \"grey\",\"yellow\" : formatRxscore(row.getProperty(col.field)) == \"yellow\",\"orange\" : formatRxscore(row.getProperty(col.field)) == \"#CD7D0F\",\"red\" : formatRxscore(row.getProperty(col.field)) == \"red\",\"grey\" : formatRxscore(row.getProperty(col.field)) == \"grey\"}'><p>{{ row.getProperty(col.field) || \"N\/A\" }}</p></div>"
                },
                {
                    "field": "class_indication",
                    "pinned": false,
                    "visible": true,
                    "width": "*",
                    "displayName": "Primary Indication"
                },
                {
                    "field": "product_genericName",
                    "cellFilter": "capitalizeFilter",
                    "pinned": false,
                    "width": "140",
                    "visible": false,
                    "displayName": "Generic Name"
                },
                {
                    "field": "partner_companies",
                    "pinned": false,
                    "width": "140",
                    "visible": false,
                    "displayName": "Partner Companies"
                },
                {
                    "field": "subsidiary_company",
                    "pinned": false,
                    "width": "156px",
                    "visible": false,
                    "displayName": "Subsidiary"
                },
                {
                    "field": "subisidary_fda_name",
                    "pinned": false,
                    "width": "211px",
                    "visible": false,
                    "displayName": "FDA Applicant"
                },
                {
                    "field": "evaluate_productRevenue2013",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'currency':$:2",
                    "pinned": false,
                    "width": "119px",
                    "visible": false,
                    "displayName": "2013 Revenue"
                },
                {
                    "field": "metric_revenue_growth",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'pctgFilter':2",
                    "pinned": false,
                    "width": "137px",
                    "visible": false,
                    "displayName": "Revenue Growth"
                },
                {
                    "field": "class_drugclass",
                    "pinned": false,
                    "width": "252px",
                    "visible": false,
                    "displayName": "Drug Class"
                },
                {
                    "field": "dt_max_data",
                    "cellClass": "centerCellText",
                    "width": "113px",
                    "pinned": false,
                    "visible": false,
                    "displayName": "Data Updated"
                },
                {
                    "field": "dt_approval",
                    "width": "119px",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "visible": false,
                    "displayName": "Date Approved"
                }
            ]
        },
        'portfolio.detail.overview.drug-overview.grid': {
            "portfolioDrugOverview": [
                {
                    "field": "product_name",
                    "pinned": true,
                    "width": "169px",
                    "visible": true,
                    "displayName": "Product Name",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='drugs.detail.overview({id: row.getProperty(\"aedrug_id\")})'>{{row.getProperty(col.field) | titleCase}}</a></p></div>"

                },
                {
                    "field": "attr_product_fact_brandGeneric",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "width": "140",
                    "visible": true,
                    "displayName": "Branded/Generic"
                },
                {
                    "field": "metric_sum_company_userPortfolio_exposed",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'pctgFilter':0",
                    "pinned": false,
                    "width": "178px",
                    "visible": true,
                    "displayName": "Portfolio Co. Exposed"
                },
                {
                    "field": "metric_sum_company_exposed",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'pctgFilter':0",
                    "pinned": false,
                    "width": "178px",
                    "visible": true,
                    "displayName": "Total Co. Exposed"
                },
                {
                    "field": "metric_pctg_company_userPortfolio_exposed",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'pctgFilter':0",
                    "pinned": false,
                    "width": "161px",
                    "visible": true,
                    "displayName": "Percentage Exposure"
                },
                {
                    "field": "metric_fact_product_rxscore",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "width": "140",
                    "visible": true,
                    "displayName": "RxScore",
                    "cellTemplate": "<div ng-class='{\"ngCellText\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"ngCellText\",\"green\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"green\",\"red\" : formatIncidenceRate(col.field, row.getProperty(col.field)) == \"red\"}'><p>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:2) : '-'}}</p></div>"
                },
                {
                    "field": "metric_sum_company_userPortfolio_revenue2014",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'currency':$:2",
                    "pinned": false,
                    "visible": true,
                    "displayName": "2014 Revenue Total - Companies"
                },
                {
                    "field": "attr_product_aedrugGeneric_name",
                    "cellClass": "centerCellText",
                    "cellFilter": "capitalizeFilter",
                    "pinned": false,
                    "width": "170",
                    "visible": false,
                    "displayName": "Generic Name"
                },
                {
                    "field": "attr_product_company_nameList",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "width": "170",
                    "visible": false,
                    "displayName": "Company Names"
                },
                {
                    "field": "metric_sum_company_userPortfolio_revenue2013",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'currency':$:2",
                    "pinned": false,
                    "visible": false,
                    "displayName": "2013 Revenue Total - Companies"
                },
                {
                    "field": "metric_pctg_company_revenueGrowth",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'pctgFilter':0",
                    "pinned": false,
                    "width": "70",
                    "visible": false,
                    "displayName": "Revenue Growth"
                },
                {
                    "field": "metric_sum_product_pscases",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "pinned": false,
                    "width": "70",
                    "visible": false,
                    "displayName": "Primary Suspect Cases"
                },
                {
                    "field": "attr_product_druggroup_indication",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "width": "170",
                    "visible": false,
                    "displayName": "Primary Indication"
                },
                {
                    "field": "attr_product_druggroup_drugclass_primary",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "width": "170",
                    "visible": false,
                    "displayName": "Drug Class"
                },
                {
                    "field": "dt_max_data",
                    "width": "100px",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "visible": false,
                    "displayName": "Date Updated"
                },
                {
                    "field": "attr_product_fact_approval_date",
                    "width": "100px",
                    "cellClass": "centerCellText",
                    "pinned": false,
                    "visible": false,
                    "displayName": "Date Approved"
                }
            ]
        },
        'portfolio.detail.reporting.grid': {
            "portfolioReporting": [
                {
                    "field": "A",
                    "width": "166px",
                    "visible": true,
                    "pinned": true,
                    "displayName": "Product",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='drugs.detail.overview({id: row.getProperty(\"B\")})'>{{row.getProperty(col.field) | titleCase}}</a></div>"
                },
                {
                    "field": "dt_approval",
                    "cellClass": "centerCellText",
                    "width": "86px",
                    "visible": true,
                    "displayName": "Approval",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) | date:'MM/dd/yyyy' }}</div>"
                },
                {
                    "field": "evaluate_productRevenue2013",
                    "cellClass": "centerCellText",
                    "width": "111px",
                    "visible": true,
                    "displayName": "2013 Revenue",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | currency) : '-'}}</div>"
                },
                {
                    "field": "dt_max_data",
                    "cellClass": "centerCellText",
                    "width": "96px",
                    "visible": true,
                    "displayName": "Last Update",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) | date:'MM/dd/yyyy' }}</div>"
                },
                {
                    "field": "x2q1",
                    "cellClass": "centerCellText",
                    "width": "70px",
                    "visible": true,
                    "displayName": "Q1 2014",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                },
                {
                    "field": "x1q4",
                    "cellClass": "centerCellText",
                    "width": "70px",
                    "visible": true,
                    "displayName": "Q4 2013",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                },
                {
                    "field": "x1q3",
                    "cellClass": "centerCellText",
                    "width": "70px",
                    "visible": true,
                    "displayName": "Q3 2013",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                },
                {
                    "field": "x1q2",
                    "cellClass": "centerCellText",
                    "width": "70px",
                    "visible": true,
                    "displayName": "Q2 2013",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                },
                {
                    "field": "x1q1",
                    "cellClass": "centerCellText",
                    "width": "70px",
                    "visible": true,
                    "displayName": "Q1 2013",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                },
                {
                    "field": "x0q4",
                    "cellClass": "centerCellText",
                    "width": "70px",
                    "visible": true,
                    "displayName": "Q4 2012",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                },
                {
                    "field": "x0q3",
                    "cellClass": "centerCellText",
                    "width": "70px",
                    "visible": true,
                    "displayName": "Q3 2012",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                },
                {
                    "field": "x0q2",
                    "cellClass": "centerCellText",
                    "width": "70px",
                    "visible": true,
                    "displayName": "Q2 2012",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                },
                {
                    "field": "x0q1",
                    "cellClass": "centerCellText",
                    "width": "70px",
                    "visible": true,
                    "displayName": "Q1 2012",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                }
            ]
        },
        'portfolio.detail.rxscore.grid': {
            "portfolioRxScore": [
                {
                    "field": "product_drugname",
                    "width": "233px",
                    "visible": true,
                    "pinned": true,
                    "displayName": "Product Name(s)",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='drugs.detail.overview({id: row.getProperty(\"aedrug_id\")})'>{{row.getProperty(col.field) | titleCase}}</a></div>"
                },
                {
                    "field": "dt_approval",
                    "cellClass": "centerCellText",
                    "width": "117px",
                    "visible": true,
                    "displayName": "Approval Date",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) | date:'MM/dd/yyyy' }}</div>"
                },
                {
                    "field": "metric_rxscore",
                    "cellClass": "centerCellText",
                    "width": "79px",
                    "visible": true,
                    "displayName": "RxScore",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? row.getProperty(col.field) : '-'}}</div>"
                },
                {
                    "field": "class_drugclass_label",
                    "width": "188px",
                    "visible": true,
                    "displayName": "Drug Class",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field)}}</div>"
                },
                {
                    "field": "metric_drugclass_rank",
                    "cellClass": "centerCellText",
                    "width": "149px",
                    "visible": true,
                    "displayName": "Rank in Drug Class",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                },
                {
                    "field": "class_indication",
                    "width": "186px",
                    "visible": true,
                    "displayName": "Primary Indication",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field)}}</div>"
                },
                {
                    "field": "metric_indication_rank",
                    "cellClass": "centerCellText",
                    "width": "*",
                    "visible": true,
                    "displayName": "Rank in Indication",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field) > 0 ? (row.getProperty(col.field) | number:0) : '-'}}</div>"
                }
            ]
        },
        'portfolio.detail.rxsignal-detail.grid': {
            "portfolioRxSignal": [
                {
                    "field": "product_drugname",
                    "width": "200px",
                    "visible": true,
                    "pinned": true,
                    "displayName": "Product Name",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='drugs.detail.rxsignal({id: row.getProperty(\"aedrug_id\")})'>{{row.getProperty(col.field) | titleCase}}</a></div>"
                },
                {
                    "field": "metric_sum_company_userPortfolio_exposed",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number'",
                    "width": "100px",
                    "visible": true,
                    "displayName": "Portfolio Co. Exposed"
                },
                {
                    "field": "metric_sum_company_exposed",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number'",
                    "width": "100px",
                    "visible": true,
                    "displayName": "Total Co. Exposed"
                },
                {
                    "field": "metric_pctg_company_userPortfolio_exposed",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'pctgFilter':2",
                    "width": "100px",
                    "visible": true,
                    "displayName": "Percentage Exposure"
                },
                {
                    "field": "reac",
                    "width": "206px",
                    "visible": true,
                    "displayName": "Adverse Event",
                    "cellTemplate": "<div class='ngCellText'><p>{{row.getProperty(col.field)}} <span popover-append-to-body='true' popover='Designated Medical Event' popover-trigger='mouseenter' class=\"badge dmeBadge btn-danger active\" ng-show='row.getProperty(\"DME\") == \"DME\"'>DME</span></p></div>"
                },
                {
                    "field": "RxSignal",
                    "cellClass": "centerCellText",
                    "width": "102px",
                    "visible": true,
                    "displayName": "RxSignal",
                    "cellTemplate": "<div class='ngCellText' ng-class='{\"green\" : row.getProperty(\"RxSignal\") == \"Not Active\",\"red\" : row.getProperty(\"RxSignal\") == \"Active\",\"yellow\" : row.getProperty(\"RxSignal\") == \"Watchlist\" }'><p>{{ row.getProperty(col.field) }}</p></div>"
                },
                {
                    "field": "IME",
                    "cellClass": "centerCellText",
                    "width": "152px",
                    "visible": false,
                    "displayName": "IME Serious",
                    "cellTemplate": "<div class='ngCellText' ng-class='{\"green\" : row.getProperty(\"IME\") == \"Not Serious\",\"red\" : row.getProperty(\"IME\") == \"Serious\" }'><p>{{ row.getProperty(col.field) }}</p></div>"
                },
                {
                    "field": "DME",
                    "cellClass": "centerCellText",
                    "width": "184px",
                    "visible": false,
                    "displayName": "DME",
                    "cellTemplate": "<div class= 'ngCellText' ng-class='{\"green\" : row.getProperty(\"DME\") == \"Not DME\",\"red\" : row.getProperty(\"DME\") == \"DME\" }'><p>{{ row.getProperty(col.field) }}</p></div>"
                },
                {
                    "field": "Disease_Related",
                    "cellClass": "centerCellText",
                    "width": "114px",
                    "visible": false,
                    "displayName": "Disease Related",
                    "cellTemplate": "<div title='Disease Related' class='ngCellText' ng-class='{\"red\" : row.getProperty(\"Disease_Related\") == \"No\",\"green\" : row.getProperty(\"Disease_Related\") == \"Yes\" }'><p>{{ row.getProperty(col.field) }}</p></div>"
                },
                {
                    "field": "On_Off",
                    "cellClass": "centerCellText",
                    "width": "114px",
                    "visible": false,
                    "displayName": "On Label",
                    "cellTemplate": "<div class='ngCellText' ng-class='{\"green\" : row.getProperty(\"On_Off\") == \"Labeled\",\"red\" : row.getProperty(\"On_Off\") == \"Not Labeled\" }'><p>{{ row.getProperty(col.field) }}</p></div>"
                },
                {
                    "field": "Section",
                    "cellClass": "centerCellText",
                    "width": "114px",
                    "visible": false,
                    "displayName": "Label Section",
                    "cellTemplate": "<div class='ngCellText'>{{row.getProperty(col.field)}}</div>"
                },
                {
                    "field": "ROR",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':2",
                    "width": "75px",
                    "visible": true,
                    "displayName": "ROR"
                },
                {
                    "field": "PRR",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':2",
                    "width": "100px",
                    "visible": false,
                    "displayName": "PRR"
                },
                {
                    "field": "PS",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "width": "120px",
                    "visible": true,
                    "displayName": "Primary Suspect Cases"
                },
                {
                    "field": "PS_PCT",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter",
                    "width": "100px",
                    "visible": false,
                    "displayName": "Primary Suspect Percentage"
                },
                {
                    "field": "Total",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "width": "100px",
                    "visible": false,
                    "displayName": "Total Cases"
                },
                {
                    "field": "Total_PCT",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter",
                    "width": "100px",
                    "visible": false,
                    "displayName": "Total PCT"
                },
                {
                    "field": "metric_cumulativeIncidence",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'incidenceFilter'",
                    "width": "86px",
                    "visible": true,
                    "displayName": "Incidence"
                }
            ]
        },
        'portfolio.detail.rxsignal-summary.grid': {
            "portfolioRxSignalSummary": [
                {
                    "field": "product_drugnames",
                    "width": "181px",
                    "visible": true,
                    "pinned": true,
                    "displayName": "Product Name(s)",
                    "cellTemplate": "<div class='ngCellText'><a ui-sref='drugs.detail.rxsignal({id: row.getProperty(\"aedrug_id\")})'>{{row.getProperty(col.field) | titleCase}}</a></div>"
                },
                {
                    "field": "metric_sum_company_userPortfolio_exposed",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number'",
                    "width": "100px",
                    "visible": true,
                    "displayName": "Portfolio Co. Exposed"
                },
                {
                    "field": "metric_sum_company_exposed",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number'",
                    "width": "105px",
                    "visible": true,
                    "displayName": "Total Co. Exposed"
                },
                {
                    "field": "metric_pctg_company_userPortfolio_exposed",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'pctgFilter':2",
                    "width": "100px",
                    "visible": true,
                    "displayName": "Percentage Exposure"
                },
                {
                    "field": "evaluate_productRevenue2014",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'currency':$:2",
                    "width": "112px",
                    "visible": true,
                    "displayName": "2014 Revenue"
                },
                {
                    "field": "metric_rxsignal_active",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "width": "124px",
                    "visible": true,
                    "displayName": "Active RxSignal"
                },
                {
                    "field": "metric_rxsignal_watchlist",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "width": "145px",
                    "visible": true,
                    "displayName": "Watchlist RxSignal"
                },
                {
                    "field": "metric_reac",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "width": "172px",
                    "visible": true,
                    "displayName": "Total (Active/Watchlist)"
                },
                {
                    "field": "metric_rxsignal_dme",
                    "cellClass": "centerCellText",
                    "cellFilter": "emptyCellFilter:'number':0",
                    "width": "*",
                    "visible": true,
                    "displayName": "DME"
                },
                {
                    "field": "company_names",
                    "cellClass": "centerCellText",
                    "width": "150px",
                    "visible": false,
                    "displayName": "Company Names"
                }
            ]
        }
    });
})();
