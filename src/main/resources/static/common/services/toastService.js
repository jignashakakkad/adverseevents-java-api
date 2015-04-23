angular.module('toast.services', ['ngToast'])

    .factory('toastPopup', function (ngToast) {
        var Service = {};
        var toast;
        /**
         *
         * @param {object} contentObj
         * @returns {*}
         */

        Service.log = function (contentObj) {
            toast = ngToast.create({content: contentObj.content,'class': contentObj['class']});
            return toast;
        };
        Service.loginError = function (errorMsg) {
            ngToast.create({
                timeout: 5500,
                max: 1,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                    content: errorMsg,
                    'class': 'danger'
                });
        };
        Service.loginSuccess = function (User) {
            ngToast.create({
                timeout: 15500,
                max: 1,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                content: 'Logging in User : '+User.username,
                'class': 'success'
            });
        };
        Service.showToast = function (msg) {
            ngToast
                .create({
                    content: msg,
                    'class': 'toast-warning',
                    dismissOnTimeout: false,
                    dismissButton: false,
                    timeout: 10000
                });
        };
        Service.showNoDataToast = function (msg) {
            ngToast
                .create({
                    content: msg,
                    'class': 'toast-warning',
                    dismissOnTimeout: true,
                    dismissButton: false,
                    timeout: 5000
                });
        };

        return Service;
    });
