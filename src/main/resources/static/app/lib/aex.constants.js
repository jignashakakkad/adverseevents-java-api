/**
 * Created by cerdman on 12/18/14.
 */
angular
    .module('aex.constants', []);
angular
    .module('aex.constants')
    .constant('METADATA',{
        'MAX_FAERS_DT': '20140630',
        'SORT_FAERS_QTR': 'x2q2'
    })
    .constant('SERVER_SETTINGS',{

        // Base URL for API requests
        "BASE_URL" : "http://www.adverseevents.com/",

        // Separate Base URL for Intermediate RxScore Requests
        "RXSCORE_URL": "http://www.adverseevents.com/",

        // Dev Base URL used in portfolio detail
        "DEV_URL": "http://dev.adverseevents.io/",

        "DEBUG_LOGGER" : false, // Pops toasts helpful for debugging loading / state changes/finding multiple state fires.
      //  "DEBUG_LOGGER" : false, // Quiet.
     //   "SEARCH_BASE_URL" : "http://www.adverseevents.com/" // for production

        "LEAVE_ME_HERE":true // so can always add stuff above with trailing commas and be ok if we comment out improperly
    });
