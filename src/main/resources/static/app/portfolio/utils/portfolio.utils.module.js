/*
 DESCRIPTION
 */

angular
    .module('portfolio.utils', ['aex.constants', 'ngCookies', 'LocalStorageModule']);

angular
    .module('portfolio.utils')
    .factory('portfolioNameService', ['$cookies', function portfolioNameService($cookies) {

        var portfolioName = 'Formulary';
        var service = {
            setName: setName,
            getName: getName
        };

        return service;

        function setName() {
            var _cookie;

            if ($cookies['user_portfolio_name']) {
                _cookie = $cookies['user_portfolio_name'];
                if (_cookie === "1") {
                    portfolioName = 'Portfolio';
        }
            }

        };

        function getName() {
            return portfolioName;
        };

    }]);
