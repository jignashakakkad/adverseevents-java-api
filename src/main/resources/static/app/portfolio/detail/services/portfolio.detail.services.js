angular.module('portfolio.detail.services', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'restangular', 'LocalStorageModule', 'aex.constants']);
angular.module('portfolio.detail.services').config(function ($stateProvider, localStorageServiceProvider) {
    'use strict';
    localStorageServiceProvider.setPrefix('portfolio');
}).factory('portfolioSummaryService', ['$log', function ($log) {
    'use strict';
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

                    var RxScoreAvg = fn_avgFromCollection(RxscoreData, 'metric_rxscore') ? {"avg_rxscore": fn_avgFromCollection(RxscoreData, 'metric_rxscore')} : {"avg_rxscore": "N/A"};
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
                    Summary.Metrics.metric_average_rxscore = fn_avgFromCollection(RxscoreData, 'metric_rxscore') ? {"label": fn_avgFromCollection(RxscoreData, 'metric_rxscore')} : {"label": "N/A"};
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

    .factory('portfolioChartService', function () {
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
            var colorbrewer = {
                YlOrRd: {
                    3: ["#ffeda0", "#feb24c", "#f03b20"],
                    4: ["#ffffb2", "#fecc5c", "#fd8d3c", "#e31a1c"],
                    5: ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"],
                    6: ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#f03b20", "#bd0026"],
                    7: ["#ffffb2", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"],
                    8: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#b10026"],
                    9: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"]
                }
            };

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
            var overviewChart;
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
                return Math.abs(cs.evaluate_productRevenue2013) > 0;
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
                Series[0].data.push({name: o.BrandName, color: color, y: Math.abs(o.evaluate_productRevenue2013)});
            });
            overviewChart = {
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
                        text: '2013 Revenue'
                    },
                    labels: {
                        format: '{value} $MM USD'
                    }

                }, credits: {
                    enabled: false
                },
                series: Series,
                title: {
                    style: {'display': 'none'}
                }

            };

            return overviewChart;

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

    .factory('portfolioService', ['Restangular', 'SERVER_SETTINGS', function (Restangular, SERVER_SETTINGS) {
        var Restangular = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL + 'api/v2/');
        });

        return {
            getPortfolio: function (portId) {
                return Restangular.withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL + 'portfolio/public/api');
                }).one('portfolio', portId);
            },
            getAll: function () {
                return Restangular.all('portfolio').getList();
            },
            getOne: function (d) {
                return Restangular.one('portfolio', d).get();
            },
            getOverview: function (d) {
                return Restangular.one('portfolio', d).getList('overview');
            },
            getProducts: function (d) {
                return Restangular.one('portfolio', d).getList();
            },
            getDrugDetail: function (d) {
                return Restangular.one('portfolio', d).getList('revenue/drug-detail');
            },
            getDrugOverview: function (d) {
                return Restangular.one('portfolio', d).getList('revenue/drug-overview');
            },
            getCompanyOverview: function (d) {
                return Restangular.one('portfolio', d).getList('revenue/company-overview');
            },
            getReporting: function (d) {
                return Restangular.one('portfolio', d).getList('reporting');
            },
            getOutcomes: function (d) {
                return Restangular.one('portfolio', d).getList('outcomes');
            },
            getRxscore: function (d) {
                return Restangular.one('portfolio', d).getList('rxscore');
            },
            getNews: function (d) {
                return Restangular.one('portfolio', d).getList('news/test');
            },
            getIndication: function (d) {
                return Restangular.one('portfolio', d).getList('segment-indication');
            },
            getDrugclass: function (d) {
                return Restangular.one('portfolio', d).getList('segment-drugclass');
            },
            getRxsignalDetail: function (d) {
                return Restangular.one('portfolio', d).getList('rxsignal/test');
            },
            getRxsignalSummary: function (d) {
                return Restangular.one('portfolio', d).getList('rxsignal-summary/test');
            },
            getStripped: function (obj) {
                return Restangular.stripRestangular(obj);
            }

        };
    }])
    .factory('portfolioRxscoreService', ['$log', '$rootScope', '$timeout', function ($log, $rootScope, $timeout) {

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

    }])

    .factory('portfolioAvgOutcomeService', ['$log', '$rootScope', 'Restangular', function ($log, $rootScope, Restangular) {

        var Service = {};

        Service.getAvgOutcomes = function (alloutcomes) {

            var displayedOutcomes = _.filter(alloutcomes, function(outcome){
              return outcome.outc_cod != 'OT' && outcome.outc_cod != 'CA' &&  outcome.outc_cod != 'NS' ;
            });

            var totalPS = 0;
            var totalReports = 0;
            var totalOutcome11 = 0;
            var totalOutcome12 = 0;
            var totalOutcome13 = 0;
            var threeYearAverages = 0;
            var collectionSize = 0;

            angular.forEach(displayedOutcomes, function (d) {
                totalPS += d.metric_pscount;
                totalReports += d.metric_totalcount;
                totalOutcome11 += d.metric_i2011;
                totalOutcome12 += d.metric_i2012;
                totalOutcome13 += d.metric_i2013;
                threeYearAverages += d.metric_icumulative;
                collectionSize++;
            });

            var psCountAvg = (totalPS / collectionSize);
            var totalcountAvg = (totalReports / collectionSize);
            var totalOutcome11Avg = (totalOutcome11 / collectionSize);
            var totalOutcome12Avg = (totalOutcome12 / collectionSize);
            var totalOutcome13Avg = (totalOutcome13 / collectionSize);
            var threeYearAvg = (threeYearAverages / collectionSize);

            Service.avgOutcomes = {
                "ps_count_avg": psCountAvg,
                "total_count_avg": totalcountAvg,
                "total_outcome_2011_avg": totalOutcome11Avg,
                "total_outcome_2012_avg": totalOutcome12Avg,
                "total_outcome_2013_avg": totalOutcome13Avg,
                "three_year_avg": threeYearAvg
            };

            return Service.avgOutcomes;
        };

        return Service;

    }]);
