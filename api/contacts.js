const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const { default: axios } = require('axios');
const env = process.env.NODE_ENV;
console.log('env ===', env);
const config = require(`../config.${env}.json`)
require("dotenv").config({ path: `./ENV/${env}.env` });

console.log(process.env.API_KEY)
class Contacts {

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: config.baseApiUrl,
            headers: {
                "X-API-KEY": `${process.env.API_KEY}`,
            },
            validateStatus: function (status) {
                return status < 500;
            },
        });
    }
    async create(payload) {
        return this.axiosInstance.post(`/contacts`, payload);
    };
    async get(id) {
        return this.axiosInstance.get(`/contacts/${id}`);
    };
    async update(id, payload) {
        return this.axiosInstance.patch(`/contacts/${id}`, payload);
    };

}
module.exports = Contacts;