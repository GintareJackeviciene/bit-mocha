const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

const env = process.env.NODE_ENV

const config = require(`../config.${env}.json`)

class LoginPage {

    constructor(driver) {
        this.driver = driver;
        this.url = config.baseUrl;
        this.userNameField = "//*[@id='field-login-login']";
        this.passwordField = "//*[@id='field-login-password']";
        this.submitButton ="//*[@id='field-login-loginSubmit']";
    }
    async open() {
        await this.driver.get(this.url)
        await this.driver.manage().window().setRect({ width: 1050, height: 708 })
    }
    async enterUserName(userName) {
        await this.driver.findElement(By.xpath(this.userNameField)).sendKeys(userName)
    }
    async enterPassword(password) {
        await this.driver.findElement(By.xpath(this.passwordField)).sendKeys(password)
    }
    async pressLogin() {
        await this.driver.findElement(By.xpath(this.submitButton)).click()
    }

    async loginWithUser(userName, password) {
        await this.enterUserName(userName)
        await this.enterPassword(password)
        await this.pressLogin()
    }

    async assertAdministrationPanelTextIsVisible() {
        assert(await this.driver
            .findElement(By.xpath("//a[text()='Administration Panel']"))
            .getText() == "Administration Panel")
    }
}
module.exports = LoginPage;