/**
 * @ngdoc service
 * @name portfolio.manager.portfolioManagerService
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $restangular
 *
 * */

angular.module('portfolio.manager.service', ['restangular', 'aex.constants', 'portfolio.listener']);
angular
    .module('portfolio.manager.service')
    .config(function (RestangularProvider, SERVER_SETTINGS) {
        RestangularProvider.setBaseUrl(SERVER_SETTINGS.BASE_URL + 'portfolio/public/api');
    })
    .factory('portfolioManagerService', ['$log', 'Restangular', 'SERVER_SETTINGS','portfolioExposureService', function ($log, Restangular, SERVER_SETTINGS, portfolioExposureService) {

        var Service = {};


        Service.queryItems = function (query) {
            return Restangular.one('search', query).getList();
        };

        Service.getPortfolios = function () {
            return Restangular.all('portfolio').getList();
        };


        Service.getPortfolio = function (portId) {
            return Restangular.one('portfolio', portId).get();

        };

        Service.createPortfolio = function (portfolioLabel, userId) {
            var portfolio = Restangular.one('portfolio');
            portfolio.label = portfolioLabel;
            portfolio.user_id = userId;

            return portfolio.save();
        };

        Service.updatePortfolio = function (portId, portLabel) {
            var portfolio = Restangular.one('portfolio', portId);
            portfolio.label = portLabel;
            return portfolio.put();
        };

        Service.deletePortfolio = function (portId) {
            var portfolio = Restangular.one('portfolio', portId);

            return portfolio.remove();
        };

        Service.getPortfolioItems = function (portId) {
            return Restangular.one('portfolio', portId).one('contents').$object;

        };

        Service.getPortfolioItem = function (portId, portItem) {
            return Restangular.one('portfolio', portId).one('contents', portItem.id).$object;

        };

        Service.createPortfolioItem = function (portId, content_type, content_entity_id, content_entity_label, content_entity_synonym, content_entity_subtype) {
            var portfolioItem = Restangular.one('portfolio', portId).one('contents');
            portfolioItem.type = content_type;
            portfolioItem.content_entity_id = content_entity_id;
            portfolioItem.content_entity_label = content_entity_label;
            portfolioItem.content_entity_synonym = content_entity_synonym;
            portfolioItem.content_entity_subtype = content_entity_subtype;
            portfolioExposureService.addWatch(content_entity_id);
            return portfolioItem.save();

        };

        Service.deletePortfolioItem = function (portId, portItem) {
            var portfolio = Restangular.one('portfolio', portId).one('contents', portItem.id);
            portfolioExposureService.pruneWatch( portItem.id);

            return portfolio.remove();
        };
        return Service;
    }]).run(function(Restangular, SERVER_SETTINGS){
        Restangular.setBaseUrl(SERVER_SETTINGS.BASE_URL + 'portfolio/public/api');
    });
