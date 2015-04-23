angular.module('AdverseEventsExplorer.main').factory('toastService', function (ngToast) {
    return {
        showToast: showToast,
        showError: showError,
        showPortfolio: showPortfolioExposure,
        showLogin: showInYourFace
    };

    function showToast(m) {
        ngToast.create(m);
    }

    function showError(errorMsg) {
        showToast({content: 'An error occurred: ' + errorMsg, 'class': 'error'});
        //could handle also below sending our errors to Sentry etc. in 1 fell swoop
    }

    /**
     * @ngdoc
     * @param errorMsg
     */
    function showInYourFace(errorMsg){
        showToast({content: errorMsg, 'class':'error', horizontalPosition:'center', verticalPosition:'top'});
    }

    /**
     *
     * @param type - give the type of the page coming, i.e. company, drug.
     */
    function showPortfolioExposure(type) {
        showToast({content: 'This ' + type + ' is in one of your portfolios.', 'class': 'info'});
    }



});


