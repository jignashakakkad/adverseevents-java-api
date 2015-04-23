

angular.module('portfolioManager.services').factory('portfolioCreateService', function ($rootScope, $log,utilService, portfolioManagerService) {
    'use strict';
    var service = {};
    service.newTab = {};
    var currentTabs = [];
    var dropdownTabs = [];
    var portfolioToCopy = {};
    var notUnique = false;
    var currentMaxId;
    var dropdownClass = 'test';


    // MOCK USER ID
    service.USER_ID = 1;
    service.setLabel = function(s){
        service.newTab.label = s;
    };

    service.setId = function(d){
        service.newTab.id = d;
    };
    service.setGroup = function(s){
        service.newTab.group = s;
    };

    service.setGroupLabel = function(s){

        if (s === 'Private') {
            service.newTab.groupLabel = 'label-danger';
        } else {
            service.newTab.groupLabel = 'label-success';
        }

    };

    service.createPortfolio = function(portName, portGroup){

        portfolioManagerService.createPortfolio(portName, service.USER_ID).then(function(newPort){
            service.setLabel(newPort.label);
            service.setId(newPort.id);
            service.setGroupLabel(portGroup);
            //$log.info(service.newTab);
            //notifies portfolioManagerCtrl of creation
            $rootScope.$broadcast('portfolioCreated');
        }, function(error){
            $log.error("[portfolioManagerServive][CreatePortfolio] Error: "+error);
            $log.debug(error.data.error);
        });

    };

    service.pushExistingPortfolio = function(currentPortfolio) {
        portfolioToCopy = currentPortfolio;
    };

    service.pullExistingPortfolio = function() {
        return portfolioToCopy;
    };

    service.copyPortfolio = function(portName, portGroup){

        portfolioManagerService.createPortfolio(portName, service.USER_ID).then(function(newPort){
            service.setLabel(newPort.label);
            service.setId(newPort.id);
            service.setGroupLabel(portGroup);
            //notifies portfolioManagerCtrl of creation
            $rootScope.$broadcast('portfolioCopied');
        }, function(error){
            $log.error("[portfolioManagerServive][CopyPortfolio] Error: "+error);
            $log.debug(error.data.error);
        });

    };

    service.deletePortfolio = function(portId){

        portfolioManagerService.deletePortfolio(portId, service.USER_ID).then(function(response){
            service.setLabel(undefined);
            service.setId(undefined);
            service.setGroupLabel(undefined);
            //notifies portfolioManagerCtrl of creation
            $rootScope.$broadcast('portfolioDeleted');
        }, function(error){
            $log.error(["[portfolioManagerServive][DeletePortfolio]","Error"]);
            $log.error(error.data.error);
        });

    };
    service.getId = function(){
        return service.newTab.id;
    };

    service.getLabel = function(){
        return service.newTab.label;
    };
    service.getGroup = function(){
        return service.newTab.label;
    };
    service.getGroupLabel = function(){
        return service.newTab.label;
    };
    service.setMaxId = function (maxId) {
        currentMaxId = parseInt(maxId);
    };
    service.getTab = function () {
        return service.newTab;
    };
    service.getCreatedPortfolio = function(){
        return this.newTab;
    };
    service.clearCreatedPortfolio = function(){
        this.newTab = {};
    };
    service.setCurrentPortfolio = function(tabName) {
        currentTabs.push(tabName);
    };
    service.clearCurrentPortfolio = function() {
        currentTabs = [];
    };
    service.passTab = function(tab) {
        dropdownTabs.push(tab);
    };
    service.getDropdownTabs = function() {
        return dropdownTabs;
    };

    service.dropdownStatus = function(totalTabs) {
        if (totalTabs > 9) {
            dropdownClass = '';
        } else {
            dropdownClass = 'disabled';
        }
    };

    service.getDropdownClass = function () {
        return dropdownClass;
    };

    service.checkDupes = function(portName) {

        var _normalizedName =utilService.normalizeStringForMatch(portName);
        for(var i = 0, len = currentTabs.length; i < len; i++) {
            if (utilService.normalizeStringForMatch(currentTabs[i]) === _normalizedName) {
                notUnique = true;
                return notUnique;
            } else {
                notUnique = false;
            }
        }
    };
    service.itemRemovedFromPortfolio = function(itemRemoved, results) {
        for (var x = 0; x < results.length; x++) {
            if (itemRemoved.thisName === results[x].thisName) {
                return x;
            } else {
            }
        }
    };


    //todo(@cerdman) move this to a common util

    function checkMatches(contents, results){
        var _matchesArray = [];
        if(results === undefined){
            return _matchesArray;
        }
        for (var x = 0; x < results.length; x++) {
            if (results.indexOf(contents[x]) > -1) {
                var match = results.indexOf(contents[x]);
                $log.warn(['checkMatchesService',match]);
                _matchesArray.push(match);
            }
        }
        return _matchesArray;
    }


    //function checks if any of the results are already in the drugs panel. if so, grey out
    service.checkPortfolioMatches = function(results, drugs, companies) {
        var matchesArray = [];
        var _contents = _.flatten([_.pluck(drugs, 'thisName'),_.pluck(companies, 'thisName')]);
        return checkMatches(_contents, results);
    };
    service.companiesArray = function(portId) {
        return window['companies' + portId];
    };
    service.createCompaniesArray = function(portId) {
        window['companies' + portId] = [];
    };
    service.copyContents = function(portId) {

        var _newContents = [];
        var _contents = portfolioToCopy.contents;

        _.map(_contents, function(item) {
            portfolioManagerService.createPortfolioItem(portId, item.type, item.content_entity_id, item.content_entity_label, item.content_entity_synonym, item.content_entity_subtype).then( function (data) {
                _newContents.push(data);
            });
        });

        return _newContents;
    };
    service.createDrugsArray = function(portId) {
        window['drugs' + portId] = [];
    };

    service.drugsArray = function(portId) {
        return window['drugs' + portId];
    };
    service.realCheckPortfolioMatches = function(results, drugs, companies) {
        var matchesArray = [];
        var _drugArray = _.pluck(drugs, 'thisName');
        var _companiesArray = _.pluck(companies, 'thisName');

        for (var x = 0; x < results.length; x++) {
            if (results.indexOf(_drugArray[x]) > -1) {
                var match = results.indexOf(_drugArray[x]);
                matchesArray.push(match);
            } else {
            }
        }

        for (var x = 0; x < results.length; x++) {
            if (results.indexOf(_companiesArray[x]) > -1) {
                var match = results.indexOf(_companiesArray[x]);
                matchesArray.push(match);
            } else {
            }
        }

        return matchesArray;
    };

    return service;
});
