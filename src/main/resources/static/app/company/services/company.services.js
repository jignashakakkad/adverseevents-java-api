angular.module('company.services', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'restangular', 'LocalStorageModule','aex.constants']);
angular.module('company.services').config(function ($stateProvider, RestangularProvider, SERVER_SETTINGS, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('aex');
    RestangularProvider.setBaseUrl(SERVER_SETTINGS.BASE_URL);
});

angular.module('company.services')

    .factory('companySummaryService', ['$log', function ($log) {
        var exports = {};

        exports.getSummary = function (Revenues, RxscoreData, Overview, RxsignalSummaryData) {
            var Summary = {"Class": {}, "Indication": {}, "Drug": {}, "Metrics": {}};

            if (Revenues.length) {
                if (RxscoreData[0]) {
                    Summary.Class = {
                        'metric_top_rxscore': {

                            "label": RxscoreData[0].class_drugclass_label,
                            "id": RxscoreData[0].class_drugclass
                        },
                        'metric_top_sales': {
                            "label": Revenues[0].class_drugclass,
                            "id": Revenues[0].class_drugclass
                        },

                        'metric_avg_rank': {
                            "label": d3.round(d3.mean(_.map(_.pluck(RxscoreData, 'metric_drugclass_rank'), function (d) {
                                return Math.abs(d);
                            }))) + ' of ' + d3.round(d3.mean(_.map(_.pluck(RxscoreData, 'metric_drugclass_rank_size'), function (d) {
                                return Math.abs(d);
                            })))
                        }
                    };

                    Summary.Indication = {
                        'metric_top_rxscore': {
                            "label": RxscoreData[0].class_indication.length ? RxscoreData[0].class_indication : 'N/A',
                            "id": RxscoreData[0].class_indication.length ? RxscoreData[0].class_indication : 'N/A'
                        },
                        'metric_top_sales': {
                            "label": (Revenues[0].class_indication !== null && Revenues[0].class_indication.length) ? Revenues[0].class_indication : 'N/A',
                            "id": (Revenues[0].class_indication !== null && Revenues[0].class_indication.length) ? Revenues[0].class_indication : 'N/A'
                        },
                        'metric_avg_rank': {
                            "label": d3.round(d3.mean(_.map(_.pluck(RxscoreData, 'metric_indication_rank'), function (d) {
                                return Math.abs(d);
                            }))) + ' of ' + d3.round(d3.mean(_.map(_.pluck(RxscoreData, 'metric_indication_rank_size'), function (d) {
                                return Math.abs(d);
                            })))
                        }
                    };


                    Summary.Drug = {
                        'metric_top_rxscore': {
                            "label": RxscoreData[0].product_drugname,
                            "id": RxscoreData[0].aedrug_id
                        },
                        'metric_top_sales': {
                            "label": Revenues[0].product_name,
                            "id": Revenues[0]
                        },
                        'metric_total_pscount': {
                            "label": d3.round(d3.sum(_.map(_.pluck(Revenues, 'metric_pscount'), function (d) {
                                return Math.abs(d);
                            })))
                        },
                        "metric_total_rxsignal": {
                            "label": d3.round(d3.sum(_.map(_.pluck(RxsignalSummaryData, 'metric_rxsignal_active'), function (d) {
                                return Math.abs(d);
                            })))
                        }
                    };

                    var fn_avgFromCollection = function (collection, prop) {
                        var d = d3.round(d3.mean(_.map(_.pluck(collection, prop), function (d) {
                            return Math.abs(d);
                        })), 2);
                        return d;
                    };
                    if (Overview.length) {
                        var RxScore2012 = _.findWhere(Overview, {metric_dimensionKey: 2012}) ? _.findWhere(Overview, {metric_dimensionKey: 2012}) : {"weighted_rxscore": "N/A"};
                        var RxScore2013 = _.findWhere(Overview, {metric_dimensionKey: 2013}) ? _.findWhere(Overview, {metric_dimensionKey: 2013}) : {"weighted_rxscore": "N/A"};


                        var RxScoreAvg = fn_avgFromCollection(RxscoreData, 'metric_rxscore') ? {"avg_rxscore": fn_avgFromCollection(RxscoreData, 'metric_rxscore')} : {"avg_rxscore": "N/A" };
                        Summary.Metrics = {
                            "metric_rxscore_2012": {
                                "label": RxScore2012.weighted_rxscore,
                                "id": RxScore2012.weighted_rxscore
                            },
                            "metric_rxscore_2013": {
                                "label": RxScore2013.weighted_rxscore,
                                "id": RxScore2013.weighted_rxscore
                            },
                            "metric_average_rxscore": {
                                label: RxScoreAvg.avg_rxscore
                            }

                        };
                    } else {
                        Summary.Metrics = {
                            "metric_rxscore_2012": {
                                "label": "N/A",
                                "id": "N/A"
                            },
                            "metric_rxscore_2013": {
                                "label": "N/A",
                                "id": "N/A"
                            },
                            "metric_average_rxscore": {
                                "label": "N/A"
                            }
                        };
                        Summary.Metrics.metric_average_rxscore = fn_avgFromCollection(RxscoreData, 'metric_rxscore') ? {"label": fn_avgFromCollection(RxscoreData, 'metric_rxscore')} : {"label": "N/A" };
                        Summary.Drug.metric_top_sales.label = "N/A";
                        Summary.Indication.metric_top_sales.label = "N/A";
                        Summary.Class.metric_top_sales.label = "N/A";
                    }
                }
            }
            return Summary;
        };
        return exports;
    }])

    .factory('companyChartService', function () {
        var exports = {};
        var fn = {};
        fn.pointSize = function (sizeVal, sizes) {
            var Incidence = sizeVal;
            var MIN_incidence = d3.min(sizes);
            var MAX_incidence = d3.max(sizes);
            var qtl3 = d3.mean(sizes);
            var s = (((Incidence - MIN_incidence) * (50 - 10)) / (MAX_incidence - MIN_incidence));


            return (s - Math.floor(qtl3) > 3) ? s - Math.floor(qtl3) : 3;
        };

        fn.bubbleSizes = function (sizes) {
            var len = sizes.length;
            var sizesArray = _.map(_.pluck(sizes, 'metric_rxsignal_active'), function (d) {
                return Math.abs(d);
            });
            var reacsArray = _.pluck(sizes, 'product_drugnames');

            var newSizes = [];
            sizes.forEach(function (size) {
                if (size.hasOwnProperty('product_drugnames')) {

                    var newSize = fn.pointSize(Math.abs(size['metric_rxsignal_ime']), sizesArray);
                    newSizes.push({'product_drugnames': size.product_drugnames, 'size': newSize});
                }
            });


            return newSizes;
        };

        exports.getRxsignalSummaryChart = function (RxsignalSummary) {
            var colorbrewer = { YlOrRd: {3: ["#ffeda0", "#feb24c", "#f03b20"], 4: ["#ffffb2", "#fecc5c", "#fd8d3c", "#e31a1c"], 5: ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"], 6: ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026"], 7: ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"], 8: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"], 9: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"]}};

            var data = RxsignalSummary;

            var colors = ['#b2182b',
                '#d6604d',
                '#f4a582',
                '#fddbc7',
                '#f7f7f7',
                '#d1e5f0',
                '#92c5de',
                '#4393c3',
                '#4392c3',
                '#2166ac'];
            var columns = [];
            var mySize = {};

            var myXs = {};
            var myNames = [];
            var myPointColors = {};


            var myNameIndex = [];
            var myPointSizes = [];
            var i = 0;
            var myColors = colorbrewer.YlOrRd['9'].reverse();
            var myPts = fn.bubbleSizes(data);
            data.forEach(function (d) {
                var name = d.product_drugnames;
                var myRor = [d.product_drugnames];
                var myPs = [d.product_drugnames + "_Primary Suspect"];


                myRor.push(d.ROR);
                myPs.push(d.metric_rxsignal_active);
                myNames.push(d.product_drugnames);
                myNameIndex[i] = d.product_drugnames;
                myPointColors[d.product_drugnames] = myColors[i];

                columns.push(myRor);
                columns.push(myPs);
                myXs[myRor[0]] = myPs[0];
                mySize[d.product_drugnames] = d.metric_rxsignal_active;
                myNameIndex[d.product_drugnames] = d.metric_rxsignal_active;
                myPointSizes.push = {'product_drugnames': d.product_drugnames, 'size': d.metric_rxsignal_active};

                i++;
            });


            var chart = {
                bindto: '#company-rxsignal-bubblechart',
                size: {
                    height: 200
                },
                data: {
                    xs: myXs,
                    // iris data from R
                    columns: columns,
                    type: 'scatter',
                    colors: myPointColors
                },
                axis: {
                    x: {
                        label: 'Active RxSignal ADEs',
                        tick: {
                            fit: false
                        },
                        padding: {top: 200, left: 15, right: 5, bottom: 0}
                    },
                    y: {
                        label: 'ROR',
                        tick: {
                            fit: false
                        },
                        padding: {top: 3, left: 5, right: 100, bottom: 10}
                    }
                },
                point: {
                    r: function (d) {
                        var pointSize = _.where(myPts, {product_drugnames: d.id})[0];
                        return pointSize.size;

                    },
                    focus: {
                        expand: {
                            enabled: false,
                            r: function (d) {
                                return d.r;
                            }
                        }

                    }
                },
                tooltip: {

                    format: {
                        title: function (d) {

                            return false;

                        },
                        name: function (name) {
                            return name;
                        },
                        value: function (value, ratio, id, size, x) {


                            var numFormat = d3.format(',');
                            var decFormat = d3.format('.');
                            var pctgFormat = d3.format('.4p');

                            return '<tr colspan="2"><td>Active Signals</td><td>' + numFormat(myNameIndex[id]) + '</td></tr>' + '<tr><td>Avg. ROR (Active)</td><td>' + numFormat(value) + '</td></tr>';

                        }

                    }
                }
            };

            return chart;

        };


        exports.formatRxscore = function (score) {
            var colors = ['green', 'yellow', '#CD7D0F', 'red'];
            var thresholds = [47.17, 55.81, 61.83, 82.83];
            var s = Math.abs(score);
            if (s >= thresholds[2]) {
                return colors[3];
            } else if (s >= thresholds[1]) {
                return colors[2];
            } else if (s >= thresholds[0]) {
                return colors[1];
            } else if (s >= 1) {
                return colors[0];
            } else {
                return 'grey';
            }

        };
        exports.getOverviewChart = function (RevenueSlices) {
            var companyName;

            var Series = [
                {name: 'Revenue ($MM USD)', data: [], type: 'column'}
            ];
            var cCategories = [];
            var colors = ['green', 'yellow', '#CD7D0F', 'red'];
            var thresholds = [47.17, 55.81, 61.83, 82.83];
            var cleanSlices = _.reject(RevenueSlices, function (sl) {
                return sl.BrandName === "Unknown";

            });

            cleanSlices = _.filter(cleanSlices, function (cs) {
                return Math.abs(cs.evaluate_productRevenue2014) > 0;
            });

            angular.forEach(cleanSlices, function (o) {
                var s = Math.abs(o.metric_rxscore);
                var color;
                if (s >= thresholds[2]) {
                    color = colors[3];
                } else if (s >= thresholds[1]) {
                    color = colors[2];
                } else if (s >= thresholds[0]) {
                    color = colors[1];
                } else if (s >= 1) {
                    color = colors[0];
                } else {
                    color = 'lightgrey';
                }
                companyName = o.parent;
                cCategories.push(o.BrandName);
                Series[0].data.push({name: o.BrandName, color: color, y: Math.abs(o.evaluate_productRevenue2014.toFixed(2))});
            });
           var overviewChart = {
                options: {
                    chart: {
                        type: 'StockChart'
                    }, legend: {
                        enabled: false
                    },


                    exporting: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            stacking: ''
                        }
                    }
                },
                size: {

                    height: 380
                },
                xAxis: {
                    title: {
                        text: 'Drug'
                    },
                    categories: cCategories
                },
                yAxis: {
                    title: {
                        text: '2014 Revenue'
                    },
                    labels: {
                        format: '{value} $MM USD'
                    }


                }, credits: {
                    enabled: false
                },
                series: Series,
                title: {
                    style: { 'display': 'none' }
                }

            };


            return  overviewChart;

        };

        exports.getCompanyChart = function (CompanyData) {
            var companyName;
            var Series = [
                {name: 'Product Revenue $MM USD', data: [], type: 'column'}
            ];
            var companies = [];
            var colors = ['green', 'yellow', '#CD7D0F', 'red'];
            var thresholds = [47.17, 55.81, 61.83, 82.83];
            var cleanSlices = _.reject(CompanyData, function (sl) {
                return sl.companyName === "Unknown";

            });
            cleanSlices = _.filter(cleanSlices, function (cs) {
                return Math.abs(cs.metric_sum_product_revenue) > 0;
            });

            // sort companies with product revenues > 0 highest to lowest by revenues, take only top 8
            cleanSlices = (_.sortBy(cleanSlices, 'metric_sum_product_revenue')).reverse().slice(0,8);

            angular.forEach(cleanSlices, function (o) {
                var s = Math.abs(o.metric_fact_aggregate_rxscore);
                var color;
                if (s >= thresholds[2]) {
                    color = colors[3];
                } else if (s >= thresholds[1]) {
                    color = colors[2];
                } else if (s >= thresholds[0]) {
                    color = colors[1];
                } else if (s >= 1) {
                    color = colors[0];
                } else {
                    color = 'lightgrey';
                }

                companyName = o.company_name;
                companies.push(companyName);
                Series[0].data.push({name: companyName, color: color, y: Math.abs(o.metric_sum_product_revenue.toFixed(2))});
            });
           var overviewChart = {
                options: {
                    chart: {
                        type: 'StockChart'
                    }, legend: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            stacking: ''
                        }
                    }
                },
                size: {

                    height: 380
                },
                xAxis: {
                    title: {
                        text: 'Company'
                    },
                    categories: companies
                },
                yAxis: {
                    title: {
                        text: 'Total Product Revenue'
                    },
                    labels: {
                        format: '{value} $MM USD'
                    }
                }, credits: {
                    enabled: false
                },
                series: Series,
                title: {
                    style: { 'display': 'none' }
                }

            };


            return  overviewChart;

        };

        return exports;
    })

    .factory('tooltipService', function () {

        var exports = {};
        exports.getTooltip = function (displayName) {

            if (displayName === 'Primary Suspect Reports') {
                return "Primary Suspect Reports ...";
            } else if (displayName === 'Weighted Rxscore') {
                return "Weighted Rxscore is the ...";
            } else if (displayName === 'Product Name(s)') {
                return "Product Name(s) placeholder text...";
            } else if (displayName === '2013 Revenue') {
                return "2013 Revenue";
            } else if (displayName === 'Primary Suspect Cases') {
                return 'Explanatory Tip Text for Primary Suspect Cases';
            } else if (displayName === 'Generic') {
                return "Generic popover placeholder text...";
            } else if (displayName === 'Generic Competition') {
                return "Generic Competition";
            } else if (displayName === 'AE Parent Company') {
                return "AE Parent Company placeholder";
            } else if (displayName === 'Branded/Generic') {
                return 'Explanatory Tip Text for Branded/Generic';
            } else if (displayName === 'Generic') {
                return "Generic popover placeholder text...";
            } else if (displayName === 'Primary Indication') {
                return "Primary Indication means...";
            } else if (displayName === 'RxScore') {
                return 'Explanatory Tip Text for RxScore';
            } else if (displayName === 'RxSignal') {
                return 'AEI’s proprietary signaling system which predicts future drug label changes.  “Active” means the signal is active and the adverse event shown will likely be added to the drug’s label in the future.';
            } else if (displayName === 'IME') {
                return 'Serious according to the IME (Important Medical Event) list created by the EudraVigilance Expert Working Group (EV-EWG).';
            } else if (displayName === 'Adverse Event') {
                return "MedDRA Adverse Event";
            } else if (displayName === 'Branded/Generic') {
                return 'Explanatory Tip Text for Branded/Generic';
            } else if (displayName === 'Generic') {
                return "Generic popover placeholder text...";
            } else if (displayName === 'Generic Competition') {
                return "Generic Competition";
            } else if (displayName === 'AE Parent Company') {
                return "AE Parent Company placeholder";
            } else if (displayName === 'Branded/Generic') {
                return 'Explanatory Tip Text for Branded/Generic';
            } else if (displayName === 'Generic') {
                return "Generic popover placeholder text...";
            } else if (displayName === 'Adverse Event') {
                return "MedDRA Adverse Event";
            } else if (displayName === 'Adverse Event') {
                return 'Explanatory Tip Text for Suspect Cases Here';
            } else if (displayName === 'RxSignal') {
                return 'AEI’s proprietary signaling system which predicts future drug label changes.  “Active” means the signal is active and the adverse event shown will likely be added to the drug’s label in the future.';
            } else if (displayName === 'IME') {
                return 'Serious according to the IME (Important Medical Event) list created by the EudraVigilance Expert Working Group (EV-EWG).';
            } else if (displayName === 'IME Serious') {
                return 'Serious according to the IME (Important Medical Event) list created by the EudraVigilance Expert Working Group (EV-EWG). ';
            } else if (displayName === 'DME') {
                return 'Event shown is on the Designated Medical Event list, the most serious type of event as classified by the FDA.  ';
            } else if (displayName === 'Disease Related') {
                return 'Adverse Event listed is the actual disease or condition which the drug is indicated to treat.  ';
            } else if (displayName === 'On Label') {
                return 'The event shown or equivalent of the event shown is either on or off the latest drug label.';
            } else if (displayName === 'Label Section') {
                return 'These are the distinct FDA Structured Product Label sections of the drugs label where this term occurs as a know side effect.';
            } else if (displayName === 'ROR') {
                return 'Score which measures the relative occurrence of this adverse event with this drug compared to this adverse event’s relative occurrence with all other drugs in the database.  ';
            } else if (displayName === 'PRR') {
                return 'Explanatory Tip Text  Here';
            } else if (displayName === 'Cases') {
                return 'Number of case reports where adverse event was associated with this drug and the reporter listed the drug as the primary suspected cause.';
            } else if (displayName === 'PS PCT') {
                return 'Primary Suspect Cases for adverse event as a percentage of all Primary Suspect Case Reports for the Drug.';
            } else if (displayName === 'Total Cases') {
                return 'The number of case reports where this adverse event was associated with this drug.  ';
            } else if (displayName === 'Total PCT') {
                return 'Total Cases for adverse event as a percentage of the Total Case Reports for the Drug.';
            } else if (displayName === 'Incidence 2012') {
                return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2012.';
            } else if (displayName === 'Incidence 2011') {
                return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2011.';
            } else if (displayName === 'Incidence 2013') {
                return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2013.';
            } else if (displayName === 'Incidence') {
                return 'Avg Annual incidence rate of this adverse event over the last 3 full calendar years based on patient population data supplied by Evaluate Limited.   ';
            } else if (displayName === 'Adverse Event') {
                return 'Explanatory Tip Text for Suspect Cases Here';
            } else if (displayName === 'RxSignal') {
                return 'AEI’s proprietary signaling system which predicts future drug label changes.  “Active” means the signal is active and the adverse event shown will likely be added to the drug’s label in the future.';
            } else if (displayName === 'IME') {
                return 'Serious according to the IME (Important Medical Event) list created by the EudraVigilance Expert Working Group (EV-EWG).';
            } else if (displayName === 'IME Serious') {
                return 'Serious according to the IME (Important Medical Event) list created by the EudraVigilance Expert Working Group (EV-EWG). ';
            } else if (displayName === 'DME') {
                return 'Event shown is on the Designated Medical Event list, the most serious type of event as classified by the FDA.  ';
            } else if (displayName === 'Disease Related') {
                return 'Adverse Event listed is the actual disease or condition which the drug is indicated to treat.  ';
            } else if (displayName === 'On Label') {
                return 'The event shown or equivalent of the event shown is either on or off the latest drug label.';
            } else if (displayName === 'Label Section') {
                return 'These are the distinct FDA Structured Product Label sections of the drugs label where this term occurs as a know side effect.';
            } else if (displayName === 'ROR') {
                return 'Score which measures the relative occurrence of this adverse event with this drug compared to this adverse event’s relative occurrence with all other drugs in the database.  ';
            } else if (displayName === 'PRR') {
                return 'Explanatory Tip Text  Here';
            } else if (displayName === 'Cases') {
                return 'Number of case reports where adverse event was associated with this drug and the reporter listed the drug as the primary suspected cause.';
            } else if (displayName === 'PS PCT') {
                return 'Primary Suspect Cases for adverse event as a percentage of all Primary Suspect Case Reports for the Drug.';
            } else if (displayName === 'Total Cases') {
                return 'The number of case reports where this adverse event was associated with this drug.  ';
            } else if (displayName === 'Total PCT') {
                return 'Total Cases for adverse event as a percentage of the Total Case Reports for the Drug.';
            } else if (displayName === 'Incidence 2012') {
                return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2012.';
            } else if (displayName === 'Incidence 2011') {
                return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2011.';
            } else if (displayName === 'Incidence 2013') {
                return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2013.';
            } else if (displayName === 'Incidence') {
                return 'Avg Annual incidence rate of this adverse event over the last 3 full calendar years based on patient population data supplied by Evaluate Limited.   ';
            }
        };
        return exports;
    })


    .factory('companyService', ['Restangular', 'SERVER_SETTINGS', function (Restangular, SERVER_SETTINGS) {
        var Company = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'api');
        });

        return {
            getAll: function () {
                return Company.all('company').getList();
            },
            getOne: function (d) {
                return Company.one('company', d).get();
            },
            getOverview: function (d) {
                return Company.one('company', d).getList('overview');
            },
            getProducts: function (d) {
                return Company.one('company', d).getList();
            },
            getRevenues: function (d) {
                return Company.one('company', d).getList('revenue');
            },
            getReporting: function (d) {
                return Company.one('company', d).getList('reporting');
            },
            getOutcomes: function (d) {
                return Company.one('company', d).getList('outcomes');
            },
            getRxscore: function (d) {
                return Company.one('company', d).getList('rxscore');
            },
            getNews: function (d) {
                return Company.one('company', d).getList('news');
            },
            getIndication: function (d) {
                return Company.one('company', d).getList('segment-indication');
            },
            getDrugclass: function (d) {
                return Company.one('company', d).getList('segment-drugclass');
            },
            getRxsignalDetail: function (d) {
                return Company.one('company', d).getList('rxsignal');
            },
            getRxsignalSummary: function (d) {
                return Company.one('company', d).getList('rxsignal-summary');
            },
            getStripped: function (obj) {
                return Restangular.stripRestangular(obj);
            }

        };
    }])
    .factory('companyGridService', ['$log', '$state', 'localStorageService', 'tooltipService', function ($log, $state ,localStorageService, tooltipService) {


        var gridService = {};

        //OVERVIEW TAB GRID

        gridService.toolTipper = tooltipService.getTooltip;

        var colDefs = [
            {
                "field": "product_name",
                "pinned": true,
                "width": "140",
                "visible": true,
                "displayName": "Product Name(s)",
                "cellFilter": "capitalizeFilter",
                "cellTemplate": '<div class="ngCellText"><a ui-sref="drugs.detail.overview({id: row.getProperty(\'aedrug_id\')})">{{row.getProperty(col.field) | capitalizeFilter }}</a></p></div>'

            },
            {
                "field": "product_genericName",
                "pinned": false,
                "width": "140",
                "visible": false,

                "displayName": "Generic"
            },
            {
                "field": "rela_tag",
                "pinned": false,
                "visible": false,
                "displayName": "Partner Status"
            },
            {
                "field": "appl_exclusivity",
                "pinned": false,
                "width": "120",
                "visible": true,
                "displayName": "Branded/Generic"
            },
            {
                "field": "subsidiary_company",
                "pinned": false,
                "width": "90",
                "visible": false,
                "displayName": "Subsidiary"
            },
            {
                "field": "subisidary_fda_name",
                "pinned": false,
                "visible": false,
                "displayName": "FDA Applicant"
            },
            {
                "field": "evaluate_productRevenue2013",
                "cellFilter": "number:2",
                "pinned": false,
                "width": "99",
                "visible": true,
                "displayName": "2013 Revenue"
            },
            {
                "field": "evaluate_productRevenue2012",
                "cellFilter": "number:2",
                "pinned": false,
                "width": "70",
                "visible": false,
                "displayName": "2012 Revenue"
            },
            {
                "field": "metric_revenue_growth",
                "cellFilter": "pctg",
                "pinned": false,
                "width": "70",
                "visible": false,
                "displayName": "Revenue Growth"
            },
            {
                "field": "metric_pscount",
                "pinned": false,
                "visible": true,
                "width": "155",
                "cellFilter": "number",
                "displayName": "Primary Suspect Cases"
            },
            {
                "field": "metric_rxscore",
                "pinned": false,
                "visible": true,
                "width": "80",
                "cellFilter": "naFilter",
                "displayName": "RxScore",
                "headerCellTemplate": '<div class="ngHeaderSortColumn test" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }"><div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{tooltipService.getTooltip(col.displayName)}}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div ng-class="{\'green\' : formatRxscore(row.getProperty(col.field)) == \'green\',\'grey\' : formatRxscore(row.getProperty(col.field)) == \'grey\',\'yellow\' : formatRxscore(row.getProperty(col.field)) == \'yellow\',\'orange\' : formatRxscore(row.getProperty(col.field)) == \'#CD7D0F\',\'red\' : formatRxscore(row.getProperty(col.field)) == \'red\',\'grey\' : formatRxscore(row.getProperty(col.field)) == \'grey\'}"><p>{{ row.getProperty(col.field) || \'N\/A\' }}</p></div>'
            },
            {
                "field": "class_indication",
                "pinned": false,
                "visible": true,
                "width": "*",
                "displayName": "Primary Indication"
            },
            {
                "field": "class_drugclass",
                "pinned": false,
                "visible": false,
                "displayName": "Drug Class"
            },
            {
                "field": "dt_max_data",
                "pinned": false,
                "visible": false,
                "displayName": "Data updated"
            },
            {
                "field": "dt_approval",
                "pinned": false,
                "visible": false,
                "displayName": "Date approved"
            }


        ];
        return {
            getColDefs: function () {
                var finalDef;

                try {

                    if (colSet[0].displayName === "Product Name(s)") {
                        var dd = colSet === colSet;
                    } else {
                        //$log.info('No Read on displayName for grid settings in companyOverviewGrid DBG='+JSON.stringify(colSet));
                        colSet = colDefs;
                    }

                } catch (err) {
                    var the_error = err;
                    colSet = colDefs;
                }
                var i = 0;
                finalDef = _.extend(colDefs, colSet);
                return finalDef;
            },
            setColDefs: function (newcols) {
                localStorageService.set($state.current.name+'.gridCols', angular.toJson(newcols));
            },
            resetColDefs: function () {
                localStorageService.set($state.current.name+'.gridCols', angular.toJson(colDefs));
                return colDefs;
            }
        };
    }])
    .factory('companyRxsignalGridService', ['$log', '$state','localStorageService', 'tooltipService', function ($log, $state,localStorageService, tooltipService) {
        //window.localStorage.clear(); //USEFUL FOR DEVELOPMENT ONLY
        //var ToolTipper = tooltipService.getTooltip;
        var colDefsDetail = [
            {
                field: 'product_drugname',
                pinned: true,
                cellClass: 'drugName',
                visible: true,
                displayName: 'Product Name(s)',
                cellFilter: 'capitalizeFilter',
                cellTemplate: '<div class="ngCellText""><a ui-sref="drugs.detail.rxsignal({id:row.getProperty(\'aedrug_id\') })">{{row.getProperty(col.field) | capitalizeFilter}}</a></div>'

            },

            {
                field: 'reac',
                width: '*',
                pinned: false,
                cellClass: "drugName",
                visible: true,
                displayName: 'Adverse Event',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{tooltipService.getTooltip(col.displayName)}}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div class="ngCellText""><p>{{row.getProperty(col.field)}} <span popover-append-to-body="true" popover="Designated Medical Event" popover-trigger="mouseenter" class=\'badge dmeBadge btn-danger active\' ng-show="row.getProperty(\'DME\') == \'DME\'">DME</span></p></div>'},
            {
                field: 'RxSignal',
                width: '95', visible: true,
                displayName: 'RxSignal',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{tooltipService.getTooltip(col.displayName)}}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'RxSignal\') == \'Not Active\',\'red\' : row.getProperty(\'RxSignal\') == \'Active\',\'yellow\' : row.getProperty(\'RxSignal\') == \'Watchlist\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
            {
                field: 'IME',
                width: '95',
                visible: false,
                displayName: 'IME Serious',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>', cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'IME\') == \'Not Serious\',\'red\' : row.getProperty(\'IME\') == \'Serious\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
            {
                field: 'DME',
                width: '66',
                visible: false,
                displayName: 'DME',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>', cellTemplate: '<div class= "ngCellText" ng-class="{\'green\' : row.getProperty(\'DME\') == \'Not DME\',\'red\' : row.getProperty(\'DME\') == \'DME\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
            {
                field: 'Disease_Related',
                width: 133,
                visible: false,
                displayName: 'Disease Related',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>', cellTemplate: '<div title="Disease Related" class="ngCellText" ng-class="{\'red\' : row.getProperty(\'Disease_Related\') == \'No\',\'green\' : row.getProperty(\'Disease_Related\') == \'Yes\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
            {
                field: 'On_Off',
                width: '95',
                visible: true,
                displayName: 'On Label',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div class="ngCellText" ng-class="{\'green\' : row.getProperty(\'On_Off\') == \'Labeled\',\'red\' : row.getProperty(\'On_Off\') == \'Not Labeled\' }"><p>{{ row.getProperty(col.field) }}</p></div>'},
            {
                field: 'Section',
                visible: false,
                width: 110,
                displayName: 'Label Section',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'},
            {
                field: 'ROR',
                width: 69,
                cellFilter: 'number:2',
                visible: true,
                displayName: 'ROR',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{  ToolTipper(col.displayName)">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
            },
            {
                field: 'PRR',
                width: 65,
                visible: false,
                cellFilter: 'number:2',
                displayName: 'PRR',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
            },

            {
                field: 'PS', cellFilter: 'number', visible: true, width: '99',
                displayName: 'Primary Suspect Cases',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
            },

            {
                field: 'PS_PCT', displayName: 'PS PCT', width: 66, cellFilter: 'pctg', visible: false,
                //cellTemplate: '<div class="ngCellText"  ">{{ row.getProperty(col.field) | number:2}}</div>'},
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div class="ngCellText"">{{row.getProperty(col.field)}}</div>'

            },

            {
                field: 'Total', visible: false, displayName: 'Total Cases', width: 100, cellFilter: 'number',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
            },
            {
                field: 'Total_PCT', displayName: 'Total PCT', width: 66, visible: false, cellFilter: 'pctg',
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div class="ngCellText"">{{row.getProperty(col.field) }}</div>'
            },

            {
                field: 'metric_cumulativeIncidence', displayName: 'Incidence', width: '93', visible: true, cellFilter: "number:4",
                headerCellTemplate: '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText"  popover-append-to-body="true" popover-trigger="mouseenter" popover="{{ ToolTipper(col.displayName) }}">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>',
                cellTemplate: '<div title="Cumulative Incidence" class="ngCellText"><p>{{row.getProperty(col.field)|incidenceFilter}}</p></div>'
            }


        ];
        var colDefsSummary = [
            {
                field: 'product_drugnames',
                pinned: true, visible: true,
                width: 300,
                displayName: 'Product Name(s)',
                cellFilter: 'capitalizeFilter',
                cellTemplate: '<div class="ngCellText"><a ui-sref="drugs.detail.rxsignal({id: row.getProperty(\'aedrug_id\')})">{{row.getProperty(col.field) | capitalizeFilter}}</a></div>'
            },
            {
                field: "evaluate_productRevenue2013",
                displayName: "2013 Revenue",
                cellFilter: 'currency:$:2',
                visible: true
            },
            {
                field: 'metric_rxsignal_active',
                displayName: 'Active RxSignal',
                cellFilter: 'number:0',
                visible: true
            },
            {
                field: 'metric_rxsignal_watchlist',
                displayName: 'Watchlist RxSignal',
                width: '170',
                cellFilter: 'number:0',
                visible: true
            },
            {
                field: 'metric_reac',
                displayName: 'Total (Active/Watchlist)',
                cellFilter: 'number:0',
                visible: true
            },
            {
                field: 'ROR', width: 90,
                cellFilter: 'number:2',
                visible: true,
                displayName: 'Avg. ROR'
            },
            {
                field: 'PRR',
                visible: false,
                cellFilter: 'number:2',
                displayName: 'Avg. PRR'
            },
            {
                field: 'metric_rxsignal_ime',
                displayName: 'IME Serious',
                cellFilter: 'number:0',
                visible: false
            },

            {
                field: 'metric_rxsignal_dme',
                displayName: 'DME',
                cellFilter: 'number:0',
                visible: true
            }


        ];
        return {
            getColDefs: function (gridname) {
                var colSet;
                var finalDef;
                if (gridname === 'detail') {
                    try {
                        colSet = angular.fromJson(localStorageService.get($state.current.name+'.gridCols'));
                        if (colSet[0] !== undefined && colSet[0].displayName === "Product Name(s)") {
                            colSet = colSet;
                        } else {
                            colSet = colDefsDetail;
                        }

                    } catch (err) {
                        //$log.warn('couldnt get stored grid settings in companyRxsignalDetailGrid' + err);
                        //$log.warn(colSet);
                        colSet = colDefsDetail;
                    }
                    finalDef = _.extend(colDefsDetail, colSet);
                } else if (gridname === 'summary') {
                    try {
                        colSet = angular.fromJson(localStorageService.get($state.current.name+'.gridCols'));

                        if (colSet[0] !== undefined && colSet[0].displayName === "Product Name(s)") {
                            colSet = colSet;
                        } else {
                            colSet = colDefsSummary;
                        }

                    } catch (err) {
                        //$log.warn('couldnt get stored grid settings in companyRxsignalSummaryGrid:' + err);


                        colSet = colDefsSummary;
                    }
                    finalDef = _.extend(colDefsSummary, colSet);
                }

                return finalDef;
            },
            setColDefs: function (newcols, gridname) {
                if (gridname === 'detail') {
                    localStorageService.set($state.current.name+'.gridCols', angular.toJson(newcols));
                    //$log.info("COMPANY.RXSIGNAL.DETAIL.GRID: settings coldefs")

                } else {
                    localStorageService.set($state.current.name+'.gridCols', angular.toJson(newcols));
                    //$log.info("COMPANY.RXSIGNAL.SUMMARY.GRID: settings coldefs")

                }
            },
            resetColDefs: function (gridname) {
                if (gridname === 'detail') {
                    localStorageService.set($state.current.name+'.gridCols', angular.toJson(colDefsDetail));
                    //$log.info("COMPANY.RXSIGNAL.DETAIL.GRID: REsetting coldefs")

                    return colDefsDetail;

                } else {
                    localStorageService.set($state.current.name+'.gridCols', angular.toJson(colDefsSummary));
                    //$log.info("COMPANY.RXSIGNAL.SUMMARY.GRID: REsetting coldefs")

                    return colDefsSummary;
                }
            }
        };
    }])

    .factory('companyRxscoreService', ['$log', '$rootScope', '$timeout', function ($log, $rootScope, $timeout) {

        var Service = {};
        Service.rxscoreAvg = null;

        Service.pushRxscore = function (rxscore) {
            if (rxscore > 0.00) {
                this.rxscoreAvg = rxscore;
                $timeout(function(){
                   $rootScope.$broadcast('port_rxscore_set');
                });
            } else {
                this.rxscoreAvg = 0;
                $timeout(function(){
                   $rootScope.$broadcast('no_rxscore_data');
                });
            }
        };

        Service.returnScore = function () {
            return Service.rxscoreAvg;
        };

        return Service;

    }]);
