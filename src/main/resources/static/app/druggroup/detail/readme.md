@cerdman 2014-12-15 - Feedback on directory structure/common.


* This all looks good.

* Lets get an idea of current test coverage / non-coverage (unit, not just e2e).

* As a best practice John Papas style guide on directory structure is the best one relative to ours should work.

    https://github.com/johnpapa/angularjs-styleguide#style-y150

    Our `grunt ngtemplates` task will compile all of our partials in any event to a central location, i.e.:

      ```
      $templateCache.put('app/druggroup/detail/partial/druggroup.detail.rxsignal.summary.html',
        "<div class=\"panel panel-default\"><div class=panel-heading><h4>Summary Chart <span class=\"info badge\">Live data</span></h4></div><div class=panel-body><div class=row><div id=company-rxsignal-bubblechart ng-show=\"rxsignal_count > 0\"></div></div></div><div class=clearfix></div><div class=row-fluid><div class=jumbotron ng-show=\"rxsignal_count == 0\"><h4>No RxSignal Data</h4></div><div class=\"panel panel-default rxSignalDetailGridPanel\" ng-show=\"rxsignal_count > 0\"><div class=panel-heading><span class=\"text-muted panel-title\">Indication Drugs - RxSignal Summary</span> <button class=\"btn btn-default btn-mini restoreSortButton rxSignalDetailCompanyGrid pull-right\" ng-click=localStorageClear() popover-append-to-body=true popover-trigger=mouseenter popover=\"Reload grid with default sorting order">Restore Default Settings</button></div><div ng-grid=gridOptionsSummary class=gridStyle ng-show=\"rxsignal_count > 0\"></div></div></div><style>.ngCellText span {\n" +
        "            margin-left: 0 !important;\n" +
        "        }\n" +
        "\n" +
        "        .rxSignalDetailCompanyGrid {\n" +
        "\n" +
        "        }</style></div>"
      );
      ```

    We are not using the templates.js or any of the `grunt ngannotate` or min. stuff in production yet but we could use it.
    * I don't want to compromise any sort of debugging ** how can we generate source maps so that our RavenJS error logging stays accurate?

* Module structure should basically reflect java style directory structure with dot notation. I.e we would expect drug.detail.* to be in `{APP_ROOT}/drug/detail/drug.detail.module.js`
  * It may be a good idea to rename these top level modules as drug.detail.module.js since they contain routes etc.
  * I don't necessary agree with splitting everything into .config.js, .module.js, .routes.js - but it does make sense as the central .module.js gets large with routes, runtime, .run() blocks.
  * This is papas Y127 https://github.com/johnpapa/angularjs-styleguide#style-y127

* I definitel want to do Y165 and really cross-cut concerns so we don't have every module loading `['ui.router','ui.bootstrap'] etc. etc.
    * https://github.com/johnpapa/angularjs-styleguide#style-y165 && https://github.com/johnpapa/ng-patterns-testing/tree/master/src/client/app
    * Envision for our purposes:
    * angular.module('app.main', ['app.common','drug','druggroup','portfolio','company'] etc.
        *  angular.module('app.common', ['app.core','app.ui','app.utils','app.messaging'];
        *  angular.module('app.core', ['ui.router','ngAnimate','ngSanitize','ngRaven']);
        *  angular.module('app.ui', ['ui.select','ui.bootstrap','ui.utils']);
        *  angular.module('app...',[...]);
        *  angular.module('portfolio',['app.core','portfolio.detail','portfolio.manager']);
        *  angular.module('portfolio',['portfolio.detail','portfolio.manager']);
        *  angular.module('portfolio.manager',['portfolio.manager.services','portfolio.manager.directives']);
        *  angular.module('portfolio.manager.services',['portfolio.manager.services','restangular']);
        *  etc.

        **Let me know if I am missing anything here.**
* There are some semi-common modules right now shared between states that need to be retooled into some sort of `feature_name.common`:
        * /app/rxscore/*.js - many directives unused.
        * /app/rxsignal/*.js - many directives unused.

