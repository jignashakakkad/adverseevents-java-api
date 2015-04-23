Update 2015-03-16
====================
* Make sure you run the following:

```
npm install jasmine@2.1.1
npm install jasmine-reporters@~0.2

```

Universal Protractor testing
=====================

Handles saucelabs, localhost, and remote / production servers.

**Setup for straight localhost testing (non sauce)**

```
npm install -g webdriver-manager && npm install -g protractor@~1.7

# for osx config -- should work same on ubuntu etc.

webdriver-manager update --standalone --out_dir /usr/local/lib/node_modules/protractor/selenium

```

**Running with 1 config file**

```
  # Running on local host (assuming you have grunt --serve --force running in another terminal)
  # the / after the end is super important!
  protractor tests/e2e/protractor.local.js --baseUrl http://localhost:9001/ --suite smoke


  # Running against production, staging server, etc.
  protractor tests/e2e/protractor.local.js --baseUrl http://www.adverseevents.com/explorer/ --suite smoke



  # Running against Saucelabs CI -- must NOT BE localhost baseUrl (ngrok, or have sauceconnect running) - etc.
  protractor tests/e2e/protractor.local.js --baseUrl http://www.adverseevents.com/explorer/ --suite smoke

```

If you have a spec broken - you probably need to make the browser.get(..) fn work like: browser.get('#/drugs/...') etc

  **The prefix of /explorer/# or even /#/ will break it!**
