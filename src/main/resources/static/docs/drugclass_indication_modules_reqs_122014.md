v1.0.5 - rev. 12-03-14
======
**Drug Class / Indications Project**
======
----

**Changes**
1.0.05 12/03/14 - added API endpoints for drugclass.

**Executive Summary**

Current versions of the reports presenting our data AGGREGATED BY "drug_class" or "drug_indication" are outdated and based on legacy server-side PHP files. Our goals are three-fold: First, implement an AngularJS version of ea. report; Second, enhance existing data features and functionality using previously available data; Third, implement novel reporting features by leveraging new data sources and data-summary methodologies.

**Requirements**

* CORE-1
  * Stabilize the existing unstable `indications` module. by creating `indication.detail.*` reports.
  * Stabilize the existing unstable `drugclass` module. by creating `drugclass.detail.*` reports. Should implement a file and application structure similar to `company.detail.*` and/or `drug.detail.*`
  * Generate a `drugclass.service` and `indication.service` module for handling webservice requests.
* CORE-2
  * Implement service based architecure for all new tabs, data, and ancillary functions (See func. specs). 
  * Maintainability Metrics Required: 1 unit test per controller or service, per method.
  * End-to-end testing for ea. `indication.detail`, `drugclass.detail.*`

* NEW-TABS-1
  * New backend api endpoint: `/api/drugclass/:drugclassid/outcomes-pivot`, `/api/drugclass/:drugclassid/adverse-events` 
  * Represents a significant volume of work to be done for Features: outcomes-tab, adverse-events tabs.
  * Requires custom map/reduce pivot table function to transform index/columnar data to pivot-table.



System Architecture
----
----

***API / Data consumption***


All data will be provided to the client via web services in JSON specific format.

`Restangular` should be used within a service-oriented arch. / adapter pattern (see `app/company/service/company.services.js::companyService` for a semi-production grade implementation). 

There is existing service infrastructure at `/inc/service.rxscore.atc.v2.php?` etc. as well as `/lev/api/drugclass/:id*` Will document methods more appropriately.

**Client view / angularjs module**

_Example is for drug class, but indication MVC is 99% identical. as data is produced / provided in exactly the same manner_

Sample Existing file structure is below, and should be utilized for consistency:

 * /app/indication
 * /app/drugclass/drugclass*list.* - Currently used in production to provide #/drugclass/ list index.
 * /app/drugclass/drugclass.js - Primary `drugclass` module to be injected as a dep. to `AdverseEventsExplorer.main`.
 * /app/drugclass/drugclass.detail.js - Controller. Deprecated/unstable. Probably replace with drugclass-controllers.js.
 * /app/drugclass/drugcl 
 * /app/drugclass/drugclass.detail.* - Primary reporting files (both controllers and views)




Feature: Overview Tab
---

Data source TBD. Endpoint will be: `api/drugclass/:drugclass_id/overview`

Will return a simple json array-of-objects type collection that will present as below:



| Product Name | Serious Outcomes Rate | Hospitalization | IME Serious Incidence | DME Serious Incidence |
|--------------|-----------------------|-----------------|-----------------------|-----------------------|
| Ampyra       | 1.50%                 | 0.95%           |                       |                       |
| Avonex       | 6.50%                 | 5.66%           |                       |                       |
| Betaseron    | 2.27%                 | 1.52%           |                       |                       |
| Copaxone     | 0.42%                 | 0.32%           |                       |                       |
| Gilenya      | 3.26%                 | 2.48%           |                       |                       |
| Rebif        | 9.08%                 | 7.57%           |                       |                       |
| Tecfidera    | 2.68%                 | 2.52%           |                       |                       |
| Tysabri      | 14.57%                | 12.50%          |                       |                       |




Feature: Monitor Tab
---
Should utilize existing standard functionality found in drugs.detail.monitor or company.detail.news. 
See for example:
`/lev/api/drugclass/A01AB/dsm`

```


Example Table Not Neede.



```


