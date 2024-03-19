const { Builder, By, Key, until } = require("selenium-webdriver");
const LoginPage = require("../page/login");
const Contacts = require("../api/contacts");
const { expect, assert } = require("chai");
const Random = require("../helper/random");
const should = require("chai").should();

const env = process.env.NODE_ENV;
require("dotenv").config({ path: `./ENV/${env}.env` });

describe("Contacts API tests", function () {
  const random = new Random();
  let contactID;
  const contact = new Contacts();
  this.timeout(30000);
  const email = random.getRandomEmail();
  beforeEach(async function () {
    const cont = {
      firstName: random.getRandomName(),
      lastName: random.getRandomName(),
      identifiers: [
        {
          type: "email",
          channels: {
            email: {
              status: "subscribed",
            },
          },
          id: email,
        },
      ],
      customProperties: {
        string: "wwwwwwww",
        number: 123.12,
        integer: 1234,
        boolean: false,
        array: ["labai gerai", "dar geriau"],
      },
    };
    const response = await contact.create(cont);
    contactID = response.data.contactID;
  });
  afterEach(async function () {});

  it("Should able to create contact", async function () {
    const cont = {
      firstName: "Firstname",
      lastName: "Lastname",
      identifiers: [
        {
          type: "email",
          channels: {
            email: {
              status: "subscribed",
            },
          },
          id: "dhgfgh@gmail.com",
        },
      ],
    };
    const response = await contact.create(cont);
    //expect
    expect(response.data.email).to.be.equal("dhgfgh@gmail.com");
    expect(response.data).to.have.property("contactID");
    expect(response.data).to.have.not.property("password");
    expect(response.data.contactID).to.lengthOf(24);
    //assert
    assert.typeOf(response.data.contactID, "string");
    assert.lengthOf(response.data.contactID, 24);
    //should
    response.data.contactID.should.be.a("string");
  });

  it("Should able to get created contact", async function () {
    const response = await contact.get(contactID);
    //console.log(JSON.stringify(response.data));

    expect(response.data.customProperties.number).to.be.equal(123.12);
    expect(response.data.customProperties.number).to.approximately(124, 0.88);
    expect(response.data.customProperties.boolean).to.be.a("boolean");
    expect(response.data.customProperties.array).to.length(2);
    expect(response.data.customProperties.array).to.contain("labai gerai");
    expect(response.data.email).to.equal(email);
  });

  it("Should able to update contact", async function () {
    const cont = {
      firstName: "Updated",
      lastName: "Lastname",
      identifiers: [
        {
          type: "email",
          channels: {
            email: {
              status: "subscribed",
            },
          },
          id: email,
        },
      ],
    };
    const response = await contact.update(contactID, cont);
    expect(response.status).to.equal(200);
    expect(response.data.email).to.equal(email);
  });
});
