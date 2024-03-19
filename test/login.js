
const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../page/login');
const IssuePage = require('../page/issue');


const env = process.env.NODE_ENV;
console.log(env)
require("dotenv").config({path: `./ENV/${env}.env`});

describe('1 should be able to login', function () {
    this.timeout(30000)
    let driver
    let vars
    let loginPage
    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build()
        vars = {}
        loginPage = new LoginPage(driver)
        loginPage.open()
        await loginPage.loginWithUser(process.env.EMAIL, process.env.PASSWORD)

    })
    afterEach(async function () {
        await driver.quit();
    })
    it('1 should be able to login', async function () {
        await loginPage.assertAdministrationPanelTextIsVisible();

    })
    const testData = [
        { name: "Gintares bug", description: "Gintares" },
        { name: "Kitas bug1", description: "Aprašymas1" }
    ];
 
        testData.forEach(({name, description}) =>{
            it(`2 should be able to create issue with name :${name}`, async function () {
                const issuePage = new IssuePage(driver);
                await issuePage.open();
                await issuePage.pressAddIssueButton();
                await issuePage.enterIssueName(name);
                await issuePage.enterIssueDescription(description);
                await issuePage.pressCreateButton();
                await issuePage.assertCreatedIssueTitleIsVisible(name);

               //delete created issue
                await issuePage.pressDeleteIssueButton();
                await issuePage.pressCreateButton();
            })
        })
    })

