| Dependency check	| Company Version| Required for | Location|
| :------	|:------	|:---------	|
| highcharts-ng  | 0.7 		| New charts	| /bower-components
| highstock | 1.3.9 | New charts | /app/lib or /vendor
| angular-local-storage|* || /bower-components
| font-awesome | 4.2.0 | | `/bower-components`
| angular-smart-table | should be removed | remove | bower-components|
| angular-fullscreen |*| fullscreen| bower-components|
| raven-js/plugins/angular.js | * |Visit tracking|bower-components
| ng-grid-2.0.12 | 2.0.12 ? | Grid fn | /vendor|
| pace.js |diff||/vendor
| aexicons ||new icons | assets/css/




|Company file requires (relative to root dir /)	|	|	|
|:--------|:----------	|:--------------------|
|common/  |		|		|
||directives/|chart-rxscore-company.js	|
||partials/|common-cases-filter.tpl.html	|
|company/|||
||./|company.servies.less?
|app/||||
||company/|* (all files)|


|Hardcoded dev server link removal	| Thing	| Other|
| :------	|:------:	|---:	|
| Dev server link in main.js for search  | that 


|Authentication/user linkup 	| Pass	| Fail| Note
| :------	|:------:	|---:	|
| Authentication check in app.js  | 
| User visit tracking POST operation in app.js |
| Add helpdesk widget back in |

|Final for public/general availability	| Pass| Fail|Note|
| :------	|:------:	|---:	|
| link to companies in nav-list*.html  | ||
| company.js to index.html ||
| Dependencies (above) to index.html |||
| freshwidget helpdesk to index.html |||
| company-controllers.js to index.html |||
| tooltipService.js to index.html |||
| titleCase.js to index.html |||




