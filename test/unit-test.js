const { Builder, By, Key, until } = require("selenium-webdriver");
const LoginPage = require("../page/login");
const IssuePage = require("../page/issue");
const { expect } = require("chai");
const Random = require("../helper/random");

const env = process.env.NODE_ENV;
console.log(env);
require("dotenv").config({ path: `./ENV/${env}.env` });

describe("Test random helper", function () {
  const random = new Random();

  beforeEach(async function () {});

  afterEach(async function () {});

  it("getRandomString(5, 'qwertyuiop') should return random string length=5", async function () {
    const result = random.getRandomString(5, "qwertyuiop");
    expect(result).to.be.lengthOf(5);
  });
  it("getRandomString(100, 'qqqqqqqqqqqqqqqqqqqqpqwertyuiopqwertyuiopqwertyuiop') should contains q", async function () {
    const result = random.getRandomString(
      5,
      "qqqqqqqqqqqqqqqqqqqqqqqqqqpqwertyuiopqwertyuiopqwertyuiop"
    );
    expect(result).to.be.contain("q");
  });
  it("getRandomEmail() should return string which contains @", async function () {
    const result = random.getRandomEmail();
    expect(result).to.be.contain("@");
  });
});
