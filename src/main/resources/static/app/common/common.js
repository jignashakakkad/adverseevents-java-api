(function () {
    'use strict';
    angular.module('common.services', []);
    angular.module('common.controllers', ['common.services']);
    angular.module('common', ['common.controllers']);
})();

