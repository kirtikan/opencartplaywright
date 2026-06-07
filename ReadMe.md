# Project Info
## OpenCart
> Framework Setup Details
1. Install Dependencies as below:
```
npm init playwright@latest
npm install csv-parse
npm install xlsx
npm install -D allure-playwright
npm install @faker-js/faker
npm install -D allure-commandline
```
2. Create folders & 1 test config file:
pages
reports
testdata
utils 
test.config.ts

3. Run Commands 
```
```

4. To view allure report below commands which are already in package.json under script
npx allure generate ./allure-results -o ./allure-report --clean
npx allure open ./allure-report
through package.json below coommand:
npm run allure

5. To clean the allure-results every time before run, install below as
npm install --save-dev rimraf
then under package.json as:
"test": "rimraf allure-results && npx playwright test" --> this will remove allure-results 
 to run then
 npm run test



