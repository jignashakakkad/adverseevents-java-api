
angular.module('newsService', ['ngResource','restangular','ngSanitize','aex.constants'])

    .factory('dsmArticleService',function() {
        var dsmArticleService = {};
        return dsmArticleService;
    })

    // TODO(@chore) convert this to a global service.
    .factory('dsmService', function ($rootScope, $http, SERVER_SETTINGS) {
        $log.debug(['dsmService','SERVER_SETTINGS',SERVER_SETTINGS]);
        return $http.get(SERVER_SETTINGS.BASE_URL+'lev/index/dsm').success(function (data) {
            $rootScope.myData = data;
        });
    })

    // TODO(@chore) convert this to a global service.
    .factory('ArticleService', function ($http, SERVER_SETTINGS) {
    return {
        getArticlesWithPagination: function (_page, _perPage) {
            return $http.get(SERVER_SETTINGS.BASE_URL+'lev/index/dsm', {
                params: {
                    page: _page,
                    perPage: _perPage
                }
            });
        }
    };
    })

    // TODO(@chore) convert this to a global service.
    .factory('dsmService', function ($http, $locationProvider, SERVER_SETTINGS) {
        var getArticleList = function ( feature_type, featureId ) {
            return $http({
                method: 'GET',
                url: SERVER_SETTINGS.BASE_URL+'user/dsm/posts/' + feature_type + '/' + featureId
            });
        };

        return{
            getArticleList: function (feature_type, feature_id) {
                return  getArticleList(feature_type, feature_id);
            }

        };
    });
