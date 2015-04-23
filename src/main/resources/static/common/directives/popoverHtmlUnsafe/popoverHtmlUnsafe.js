angular.module('rxsignal')
    .directive('popoverHtmlUnsafePopup', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                title: '@', content: '@', placement: '@', animation: '&', isOpen: '&'
            },
            templateUrl: 'common/directives/popoverHtmlUnsafe/popoverHtmlUnsafe.html'
        };
    })
    .directive("popoverHtmlUnsafe", [ "$tooltip", function ($tooltip) {
        return $tooltip("popoverHtmlUnsafe", "popover", "click");
    }]);