Feature: Adverse Events (AE) Tab
---
This represents the summarization of all event metrics (metric here = incidence rate (float)) for all drugs belonging to the `parent_entity` (drugclass, or drug_indication). Essentially this would come from the following pseudo SQL statement.

```
SELECT t.aedrug_id
  , t.aedrug_name
  , t.event_name
  , t.event_code
  , AVG(t.metric_incidence_value) as metric_value
FROM drug_adverse_event_metrics_table t
INNER JOIN parent_entity_table drugclass
  ON drugclass.aedrug_id = t.aedrug_id
WHERE drugclass.termCode = :drugclass_param_id
GROUP BY t.aedrug_id, t.aedrug_name, t.event_code, t.event_name
ORDER BY metric_value DESC LIMIT 100;

```

_*Will require a custom map/reduce*_ function on client side as unfortunately mysql does not support SQL standard aggregate operators that would be nice here like PARTIITION BY and OVER. Data will come in in index format such as the below snippet. As such, will need to create a utility pivot-table function for this. **Highly** recommend an existing, tested solution we already require such as `d3.js` (`d3.nest()`) or `crossfilter`, etc.
 

```
[{ 'aedrug_id': 1,
   'aedrug_label': 'Avonex', 
   'termCode_id': 100051, 
   'termCode_label': 'Abasia', 
   'metric_value': 0.00369301},
   {…},…{…}]

```
** Data table as user will see **

| (event)                        | Avonex  | Tysabri | Tecfidera | Gilenya | Copaxone |
|--------------------------------|---------|---------|-----------|---------|----------|
| Abasia                         | 0.3693% | 1.1430% | 0.2253%   | 0.0953% | 0.0148%  |
| Anaphylactic Reaction          | 0.0111% | 0.1174% | 0.0507%   | 0.0077% | 0.0192%  |
| Anaphylactic Shock             | 0.0177% | 0.1255% | 0.0081%   | 0.0000% | 0.0150%  |
| Aphagia                        | 0.0416% | 0.1498% | 0.2740%   | 0.0283% | 0.0000%  |
| Basal Cell Carcinoma           | 0.0210% | 0.0729% | 0.0000%   | 0.1044% | 0.0000%  |
| Breast Cancer                  | 0.2830% | 0.3036% | 0.0284%   | 0.0831% | 0.0140%  |
| Cellulitis                     | 0.1032% | 0.3386% | 0.0670%   | 0.0696% | 0.0050%  |
| Cerebrovascular Accident       | 0.2749% | 0.2037% | 0.0467%   | 0.0670% | 0.0065%  |
| Convulsion                     | 0.3479% | 0.9039% | 0.1908%   | 0.3337% | 0.0374%  |
| Demyelination                  | 0.0000% | 0.0243% | 0.0000%   | 0.0277% | 0.0190%  |
| Diabetes Melitus               | 0.1725% | 0.2698% | 0.0487%   | 0.0226% | 0.0031%  |
| Electrocardiogram QT Prolonged | 0.0000% | 0.0000% | 0.0000%   | 0.1282% | 0.0000%  |
| Haeametesis                    | 0.0092% | 0.0108% | 0.0812%   | 0.0077% | 0.0000%  |
| Haemmorhage                    | 0.1894% | 0.1012% | 0.0284%   | 0.0432% | 0.0042%  |
| Hemiparesis                    | 0.1135% | 0.5599% | 0.0548%   | 0.1385% | 0.0019%  |
| Immune Reconstitution          | 0.0000% | 0.6462% | 0.0000%   | 0.0234% | 0.0000%  |
| Injection Site Necrosis        | 0.0064% | 0.0000% | 0.0000%   | 0.0000% | 0.0224%  |
| Leukopenia                     | 0.0044% | 0.0104% | 0.0000%   | 0.1172% | 0.0017%  |
| Loss of Conciousness           | 0.1640% | 0.4385% | 0.1218%   | 0.2242% | 0.0311%  |
| Loss of Control of Legs        | 0.2005% | 0.7461% | 0.1319%   | 0.0058% | 0.0016%  |
| Macular Oedema                 | 0.0000% | 0.0108% | 0.0000%   | 0.3691% | 0.0000%  |
| Mental Impairment              | 0.1242% | 0.7596% | 0.0893%   | 0.0226% | 0.0000%  |
| Myocardial Infarction          | 0.2945% | 0.1619% | 0.0893%   | 0.1121% | 0.0113%  |
| Optic Neuritis                 | 0.1695% | 0.4789% | 0.0994%   | 0.1662% | 0.0098%  |
| PML                            | 0.0060% | 1.3060% | 0.0000%   | 0.0319% | 0.0000%  |
| Pneumonia                      | 0.3884% | 1.4070% | 0.1258%   | 0.1784% | 0.0155%  |
| Road Traffic Accident          | 0.1655% | 0.4493% | 0.0244%   | 0.0702% | 0.0038%  |

