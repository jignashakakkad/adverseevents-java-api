function ngGridFlexibleHeightPlugin(opts) {
    var self = this;
    self.grid = null;
    self.scope = null;
    self.init = function (scope, grid, services) {
        self.domUtilityService = services.DomUtilityService;
        self.grid = grid;
        self.scope = scope;
        var recalcHeightForData = function () {
            setTimeout(innerRecalcForData, 1);
        };
        var innerRecalcForData = function () {
            var gridId = self.grid.gridId;
            var footerPanelSel = '.' + gridId + ' .ngFooterPanel';
            var extraHeight = self.grid.$topPanel.height() + $(footerPanelSel).height();
            var naturalHeight = self.grid.$canvas.height() + 2;
            if (opts != null) {
                if (opts.minHeight != null && (naturalHeight + extraHeight) < opts.minHeight) {
                    naturalHeight = opts.minHeight - extraHeight - 2;
                }
                if (opts.maxHeight != null && (naturalHeight) > opts.maxHeight) {
                    naturalHeight = opts.maxHeight;
                }
            }

            var newViewportHeight = naturalHeight + 20;
            if (!self.scope.baseViewportHeight || self.scope.baseViewportHeight !== newViewportHeight) {
                self.grid.$viewport.css('height', newViewportHeight + 'px');
                self.grid.$root.css('height', (newViewportHeight + extraHeight) + 'px');
                self.scope.baseViewportHeight = newViewportHeight;
                self.domUtilityService.RebuildGrid(self.scope, self.grid);
            }
        };
        self.scope.catHashKeys = function () {
            var hash = '',
                    idx;
            for (idx in self.scope.renderedRows) {
                hash += self.scope.renderedRows[idx].$$hashKey;
            }
            return hash;
        };
        self.scope.$watch('catHashKeys()', innerRecalcForData);
        self.scope.$watch(self.grid.config.data, recalcHeightForData);
    };
}

function ngGridCsvExportPlugin (opts) {
    var self = this;
    self.grid = null;
    self.scope = null;
    self.init = function(scope, grid, services) {
        self.grid = grid;
        self.scope = scope;
        function showDs() {
            var keys = [];
            // setup our map index of `field`: `displayName`
            var keyNames = {};
            for (var f in grid.config.columnDefs) { keys.push(grid.config.columnDefs[f].field);}

            // build a map of field i.e. {metric_name: "Metric Name", age: "Age"}
            for (var f in grid.config.columnDefs) {
                keyNames[grid.config.columnDefs[f].field] = grid.config.columnDefs[f].displayName;
            }
            var csvData = '';
            function csvStringify(str) {
                if (str == null) { // we want to catch anything null-ish, hence just == not ===
                    return '';
                }
                if (typeof(str) === 'number') {
                    return '' + str;
                }
                if (typeof(str) === 'boolean') {
                    return (str ? 'TRUE' : 'FALSE') ;
                }
                if (typeof(str) === 'string') {
                    return str.replace(/"/g,'""').replace(/'/g, '//');
                }

                return JSON.stringify(str).replace(/'/g, '//');
            }
            function swapLastCommaForNewline(str) {
                var newStr = str.substr(0,str.length);
                return newStr + "\n";
            }
            for (var k in keys) {
                // unwrap our mapping dictionary
                csvData += '"' + csvStringify(keyNames[keys[k]]) + '",';
            }
            // csvData = swapLastCommaForNewline(csvData);
            var gridData = grid.data;

            for (var gridRow in gridData) {
                for ( k in keys) {
                    var curCellRaw;
                    if (opts != null && opts.columnOverrides != null && opts.columnOverrides[keys[k]] != null) {
                        curCellRaw = opts.columnOverrides[keys[k]](gridData[gridRow][keys[k]]);
                    //dbogart added this to handle null cases
                    } else if (gridData[gridRow] === null) {
                        curCellRaw = '';
                    } else {
                        curCellRaw = gridData[gridRow][keys[k]];
                    }
                    csvData += '"' + csvStringify(curCellRaw) + '",';
                }
                // csvData = swapLastCommaForNewline(csvData);
            }
            var csvArray = csvData.split(',');
            csvArray.pop();
            for(var i=0; i < csvArray.length; i++) {
                csvArray[i] = csvArray[i].replace(/"/g, '');
            }

            var fp = grid.$root.find(".ng-grid-buttons");
            var csvDataLinkPrevious = grid.$root.find('.ng-grid-buttons .csv-data-link-span');
            var csvDataLinkPrevious2 = grid.$root.find('.ngHeaderButton2');
            if (csvDataLinkPrevious != null) {csvDataLinkPrevious.remove(); csvDataLinkPrevious2.remove(); }
            var headers = getHeaders(grid.config.columnDefs);
            var csvOutput = getCsvData(grid.config.columnDefs, gridData);

            function getOutput(){
                return csvStringify(csvOutput);
            }
            var stringifiedOutput = csvStringify(csvOutput);

           //FIXME(@cerdman): Find a more elegant way to share data vs. $window
            window.csvMyData = csvOutput;
            var csvDataLinkHtml = "<div class='ngHeaderButton2'><span type='button' lazy-load='true' ng-csv='[]' ng-csv-reference='csvMyData' csv-header='"+csvStringify(headers)+"' filename='data.csv' class='csv-data-link-span'><i class='fa fa-file-excel-o excel-icon'></i></span></div>";

            $(function() {
              angular.element(document).injector().invoke(function($compile) {
                var link = $compile(csvDataLinkHtml);
                csvDataLinkHtml = link(scope);
                fp.append(csvDataLinkHtml);
              });
            });

        }
        setTimeout(showDs, 0);
        scope.catHashKeys = function() {
            var hash = '';
            for (var idx in scope.renderedRows) {
                hash += scope.renderedRows[idx].$$hashKey;
            }
            return hash;
        };
        scope.$watch('catHashKeys()', showDs);
    };
}
function getHeaders(colDefs){
    return _.pluck(colDefs, 'displayName');
}
function getCsvData(colDefs, data){
    var fields = _.pluck(colDefs, 'field');
    window.MyData = data;
    window.MyColDefs = colDefs;
    return _.map(data, function(item){
        return _.pick(item, fields);
    });
}
