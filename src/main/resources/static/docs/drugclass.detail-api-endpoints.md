AEX API New Endpoints Documentation (api v1) 
=========
--------
Doc ver. 1.0


**Changes**

12-03 Created. Added drugclass endpoints.

Overview
--------
This doc represents a draft refs/reqs doc for all API endpoints. It will likely be updated daily though 2014 year end.

This doc also represents an RFC, specifically feedback/comments RE: semenatic url structure 
for increasingly complex API architecture are requested.

BASE_URL = __SERVER__ + '/api'

API
-----
**Entity specific: Drugclass**
```
@param:drugclass_id
@type:drugclass_id:string
```
regex for drugclass_ids: '[A-Z]0[0-9][A-V][A-Z]'

| loc             |   feature      | notes |
----------------- |----------------|--------------------|
| ```/drugclass/:id/overview```       | overview tab data|      |
|``` /drugclass/:id/rxsignal-summary``` | rxsignal summary tab data |   |
| ```/drugclass/:id/outcomes```         | overview tab data    |       |
| ```/drugclass/:id/drug-events```      | adv. event tab data | NOT YET IMPLEMENTED        |
| ```/drugclass/:id/reporting```        | reporting tab data  |  possibly `quarterly` instead of `reporting`   |
| ```/drugclass/:id/news```             | monitor tab data    |      |
| ```/drugclass/:id/rxscore```             | rxscore tab data    |  NOT YET IMPLEMENTED    |

**Entity specific: Indications**
```
@param:indication_id
@type:indication_id:string
```
regex for indication_ids: '[N][0-9]{12}'

| loc             |   feature      | notes |
----------------- |----------------|--------------------|
| ```/indication/:id/overview```       | overview tab data|   NOT YET IMPLEMENTED   |
|``` /indication/:id/rxsignal-summary``` | rxsignal summary tab data | NOT YET IMPLEMENTED  |
| ```/indication/:id/outcomes```         | overview tab data    |   NOT YET IMPLEMENTED    |
| ```/indication/:id/drug-events```      | adv. event tab data | NOT YET IMPLEMENTED        |
| ```/indication/:id/reporting```        | reporting tab data  |  NOT YET IMPLEMENTED   |
| ```/indication/:id/news```             | monitor tab data    |   NOT YET IMPLEMENTED   |
| ```/indication/:id/rxscore```             | rxscore tab data    |  NOT YET IMPLEMENTED    |

