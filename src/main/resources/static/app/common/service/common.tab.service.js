(function () {
    'use strict';
    function MainTabService() {
        // Make this tab variable as private
        var tabs = [];
        
        // define getter setter
        var methods = {
            setTabs: setTabs,
            getTabs: getTabs
        };
        return methods;

        /////// define methods //////
        function setTabs(tabs) {
            this.tabs = tabs;
        }
        function getTabs() {
            return this.tabs;
        }
    }
    angular.module('common.services').service('MainTabService', MainTabService);
})();