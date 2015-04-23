(function () {
    'use strict';
    angular.module('common.rxscore').factory('RxscoreModel', RxscoreModelDefinition);
    function RxscoreModelDefinition() {
        /**
         * @ngdoc object
         * @namespace common.rxscore
         * @module common.rxscore
         * @name common.nggrid.object:RxscoreModel
         * @param {$rootScope} $rootScope $rootScope of AngularJS
         * @description 
         * <p>RxscoreModel is a generalize object which contains basic setting for 
         * rxscore charts and you can also override any configuration of rscore using this
         * RxscoreModel object. <br/>
         * You can create this using <code>new RxscoreModel($rootScope);<code>;
         */
        function RxscoreModel($rootScope) {
            var self = this;
            self.drugName = '';
            self.drugScore = '';
            self.indications = [];
            self.drugclasses = [];
            self.mechanisms = [];
            self.rootScope = $rootScope;
            self.tVal;
            self.tType;
            self.tLabel = '';
            self.dCount = '';
            self.tDrug = '28';
            self.chart_aHeight = 430 + 'px';
            self.chartConfig;
            self.data;
            self.seriesData;
        }

        RxscoreModel.prototype = {
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getDrugName
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {String} Drug Name of RxscoreModel
             * @description getter for drugname
             */
            getDrugName: function () {
                return this.drugName;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getDrugRxScore
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {Number} drugScore of RxscoreModel
             * @description getter for drugScore
             */
            getDrugRxScore: function () {
                return this.drugScore;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getIndications
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {Array} indications of RxscoreModel's Drug
             * @description getter for indications (Array of Indications of drung)
             */
            getIndications: function () {
                return this.indications;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getDrugClasses
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {Array} drugclasses of RxscoreModel's Drug
             * @description getter for drugclasses (Array of drugclasses of drung)
             */
            getDrugClasses: function () {
                return this.drugclasses;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getMechanisms
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {Array} mechanisms of RxscoreModel's Drug
             * @description getter for drugclasses (Array of mechanisms of drung)
             */
            getMechanisms: function () {
                return this.mechanisms;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setDrugName
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {String} drugName drug name for Rxscore
             * @description Setter for Drug Name.
             */
            setDrugName: function (drugName) {
                this.drugName = drugName;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setDrugRxScore
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {Number} rxScore rxscore of drug/druggroup
             * @description Setter for Drug's rxscore
             */
            setDrugRxScore: function (rxScore) {
                this.drugScore = rxScore;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setIndications
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {Array} Indications of drug/druggroup.
             * @description Setter for Drug's Indications
             */
            setIndications: function (indications) {
                this.indications = indications;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setIndications
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {Array} Indications of drug/druggroup.
             * @description Setter for Drug's Indications
             */
            setDrugClasses: function (drugclasses) {
                this.drugclasses = drugclasses;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setMechanisms
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {Array} mechanisms of drug/druggroup.
             * @description Setter for Drug's mechanisms
             */
            setMechanisms: function (mechanisms) {
                this.mechanisms = mechanisms;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setVal
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {String} termCode of drug/druggroup.
             * @description Setter for Drug's termCode
             */
            setVal: function (value) {
                this.tVal = value;
                this.rootScope.$broadcast("termUpdated");
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setLabel
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {String} value Label Value either Indications, DrugClasses or Mechnisms
             * @description Setter for Drug's termCode
             */
            setLabel: function (value) {
                this.tLabel = value;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setType
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {String} value Label Value either I, C or M.
             * @description Setter for Drug's termCode
             */
            setType: function (value) {
                this.tType = value;
                this.rootScope.$broadcast("termTypeUpdated");
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setCount
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {Number} value No of rxscore records retrieved
             * @description This method sets counts as length of rxscore results.
             */
            setCount: function (value) {
                this.dCount = value;
                this.rootScope.$broadcast("countUpdated");
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getVal
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {String} Returns termCode of Druggroup. 
             * @description getter for Val.
             */
            getVal: function () {
                return this.tVal;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getCount
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {Number} Returns no of rxscore records for drug/druggroup.
             * @description  getter for count.
             */
            getCount: function () {
                return this.dCount;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getLabel
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {String} Returns dimLabel of Druggroup. 
             * @description getter for label.
             */
            getLabel: function () {
                return this.tLabel;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getType
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {String} Returns type of Druggroup. 
             * @description getter for type.
             */
            getType: function () {
                return this.tType;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getHeight
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {String} Returns height of Rxscore chart.
             * @description getter for the chart height.
             */
            getHeight: function () {
                return this.chart_aHeight;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setHeight
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {Number} value Height of Rxscore chart.
             * @description This method sets height of the RxScore Chart and updates for the same to the parent controller.
             */
            setHeight: function (value) {
                this.chart_aHeight = (value - 2) + 'px';
                this.rootScope.$broadcast("heightUpdated");
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getUrl
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {String} Url for navigating to drugGroup.
             * @description This method set url specific to type and returns it
             */
            getUrl: function () {
                var t = this.getType();
                var url;
                if (t === 'I') {
                    url = '#/druggroup/indication/"' + this.getVal() + '/detail/overview';
                } else if (t === 'C') {
                    url = '#/druggroup/drugclass/"' + this.getVal() + '/detail/overview';
                } else if (t === 'M') {
                    url = '#/druggroup/mechanism/"' + this.getVal() + '/detail/overview';
                }
                return url;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getScaleAdj
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {Number} Returns Scale Adjusment
             * @description This method calculate scale adjusment and returns it.
             */
            getScaleAdj: function () {
                var scaleAdj;
                if (this.getCount() < 15) {
                    scaleAdj = 430;
                } else {
                    scaleAdj = this.getCount() * 35;
                }
                return scaleAdj;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getChartConfig
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {JSON} JSON Object for Chart Config.
             * @description Getter for chart config.
             */
            getChartConfig: function () {
                return this.chartConfig;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setChartConfig
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {JSON} chartConfig Configurations of Chart
             * @description This method sets Chart config.
             */
            setChartConfig: function (chartConfig) {
                this.chartConfig = chartConfig;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getRxScoreData
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {Object} data of Rxscore
             * @description This method returns data for Rxscore.
             */
            getRxScoreData: function () {
                return this.data;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setRxScoreData
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {Object} rxScoreData data of Rxscore
             * @description This method sets data for generating Rxscore.
             */
            setRxScoreData: function (rxScoreData) {
                this.data = rxScoreData;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#getSeriesData
             * @methodOf common.nggrid.object:RxscoreModel
             * @returns {JSON} returns seriesd data
             * @description This method returns seriesdata for series.
             */
            getSeriesData: function () {
                return this.seriesData;
            },
            /**
             * @ngdoc method
             * @name common.nggrid.object:RxscoreModel#setSeriesData
             * @methodOf common.nggrid.object:RxscoreModel
             * @param {JSON} seriesData Series data of RxscoreChart.
             * @description This method sets series data of RxscoreChart.
             */
            setSeriesData: function (seriesData) {
                this.seriesData = seriesData;
            }

        };
        return (RxscoreModel);
    }
})();