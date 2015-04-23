/**
 * @ngdoc service
 * @name portfolio.manager.portfolioManagerService
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $restangular
 *
 * */

(function () {
    'use strict';
    angular.module('portfolio.manager.service').factory('portfolioManagerUIService', ['$log', 'portfolioManagerService', 'portfolioCreateService', 'utilService', PortfolioManagerUIService]);

    function PortfolioManagerUIService($log, portfolioManagerService, portfolioCreateService, utilService) {

        var UIService = {
            initView: initPortfolioManagerView,
            initPortfolio: initPortfolio,
            addElementToPortfolio: addElementToPortfolio,
            removeElementFromPortfolio: removeElementFromPortfolio,
            renamePortfolio: renamePortfolio,
            removePortfolio: removePortfolio,
            retrieveSearchItems: retrieveSearchItems,
            getManagerView: getManagerView,
            initPortfolioCreateView: initPortfolioCreateView,
            createPortfolio: createPortfolio,
            copyPortfolio: copyPortfolio,
            checkDupes: checkDupes
        };
        UIService.portfolioManagerView = {
        };
        UIService.portfolioCreateView = {};
        return UIService;

        //////////////////////////////

        function initPortfolioManagerView(portfolioTitle, Portfolios, portfolioId) {
            UIService.portfolioManagerView.portfolioTitle = portfolioTitle;
            UIService.portfolioManagerView.Portfolios = Portfolios;
            UIService.portfolioManagerView.tabs = _.sortBy(Portfolios, function (d) {
                return d.id;
            });
            UIService.portfolioManagerView.dropdownTabs = [];
            if (!portfolioId && !!UIService.portfolioManagerView.tabs && UIService.portfolioManagerView.tabs.length > 0) {
                UIService.portfolioManagerView.portId = UIService.portfolioManagerView.tabs[0].id;
                UIService.portfolioManagerView.needStateChange = true;
            } else {
                UIService.portfolioManagerView.portId = portfolioId;
//                UIService.initPortfolio(UIService.portfolioManagerView.portId);
            }
            return UIService.portfolioManagerView;
        }

        function initPortfolio(portId) {
            if (!!portId) {
                portfolioManagerService.getPortfolio(portId).then(function (obj) {
                    UIService.portfolioManagerView.tabs = _.extend(UIService.portfolioManagerView.tabs, {active: false});
                    _.map(UIService.portfolioManagerView.tabs, function (tab) {
                        _.extend(tab, {active: false});
                    });
                    UIService.portfolioManagerView.portId = portId;
                    UIService.portfolioManagerView.Portfolio = obj;
                    UIService.portfolioManagerView.drugs = _.where(obj.contents, {'type': 'drug'});
                    UIService.portfolioManagerView.companies = _.where(obj.contents, {'type': 'company'});
                    _.findWhere(UIService.portfolioManagerView.tabs, {'id': portId}).active = true;
                    if (UIService.portfolioManagerView.activeTab === undefined) {
                        UIService.portfolioManagerView.activeTab = _.findWhere(UIService.portfolioManagerView.tabs, {'id': portId});
                        UIService.portfolioManagerView.activeTab.active = true;
                    }
                    UIService.portfolioManagerView.enableLaunchButton = UIService.portfolioManagerView.drugs.length > 0 || UIService.portfolioManagerView.companies.length > 0;
                    UIService.portfolioManagerView.items = [];
                    UIService.portfolioCreateView.Portfolio = obj;
                    portfolioCreateService.pushExistingPortfolio(obj);
                });
            }
        }

        function addElementToPortfolio(item) {
            var _target;
            var portId = UIService.portfolioManagerView.portId;
            item.type = item.thisType.toLowerCase();
            portfolioManagerService.createPortfolioItem(portId, item.type, item.thisID, item.thisName, item.thisSynonym, item.thisSubType)
                    //TODO(@CERDMAN) ----- MAKE THIS WORK OFF OF ITEM INSTEAD OF 3x VARS FROM ITEM.
                    .then(function (_newItem) {
                        if (_newItem.type.toLowerCase() === 'drug') {
                            _target = UIService.portfolioManagerView.drugs;
                        } else {
                            _target = UIService.portfolioManagerView.companies;
                        }
                        _.map([_target, UIService.portfolioManagerView.Portfolio.contents], function (c) {
                            c.push(_newItem);
                        });
                        item.isAdded = true;
                    });
        }

        function renamePortfolio() {
            UIService.portfolioManagerView.Portfolio.save();
            UIService.portfolioManagerView.tabs = _.map(UIService.portfolioManagerView.tabs, function (portfolio) {
                if (portfolio.id === UIService.portfolioManagerView.Portfolio.id) {
                    portfolio.label = UIService.portfolioManagerView.Portfolio.label;
                }
                return portfolio;
            });
        }

        function defineAdd() {
            _.each(UIService.portfolioManagerView.items, function (item) {
                if (item !== undefined && item.thisName.length) {
                    item.isAdded = _.contains(_.pluck(UIService.portfolioManagerView.Portfolio.contents, 'content_entity_label'), item.thisName);
                }
            });
        }
        function retrieveSearchItems(queryText) {
            if (queryText.length > 2) {
                portfolioManagerService.queryItems(queryText).then(function (response) {
                    UIService.portfolioManagerView.items = response;
                    defineAdd();
                });
            } else {
                UIService.portfolioManagerView.items = [];
            }
        }

        function removePortfolio(Portfolio) {
            var stateData = {};
            return Portfolio.remove().then(function (response) {
                $log.warn('DELETED PORT');
                var _to = '', _params = {};
                if (response.id && response.label.length) {
                    _to = '.edit';
                    _params.portId = response.id;
                }
                stateData.state = 'portfolio.manager' + _to;
                stateData.params = _params;
                return stateData;
            }, function (error) {
                $log.error('FAILED TO RESOLVE PORTFOLIO DELETION');
                stateData.state = 'portfolio.manager';
                return stateData;

            });
        }

        function removeElementFromPortfolio(item) {
            var _id = item.id;
            UIService.portfolioManagerView.Portfolio.one('contents', item.id).remove().then(function () {
                UIService.portfolioManagerView.Portfolio.contents = _.reject(UIService.portfolioManagerView.Portfolio.contents, {'id': _id});
                UIService.portfolioManagerView.drugs = _.without(UIService.portfolioManagerView.drugs, item);
                UIService.portfolioManagerView.companies = _.without(UIService.portfolioManagerView.companies, item);
                defineAdd();
            });
        }

        function createPortfolio(portName, portGroup) {
            var stateData = {};
            return portfolioManagerService.createPortfolio(portName, UIService.portfolioCreateView.USER_ID).then(function (newPort) {
                UIService.portfolioCreateView.newTab = {};
                UIService.portfolioCreateView.newTab.label = newPort.label;
                UIService.portfolioCreateView.newTab.id = newPort.id;
                UIService.portfolioCreateView.newTab.groupLabel = portGroup;
                stateData.state = 'portfolio.manager.edit';
                stateData.params = {portId: newPort.id};
                return stateData;
            }, function (error) {
                $log.error("[portfolioManagerServive][CreatePortfolio] Error: " + error);
                $log.debug(error.data.error);
            });
        }

        function copyPortfolio(portName, portGroup) {
            var stateData = {};
            return portfolioManagerService.createPortfolio(portName, UIService.portfolioCreateView.USER_ID).then(function (newPort) {
                UIService.portfolioCreateView.newTab = {};
                UIService.portfolioCreateView.newTab.label = newPort.label;
                UIService.portfolioCreateView.newTab.id = newPort.id;
                UIService.portfolioCreateView.newTab.groupLabel = portGroup;
                copyContents(newPort.id);
                stateData.state = 'portfolio.manager.edit';
                stateData.params = {portId: newPort.id};
                return stateData;
            }, function (error) {
                $log.error("[portfolioManagerServive][CopyPortfolio] Error: " + error);
                $log.debug(error.data.error);
            });
        }

        function copyContents(portId) {
            var _newContents = [];
            var _contents = UIService.portfolioCreateView.Portfolio.contents;
            _.map(_contents, function (item) {
                portfolioManagerService.createPortfolioItem(portId, item.type, item.content_entity_id, item.content_entity_label, item.content_entity_synonym, item.content_entity_subtype).then(function (data) {
                    _newContents.push(data);
                });
            });
            return _newContents;
        }

        function checkDupes(portName, checkCurrentPortfolio) {
            var notUnique = false;
            var _normalizedName = utilService.normalizeStringForMatch(portName);
            var _normalize = utilService.normalizeStringForMatch;
            if (!!_normalizedName & _normalizedName.length > 0) {
                for (var i = 0, len = UIService.portfolioManagerView.tabs.length; i < len; i++) {
                    if (utilService.normalizeStringForMatch(UIService.portfolioManagerView.tabs[i].label) === _normalizedName) {
                        notUnique = true;
                        if (checkCurrentPortfolio) {
                            return _normalize(portName) !== _normalize(UIService.portfolioManagerView.Portfolio.label);
                        }
                        return notUnique;
                    } else {
                        notUnique = false;
                    }
                }
            }
            return notUnique;
        }


        function getManagerView() {
            return UIService.portfolioManagerView;
        }

        function initPortfolioCreateView() {
            var createView = UIService.portfolioCreateView;
            createView.USER_ID = 1;
            createView.portfolios = {};
            createView.portfolioTitle = UIService.portfolioManagerView.portfolioTitle;
            createView.portfolios.groupSelection = false;
            createView.singleModel = 1;
            createView.radioModel = 'Middle';
            createView.checkModel = {
                left: false,
                middle: true,
                right: false
            };
            createView.groupModel = 'Selected group';

            createView.myStyle = {
                background: '#000000'
            };

            createView.groups = [
                {name: 'Pharmaco Vigilance'},
                {name: 'Marketing'},
                {name: 'Outcomes'}
            ];

            createView.status = {
                isopen: false
            };
            return createView;
        }
    }
})();