***Notes***

* _Use regular \<table/> methods for this._ ngGrid probably not adequate for this use case.
* _Columns_ are sortable.
* _`metric_value`_ is a float decimal. use `{{ metric_value | indicenceFilter}} ` in the view to convert it to pctg.



Feature: RxSignal Summary tab.
---

Should replicate almost identically function and data source of `company.detail.rxsignal-summary` tab.

Representative data sample: `/api/company/9-1/rxsignal-summary`


| Product Name | 2013 Revenue | Number ADEs | Avg ROR | Active RxSignal | Watchlist RxSignal | DME |
|--------------|--------------|-------------|---------|-----------------|--------------------|-----|
| Ampyra       |              | 32          | 1.98    | 13              | 19                 | 1   |
| Avonex       | 1902         | 66          | 2.51    | 40              | 62                 | 16  |
| Betaseron    | 662.9        | 82          | 2.28    | 31              | 50                 | 11  |
| Copaxone     | 3200         | 21          | 2.27    | 9               | 11                 | 4   |
| Gilenya      | 1023         | 42          | 2.09    | 16              | 26                 | 3   |
| Rebif        | 1270         | 90          | 2.41    | 45              | 45                 | 6   |
| Tecfidera    | 864          | 11          | 1.77    | 4               | 7                  | 0   |
| Tysabri      | 701          | 21          | 2.06    | 6               | 15                 | 0   |


Feature: Reporting tab.
---

Should replicate almost identically function and data source of `company.detail.quartely` (maybe .reporting?) tab.

Representative data sample: `/api/company/9-1/quarterly`

| Approval ^v | 2013 Revenue ^v | Last Update | Q1 2012 ^v | Q2 2012 ^v | Q3 2012 ^v | Q4 2012 ^v | Q1 2013 ^v | Q2 2013 ^v | Q3 2013 ^v | Q4 2013 ^v | Q1 2014 |   (sum)    |
|-------------|-----------------|-------------|------------|------------|------------|------------|------------|------------|------------|------------|---------|-------|
| Ampyra      | 1/22/10         | 302.6       | 03-31-YY   | 175        | 216        | 203        | 212        | 266        | 284        | 302        | 272     | 4,679 |
| Avonex      | 5/17/96         | 1,902.00    | 05-12-YY   | 2,318      | 2,286      | 3,065      | 3,043      | 3,204      | 3,540      | 3,212      | 3,549   | 3,562 |
| Betaseron   | 7/23/93         | 662.9       | 5/12/14    | 524        | 489        | 499        | 506        | 572        | 503        | 527        | 430     | 421   |
| Copaxone    | 12/20/96        | 3,200.00    | 5/13/14    | 296        | 419        | 415        | 369        | 454        | 285        | 387        | 388     | 397   |
| Gilenya     | 9/21/10         | 1,023.00    | 5/12/14    | 2,189      | 1,215      | 1,659      | 1,942      | 2,120      | 1,889      | 1,482      | 1,433   | 786   |
| Rebif       | 3/7/02          | 1,270.00    | 5/12/14    | 1,404      | 1,468      | 1,425      | 1,368      | 942        | 2,678      | 1,247      | 1,159   | 1,060 |
| Tecfidera   | 3/27/13         | 864         | 03-31-YY   | 0          | 0          | 0          | 0          | 1          | 149        | 2,530      | 11,344  | 6,098 |
| Tysabri     | 11/23/04        | 701         | 05-13-YY   | 6,659      | 6,756      | 5,425      | 6,353      | 9,392      | 8,302      | 7,798      | 5,516   | 5,532 |

