angular.module('portfolioManager.services').factory('portfolioContentResource', function ($resource) {
    'use strict';
    var baseUrl = '/api/portfolio/search';
    return $resource(baseUrl);
});
