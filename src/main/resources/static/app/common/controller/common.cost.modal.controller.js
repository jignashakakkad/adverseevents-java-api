(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name common.controllers:ModalDemoCtrl
     * @requires $scope
     * @requires $modal
     * @requires $log
     * @description 
     * When called, It contains a method which opens myModalContent.html(Inline Template)
     * to the dialoug box (Popup Panel).
     */
    angular.module('common.controllers').controller('ModalDemoCtrl', function ($scope, $modal, $log) {
        /**
         * @ngdoc method
         * @name common.controllers:ModalDemoCtrl#open
         * @param {size} Size of a modal
         * @methodOf common.controllers:ModalDemoCtrl
         * @description
         * A method which opens myModalContent.html(Inline Template)
         * to the dialoug box (Popup Panel).
         */
        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                windowClass: 'app-modal-window',
//                resolve: {
//                    items: function () {
//                        return $scope.items;
//                    }
//                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };
    });

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

    /**
     * @ngdoc controller
     * @name common.controllers:ModalInstanceCtrl
     * @requires $scope
     * @requires $modalInstance
     * @description When called, It just contains the method for close the modal window.
     */
    angular.module('common.controllers').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
        /**
         * @ngdoc method
         * @name common.controllers:ModalInstanceCtrl#cancel
         * @methodOf common.controllers:ModalInstanceCtrl
         * @description
         * A method the method for close the modal window.
         */
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

})();
