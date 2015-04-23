/*
 LISTENER MODULE FOR PORFOLIOS
 WILL HANDLE HIGH LEVEL ABSTRACTION OF LISTENING TO DRUG/COMPANY RELATED EVENTS AND
 CHECKING IF THE USER HAS AN AUTH TOKEN (IS PORTFOLIO USER), AND THEN IF THE ITEM AT
 A GIVE $STATEPARAM/$STATEPARAM.ID IS PART OF A TUPLE OF $USER_ID/$CONTENT_ENTITY_TYPE/$CONTENT_ENTITY_ID
 */

angular
    .module('portfolio.listener', ['aex.constants', 'ngToast', 'ngCookies', 'LocalStorageModule']);

angular
    .module('portfolio.listener')
    .config(function ($stateProvider, localStorageServiceProvider) {
        'use strict';
        localStorageServiceProvider.setPrefix('portfolio');
    })
    .value('LISTENER_API', function (SERVER_SETTINGS) {
        return SERVER_SETTINGS.BASE_URL;
    })
    .factory('portfolioExposureService', ['localStorageService', function portfolioExposureService(localStorageService) {
        return {
            addWatch: AddExposure,
            pruneWatch: PruneExposure,
            checkExposure: CheckExposure,
            indexExposure: IndexExposure,
            getContents: getLocalStoragePortfolioContents
        };

        function getLocalStoragePortfolioContents() {
            return angular.fromJson(localStorageService.get('portfolio-content-ids')) || {collection: ['00', 'x']};

            }

        function setLocalStoragePortfolioContents(collectionArray) {
            var _val = angular.toJson({'collection': collectionArray});

            localStorageService.set('portfolio-content-ids', _val);

        }

        function AddExposure(id) {
            var _contents = getLocalStoragePortfolioContents();

            _contents = _.chain(_contents.collection).toArray().flatten().push('x').push(id.toString()).uniq().value();
            setLocalStoragePortfolioContents(_contents);

        }

        function PruneExposure(id) {
            var _contents = getLocalStoragePortfolioContents();


            _contents = _.chain(_contents.collection).toArray().flatten().push('x').uniq().without(id.toString()).value();
            setLocalStoragePortfolioContents(_contents);
        }

        function IndexExposure(promiseCollection) {
            var _contents = getLocalStoragePortfolioContents();
            var add = AddExposure;
            var _portfolio_contents = _.pluck(promiseCollection, 'content_entity_id');
            _contents = _.chain(_contents.collection).toArray().flatten().push('x').uniq().value();
            _.chain([_contents, _portfolio_contents]).flatten().uniq().value().map(function (d) {
                add(d);

    });
        }

        /**
         * @return {boolean}
         */
        function CheckExposure(id) {
            var _contents = getLocalStoragePortfolioContents();

            return (_contents.collection.indexOf(id.toString()) > -1);
        }
    }]);

