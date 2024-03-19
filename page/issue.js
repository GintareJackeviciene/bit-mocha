const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')


const env = process.env.NODE_ENV
console.log(env)
const config = require(`../config.${env}.json`)

class IssuePage {

    constructor(driver) {
        this.driver = driver;
        this.url = `${config.baseUrl}/client/index.php?folder=1`;
        this.addissueButton = "//*[text()='Add Issue']";
        this.issueNameField = "//*[@id='field-issues-issueName']";
        this.issueDescriptionField = "//*[@id='field-issues-descriptionText']";
        this.createIssueButton = "//*[@id='field-issues-okSubmit']";
        this.issueTitles = "//h2";
        this.addDeleteButton = "//*[text()='Delete Issue']";

    }
    async open() {
        await this.driver.get(this.url);
        await this.driver.manage().window().setRect({ width: 1050, height: 708 });
    }
    async pressAddIssueButton() {
        await this.driver.findElement(By.xpath(this.addissueButton)).click();
    }
    async pressDeleteIssueButton() {
        await this.driver.findElement(By.xpath(this.addDeleteButton)).click();
    }
    async enterIssueName(name) {
        await this.driver.findElement(By.xpath(this.issueNameField)).sendKeys(name);
    }
    async enterIssueDescription(description) {
        await this.driver.findElement(By.xpath(this.issueDescriptionField)).sendKeys(description);
    }
    async pressCreateButton() {
        await this.driver.findElement(By.xpath(this.createIssueButton)).click()
    }
    async assertCreatedIssueTitleIsVisible(title) {
        const titles = await this.driver.findElements(By.xpath(this.issueTitles))
        //console.log('titles ===', titles.length);
        assert(await(titles[2].getText()) == title);
    }

}
module.exports = IssuePage;