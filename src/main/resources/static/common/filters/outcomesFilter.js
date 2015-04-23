angular.module('AdverseEventsExplorer.main').filter('outcomesFilter', function() {
    return function(input, arg) {
        switch (input) {
            case 'HO':
                return 'Hospitalization';
            case 'Hospitalization - Initial or Prolonged':
                return 'Hospitalization';
            case 'DE':
                return 'Death';
            case 'RI':
                return 'Required Intervention';
            case 'Required Intervention to Prevent Permanent Impairment/Damage':
                return 'Required Intervention';
            case 'LT':
                return 'Life Threatening';
            case 'OT':
                return 'Other serious';
            case 'Other':
                return 'Other serious';
            case 'DS':
                return 'Disability';
            case 'CA':
                return 'Congenital Anomaly';
            case 'NS':
                return 'Not Stated';
            case 'Total':
                return 'Total';
            default:
                return input;
        }
    }
});
