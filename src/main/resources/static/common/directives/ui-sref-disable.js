angular.module('AdverseEventsExplorer.main').directive('uiSrefDisable', ['$parse', '$rootScope', 'toastPopup',
  function($parse, $rootScope, toastPopup) {
    return {
      // this ensure uiSrefDisable be compiled before ngClick
      priority: 100,
      restrict: 'A',
      compile: function($element, attr) {
        var fn = $parse(attr.uiSrefDisable);
        return {
          pre: function link(scope, element) {
            var eventName = 'click';
            element.on(eventName, function(event) {
              var callback = function() {
                if (fn(scope, {$event: event})) {

                    toastPopup.showNoDataToast("<span class='toasty-text'>Not enough current data for selected analytic</span>");

                    // prevents ng-click to be executed
                    event.stopImmediatePropagation();
                    // prevents href
                    event.preventDefault();
                    return false;
                }
              };
              if ($rootScope.$$phase) {
                scope.$evalAsync(callback);
              } else {
                scope.$apply(callback);
              }
            });
          },
          post: function() {}
        }
      }
    }
  }
]);
