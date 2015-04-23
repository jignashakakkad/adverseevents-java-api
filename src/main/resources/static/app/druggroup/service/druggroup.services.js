angular.module('druggroup.services', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'restangular', 'LocalStorageModule', 'aex.constants']);
angular.module('druggroup.services').config(function (RestangularProvider, localStorageServiceProvider, SERVER_SETTINGS) {
    localStorageServiceProvider.setPrefix('aex');
    RestangularProvider.setBaseUrl(SERVER_SETTINGS.BASE_URL);
});

angular.module('druggroup.services').factory('drugGroupService', ['Restangular', 'SERVER_SETTINGS',DrugGroupService]);

function DrugGroupService(Restangular, SERVER_SETTINGS) {
    var DrugGroup = Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL+'api');
    });
    return {
        //  getAll: function (type) {
        //       return DrugGroup.all(type).getList();
        //   },
        /** this method is specifically for fetching data from www.adverseevents.com/lev/api webservice.
        * all other drugclass and indications having data www.adverseevents.com/api
        * @param {type} type
        * @returns {unresolved}
        */
        getAll: function (type) {
            var DrugGroup = Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setBaseUrl(SERVER_SETTINGS.BASE_URL + 'lev/api');
            });
            if(type === 'indication'){
                type = 'indications';
            } else if (type === "mechanisms" || type === "mechanism") {
                type = 'mechanisms';
            }
            return DrugGroup.all(type+'/index').getList();
        },
        getOne: function (d, type) {
            return DrugGroup.one(type, d).get();
        },
        getOverview: function (d, type) {
            return DrugGroup.one(type, d).getList('overview');
        },
        getIndications: function (d, type) {
            return DrugGroup.one(type, d).getList('indications');
        },
        getTimeline: function (d, type) {
            return DrugGroup.one(type, d).getList('timeline');
        },
        getRegulatory: function (d, type) {
            return DrugGroup.one(type, d).getList('regulatory');
        },
        getDrugclass: function (d, type) {
            return DrugGroup.one(type, d).get();
        },
        getReporting: function (d, type) {
            return DrugGroup.one(type, d).getList('reporting');
        },
        getOutcomes: function (d, type) {
            return DrugGroup.one(type, d).getList('outcomes');
        },
        getOutcomesChart: function (d, type) {
            return DrugGroup.one(type, d).getList('outcomes-chart');
        },
        getRxscore: function (d, type) {
            return DrugGroup.one(type, d).getList('rxscore');
        },
        getNews: function (d, type) {
            return DrugGroup.one(type, d).getList('news');
        },
        getRxsignalDetail: function (d, type) {
            return DrugGroup.one(type, d).getList('rxsignal');
        },
        getRxsignalSummary: function (d, type) {
            return DrugGroup.one(type, d).getList('rxsignal-summary');
        },
        getAdverseEvents: function (d, type) {
            return DrugGroup.one(type, d).getList('drug-events-all');
        },
        getStripped: function (obj) {
            return Restangular.stripRestangular(obj);
        }
    };
}

