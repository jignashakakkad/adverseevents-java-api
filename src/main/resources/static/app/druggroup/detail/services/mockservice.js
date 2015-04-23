(function() {
    var myAppDev = angular.module('druggroup.detail');
    myAppDev.run(function($httpBackend, $stateParams, $resource) {


        var news = [{"product_drugname":"Alphagan P","aedrug_id":"467","event_dt":"2013-04-25","typeweight":"0","alert_type":"FDA Approves Alcon's Simbrinza for Treatment of Glaucoma and Intraocular Hypertension","alert_url":"http:\/\/www.adverseevents.com\/explorer\/#\/drugs\/detail\/467\/monitor?article=3280","event_type":"Drug Safety Monitor Analysis"},
            {"product_drugname":"Azasite","aedrug_id":"868","event_dt":"2013-03-12","typeweight":"1","alert_type":"Drug Safety Communication","alert_url":"http:\/\/www.fda.gov\/Drugs\/DrugSafety\/ucm341822.htm","event_type":"FDA Regulatory Action"},
            {"product_drugname":"Azasite","aedrug_id":"868","event_dt":"2012-07-01","typeweight":"7","alert_type":"Safety Labeling Changes","alert_url":"http:\/\/www.fda.gov\/safety\/medwatch\/safetyinformation\/ucm250654.htm","event_type":"FDA Regulatory Action"},
            {"product_drugname":"Bepreve","aedrug_id":"5907","event_dt":"2012-06-01","typeweight":"7","alert_type":"Safety Labeling Changes","alert_url":"http:\/\/www.fda.gov\/Safety\/MedWatch\/SafetyInformation\/ucm310746.htm","event_type":"FDA Regulatory Action"},
            {"product_drugname":"Durezol","aedrug_id":"5974","event_dt":"2011-12-29","typeweight":"0","alert_type":"FDA Warns of Confusion Between Durezol and Durasal ","alert_url":"http:\/\/www.adverseevents.com\/explorer\/#\/drugs\/detail\/5974\/monitor?article=472","event_type":"Drug Safety Monitor Analysis"},
            {"product_drugname":"Azasite","aedrug_id":"868","event_dt":"2011-03-01","typeweight":"7","alert_type":"Safety Labeling Changes","alert_url":"http:\/\/www.fda.gov\/safety\/medwatch\/safetyinformation\/ucm250654.htm","event_type":"FDA Regulatory Action"}];

        //$httpBackend.whenGET(/http:\/\/www\.adverseevents\.com\/api\/(indication|drugclass)\/[A-Za-z0-9.-]+\/news/).respond(news);//SJ

        var rxscoreData = [{"product_drugname":"Azasite","aedrug_id":868,"aedrug_brandname":"AZASITE","class_indication":"Bacterial Conjunctivitis","class_drugclass":"S01AA","class_drugclass_label":"Antibiotics","metric_rxscore":38,"metric_pscount":736,"metric_indication_rank":3,"metric_indication_rank_size":6,"metric_drugclass_rank":4,"metric_drugclass_rank_size":10,"dt_approval":"2007-04-27"},
            {"product_drugname":"Alphagan P","aedrug_id":467,"aedrug_brandname":"ALPHAGAN P","class_indication":"Ocular Hypertension","class_drugclass":"S01EA","class_drugclass_label":"Sympathomimetics in glaucoma therapy","metric_rxscore":36.8,"metric_pscount":345,"metric_indication_rank":3,"metric_indication_rank_size":11,"metric_drugclass_rank":2,"metric_drugclass_rank_size":4,"dt_approval":"2001-03-16"},
            {"product_drugname":"Bepreve","aedrug_id":5907,"aedrug_brandname":"BEPREVE","class_indication":"Allergic Conjunctivitis","class_drugclass":"D04AA","class_drugclass_label":"Antihistamines for topical use","metric_rxscore":28.1,"metric_pscount":68,"metric_indication_rank":1,"metric_indication_rank_size":3,"metric_drugclass_rank":1,"metric_drugclass_rank_size":1,"dt_approval":"2009-09-08"}];

        $httpBackend.whenGET(/http:\/\/www\.adverseevents\.com\/api\/(indication|drugclass)\/[A-Za-z0-9.-]+\/rxscore/).respond(rxscoreData);

        var adEventData = [
       { 'aedrug_id': 849,'aedrug_label': 'Avonex','termCode_id': 100051,'termCode_label': 'Abasia','metric_value': 0.00369301},
       { 'aedrug_id': 849,'aedrug_label': 'Avonex','termCode_id': 100051,'termCode_label': 'Abasia','metric_value': 0.00669301},
       { 'aedrug_id': 849,'aedrug_label': 'Avonex','termCode_id': 100052,'termCode_label': 'Anaphylactic Reaction','metric_value': 0.00011123},
       { 'aedrug_id': 849,'aedrug_label': 'Avonex','termCode_id': 100053,'termCode_label': 'Anaphylactic Shock','metric_value': 0.00017123},
       { 'aedrug_id': 849,'aedrug_label': 'Avonex','termCode_id': 100054,'termCode_label': 'Aphagia','metric_value': 0.00416123},
       { 'aedrug_id': 849,'aedrug_label': 'Avonex','termCode_id': 100055,'termCode_label': 'Basal Cell Carcinoma','metric_value': 0.00210123},

       { 'aedrug_id': 4085,'aedrug_label': 'Tysabri','termCode_id': 100051,'termCode_label': 'Abasia','metric_value': 0.00369301},
       { 'aedrug_id': 4085,'aedrug_label': 'Tysabri','termCode_id': 100052,'termCode_label': 'Anaphylactic Reaction','metric_value': 0.00011123},
       { 'aedrug_id': 4085,'aedrug_label': 'Tysabri','termCode_id': 100053,'termCode_label': 'Anaphylactic Shock','metric_value': 0.00017123},
       { 'aedrug_id': 4085,'aedrug_label': 'Tysabri','termCode_id': 100054,'termCode_label': 'Aphagia','metric_value': 0.00416123},
       { 'aedrug_id': 4085,'aedrug_label': 'Tysabri','termCode_id': 100055,'termCode_label': 'Basal Cell Carcinoma','metric_value': 0.00210123},

       { 'aedrug_id': 2285,'aedrug_label': 'Tecfidera','termCode_id': 100051,'termCode_label': 'Abasia','metric_value': 0.00369301},
       { 'aedrug_id': 2285,'aedrug_label': 'Tecfidera','termCode_id': 100052,'termCode_label': 'Anaphylactic Reaction','metric_value': 0.00011123},
       { 'aedrug_id': 2285,'aedrug_label': 'Tecfidera','termCode_id': 100053,'termCode_label': 'Anaphylactic Shock','metric_value': 0.00017123},
       { 'aedrug_id': 2285,'aedrug_label': 'Tecfidera','termCode_id': 100054,'termCode_label': 'Aphagia','metric_value': 0.00416123},
       { 'aedrug_id': 2285,'aedrug_label': 'Tecfidera','termCode_id': 100055,'termCode_label': 'Basal Cell Carcinoma','metric_value': 0.00210123},
      ];

        $httpBackend.whenGET(/http:\/\/www\.adverseevents\.com\/api\/(indication|drugclass)\/[A-Za-z0-9.-]+\/drug-eventss/).respond(adEventData);

        $httpBackend.whenGET(/http:\/\/www\.adverseevents\.com\/api\/(indication|drugclass)\/[A-Za-z0-9.-]+\/timeline/).respond(
            $resource('app/druggroup/detail/services/mockOverviewChartData.json').query()
        );
        $httpBackend.whenGET(/http:\/\/portfolio-2\.dev\.adverseevents\.com\/api\/(indication|drugclass)\/[A-Za-z0-9.-]+\/timeline/).respond(
            $resource('app/druggroup/detail/services/mockOverviewChartData.json').query()
        );
        $httpBackend.whenGET(/app/).passThrough();
        $httpBackend.whenPOST(/api/).passThrough();
        $httpBackend.whenGET(/lev/).passThrough();
        $httpBackend.whenGET(/api/).passThrough();
    });
})();
