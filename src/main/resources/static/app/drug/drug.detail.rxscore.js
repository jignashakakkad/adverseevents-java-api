
angular.module('drugs').factory('rxScoreService', function ($http, SERVER_SETTINGS) {
        // Updated to use the v3 API below here.
        var getScoresForIndi = function (termId, units) {
            return $http({
                method: 'GET',
                url: SERVER_SETTINGS.RXSCORE_URL+'service/service.rxscore.atc.v3.php?termCode=' + termId + '&units=' + units
            });
        };

        // Updated to use the v3 API below here.
        var getComponentsForIndi = function (termId, units) {
            return $http({
                method: 'GET',
                url: SERVER_SETTINGS.RXSCORE_URL+'service/service.rxscore.comp.v3.php?termCode=' + termId + '&units=' + units
            });
        };


        return{
            getScores: function (termId, units) {
                return getScoresForIndi(termId, units);
            },
            getComponents: function (termId, units) {
                return  getComponentsForIndi(termId, units);
            }

        };
    });
angular.module('drugs').factory('termService', function ($rootScope) {
        var service = {};
        service.tVal = 'Bronchitis';
        service.tType = 'I';
        service.tLabel = '';
        service.dCount = '';
        service.tDrug = 'null';

        service.chart_aHeight = 430 + 'px';

        service.setVal = function (value) {
            this.tVal = value;
            $rootScope.$broadcast("termUpdated");
            //console.log('termSERVICE SAYS:  Broadcast termUpdated');
        };

        service.setLabel = function (value) {
            this.tLabel = value;
            //$rootScope.$broadcast("termUpdated");
            //console.log('termSERVICE SAYS:  Broadcast that label updated back to controller :'+ value)
        };

        service.setType = function (value) {
            this.tType = value;
            $rootScope.$broadcast("termTypeUpdated");
            //console.log('termSERVICE SAYS: Sending Broadcast that termType is Set :'+ value);
            //console.log(this.tType);
        };

        service.setData = function (Data) {
            //console.log(Data);
            this.tType = Data[0].children[0].type;
            $rootScope.$broadcast("termTypeUpdated");
            //console.log('termSERVICE SAYS: Sending Broadcast that termType is Set :'+ value);
            //console.log(this.tType);
        };
        service.setKount = function (value) {
            this.dCount = value;
            $rootScope.$broadcast("countUpdated");
            //console.log('termSERVICE SAYS: Count of objects UPDATED: '+ value);
        };

        service.getVal = function (value) {
            return this.tVal;
        };

        service.getKount = function (value) {
            return this.dCount;
        };

        service.getLabel = function (value) {
            return this.tLabel;
        };

        service.getType = function (value) {
            return this.tType;
        };

        service.getHeight = function (value) {
            return this.chart_aHeight;
        };

        service.setHeight = function (value) {
            this.chart_aHeight = (value - 2) + 'px';
            $rootScope.$broadcast("heightUpdated");
            //console.log('termSERVICE SAYS: flex-height for chart container UPDATED: '+ value);
        };


        return service;
    });