***Notes***

* _Use regular \<table/> methods for this._ ngGrid probably not adequate for this use case.
* _Columns_ are sortable.

Feature: Outcomes (AE) Tab
---
This represents the summarization of all event metrics (*metric here = incidence rate (float) OVER outcome_code*) for all drugs belonging to the `parent_entity` (drugclass, or drug_indication). Essentially this would come from the following pseudo SQL statement.

```
SELECT t.aedrug_id
  , t.aedrug_name
  , t.outc_code
  , AVG(t.metric_incidence_value) as metric_value
FROM drug_patient_outcomes_metrics_table t
INNER JOIN parent_entity_table drugclass
  ON drugclass.aedrug_id = t.aedrug_id
WHERE drugclass.termCode = :drugclass_param_id
GROUP BY t.aedrug_id, t.aedrug_name, t.outc_code
ORDER BY metric_value DESC LIMIT 100;

```

_*Will require a custom map/reduce*_ function on client side as unfortunately mysql does not support SQL standard aggregate operators that would be nice here like PARTIITION BY and OVER. Data will come in in index format such as the below snippet. As such, will need to create a utility pivot-table function for this. **Highly** recommend an existing, tested solution we already require such as `d3.js` (`d3.nest()`) or `crossfilter`, etc.
 

```
[{ 'aedrug_id': 1,
   'aedrug_label': 'Avonex', 
   'outc_cod': 'Hospitalization',
   'metric_value': 0.00369301},
   {…},…{…}]

```
** Data table as user will see **

| Congen Anomaly | Death | Disability | Hospitalization | Life-threatening | Other | Required Int. | Total (All Cases) |   |
|----------------|-------|------------|-----------------|------------------|-------|---------------|-------------------|---|
| Ampyra         | -     | 0.18%      | 0.31%           | 0.95%            | 0.05% | 1.42%         | 0.01%             |   |
| Avonex         | 0.02% | 0.79%      | 0.01%           | 5.66%            | 0.02% | 2.95%         | 0.00%             |   |
| Betaseron      | 0.01% | 0.38%      | 0.26%           | 1.52%            | 0.08% | 3.49%         | 0.01%             |   |
| Copaxone       | 0.01% | 0.05%      | 0.01%           | 0.32%            | 0.02% | 0.57%         | 0.00%             |   |
| Gilenya        | 0.01% | 0.20%      | 0.28%           | 2.48%            | 0.28% | 7.20%         | 0.01%             |   |
| Rebif          | 0.03% | 0.67%      | 0.50%           | 7.57%            | 0.31% | 9.18%         | -                 |   |
| Tecfidera      | -     | 0.11%      | 0.02%           | 2.52%            | 0.02% | 1.16%         | 0.01%             |   |
| Tysabri        | 0.06% | 1.43%      | 0.21%           | 12.50%           | 0.36% | 10.95%        | 0.01%             |   |

***Notes***

* _Use regular \<table/> methods for this._ ngGrid probably not adequate for this use case.
* _Columns_ are sortable.
* _metric_Value_ is a float decimal. use `{{ metric_value | indicenceFilter}} ` in the view to convert it to pctg.


Feature: Rxscore Tab
---

Same as existing (See drug.detail.rxscore tab/code.)


```

More stuff will go below RE: maintainability, testing, deliverables


```

