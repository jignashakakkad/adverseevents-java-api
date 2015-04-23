AEX Testing Guidelines
==================



Overview
-----



We use Jasmine for **all** specs:

 - Unit tests are must use Karma:
   - Setup: http://karma-runner.github.io/0.12/intro/installation.html
 - E2E tests are must use Protractor
   - Setup: http://angular.github.io/protractor/#/
   - Tutorial to be read before: http://ramonvictor.github.io/protractor/slides/#/
Protractor needs to work in two environments:

 * Against a live remote staging server (*.adverseevents.com/explorer/#/)
 * Against localhost (http://localhost:9xxx/#/)


Spec naming conventions
---
| Test type | Sub Type                      | File name                                | Example                                                                                                                                                              | Notes                                                                                                                         |
|-----------|-------------------------------|------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| E2E       | UI or Smoke test              | component-name-ui.e2e.js                 | Check that there are 6 tabs in Drug page                                                                                                                             | Meant to be quick "smoke" tests of functionality.                                                                             |
| E2E       | Complex functional test suite | component-name-presentation-logic.e2e.js | Check that drug page for withdrawn drug X shows "withdrawn" in the header. Check that non-withdrawn drug Y DOES not show withdrawn drug in the header.               | Typically nested describes to workout various examples eg: Ambien vs. Tysabri vs. Vioxx                                       |
| E2E       | Data QA (complex or not)      | component-name-data-qa.e2e.js            | Check that Drug X has RxScore of xx.xx; Check that Company Y has Drug X present in it's active signal list, and that the total signals matches Drug X RxSignal page. | Mostly used for Data QA between components. I.e. match values between Company and Drug pages where values should be the same. |
| Unit      | all                           | <filename>.spec.js                       | druggroup.services.spec.js                                                                                                                                           | ** MUST BE IN SAME LOCATION IN** app/.. as the actual component.js file.                                                          |

Folder organization
---

```
AexNav/
  |-- app/
  |-- druggroup/
  | |--  |-- druggroup.js        // COMPONENT
  | |--  |-- druggroup.spec.js   // UNIT TEST(S)
  | |--  |-- service/
  | |    |--   |-- druggroup.services.js      //COMPONENT
  | |    |--   |-- druggroup.services.spec.js    //UNIT TEST(S)
  …    …
  |-- tests/
    |-- unit/
    |-- e2e/
    |    |-- drug/
    |    |     |-- homepage.po.js
    |    |     |-- *.spec.js
    |    |-- portfolio/
    |    |     |-- portfolio.po.js
    |    |     |-- *.e2e.js
    |    |-- protractor.conf.js
    |    |-- protractor-*.conf.js   // Custom config files; Avoid these at all costs to stay DRY;
```

Setup and running the tests:
----

1. Setup: `npm install -g protractor`, `npm install -g selenium-server`, `webdriver-manager update`
2. Above should have been done at time of `npm install`
3. Running tests:

       ```
       #for local run only the smoke tests suite
       protractor tests/e2e/protractor.conf.js --baseurl http://localhost:9001  --suite smoke

       #for local run only the portfolio tests suite
       protractor tests/e2e/protractor.conf.js --baseurl http://localhost:9001  --suite portfolio

       #full remote test (will auto login to site using params)
       protractor tests/e2e/protractor.conf.js --baseurl http://adverseevents.com --param-username colin.erdman@gmail.com --param-password foobar

       #running unit tests
       karma tests/karma.conf.js




       ```
