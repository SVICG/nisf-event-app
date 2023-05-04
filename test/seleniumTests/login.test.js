import * as webdriver from 'selenium-webdriver'
import { By } from "selenium-webdriver";
import { assert, expect } from 'chai';

describe("login a user", function () {

    let until;
    let driver;

   it("Should return an error alert", async function () {
   until = webdriver.until

    //launch the browser
    
    driver = await new webdriver.Builder().forBrowser('chrome')
        .build()

    //navigate to application
    await driver.get("http://localhost:3000/")

    //login
    driver.wait(until.elementLocated(By.xpath('//*[@id="reg-btn"]')), 5 * 1000).then(el => {
        el.click();
    });

        //submit with no password
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[1]/input')), 5 * 1000).then(el => {
            el.sendKeys('bademail@gmail.com');
        });

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/button')), 5 * 2000).then(el => {
            el.click();
        });

        driver.sleep(10 * 1000)
        let errorText = await driver.wait(until.elementLocated(By.xpath('//*[@id="alert"]')), 5 * 2000).getText().then(function (value) {
            return value
        })
        expect(errorText).to.equal("Please provide the required information")
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[1]/input')), 5 * 1000).clear();
        driver.sleep(10 * 2000)
    })
    it("Should return an ivalid credentials alert", async function () {
        //submit with wrong email
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[1]/input')), 5 * 1000).then(el => {
            el.sendKeys('bademail@gmail.com');
        });
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[2]/input')), 5 * 2000).then(el => {
            el.sendKeys('secret');
        });

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/button')), 5 * 2000).then(el => {
            el.click();
        });
        driver.sleep(10 * 1000)
        let invalidText = await driver.wait(until.elementLocated(By.xpath('//*[@id="alert"]')), 5 * 2000).getText().then(function (value) {
            return value
        })
        assert.strictEqual(invalidText, "Invalid Credentials")


        driver.sleep(10 * 1000)


    })

    it("Should successfully login a user", async function () {
       
        //input correct email & password
        //Clear fields
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[1]/input')), 5 * 2000).clear();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[1]/input')), 5 * 2000).then(el => {
            el.sendKeys('haslem@gmail.com');
        });

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[2]/input')), 5 * 2000).clear();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[2]/input')), 5 * 2000).then(el => {
            el.sendKeys('secret');
        });

        //submit
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/button')), 5 * 3000).then(el => {
            el.click();
        });
        let validText = await driver.wait(until.elementLocated(By.xpath('//*[@id="alert"]')), 5 * 2000).getText().then(function (value) {
            return value
        })
        expect(validText).to.equal("Great! Logging in...")

    })
});

