angular.module('rxsignal').directive('showHide', function() {
    return {
        link: function (scope, element, attributes, controller) {
            scope.$watch(attributes.showHide, function (v) {
                if (v) {
                    element.show();
                } else {
                    element.hide();
                }
            });
        }
    };
});
