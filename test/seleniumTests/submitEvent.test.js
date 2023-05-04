import * as webdriver from 'selenium-webdriver'
import { By } from "selenium-webdriver";
import { Select } from 'selenium-webdriver';
import chai from 'chai';
import { expect } from 'chai';




describe("submit a new event", function () {
    let until;
    let driver;

    it("should navigate to the 'add-event' page", async function () {
        until = webdriver.until
        //launch the browser
        driver = await new webdriver.Builder().forBrowser('chrome')
            .build()
        //navigate to application
        await driver.get("http://localhost:3000/")
        driver.wait(until.elementLocated(By.xpath('//*[@id="reg-btn"]')), 5 * 1000).then(el => {
            el.click();
        });
        //login
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[1]/input')), 5 * 2000).then(el => {
            el.sendKeys('haslem@gmail.com');
        });
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[2]/input')), 5 * 2000).then(el => {
            el.sendKeys('secret');
        });
        //submit login
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/button')), 5 * 3000).then(el => {
            el.click();
        });
        //navigate to add-event page
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/aside[2]/div/div/div/a[3]')), 5 * 3000).then(el => {
            el.click();
        });
        await driver.sleep(5 * 1000)
        let url = await driver.getCurrentUrl();
        expect(url).to.equal("http://localhost:3000/add-event")
    })

    //try to submit a blank form
    it("should return an error alert", async function () {
        await driver.wait(until.elementLocated(By
            .xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[2]/button[1]')), 5 * 3000)
            .then(el => {
                el.click();
            });
        let invalidText = await driver.wait(until.elementLocated(By
            .xpath('//*[@id="alert"]')), 5 * 1000).getText().then(function (value) {
            return value
        })
        expect(invalidText).to.equal("Please provide the required information")
    })

    it("should submit form and return an alert", async function () {

        //input event details
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[1]/input')), 5 * 1000).then(el => {
            el.sendKeys('Test Title');
        });
        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[2]/input')), 5 * 1000).then(el => {
            el.sendKeys('3 Street Name');
        });
        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[4]/input')), 5 * 1000).then(el => {
            el.sendKeys('Lisburn');
        });
        const selectElement = driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[5]/select')), 5 * 1000)
        const select = new Select(selectElement)
        await select.selectByVisibleText('Down')

        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[6]/input')), 5 * 1000).then(el => {
            el.sendKeys('BT32 7YG');
        });
        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[7]/input')), 5 * 1000).then(el => {
            el.sendKeys('50');
        });
        const selectEventType = driver.wait(until.elementLocated(By.xpath('//*[@id="Lecture/Talk"]')), 5 * 1000)
        const selectType = new Select(selectEventType)
        await selectType.selectByVisibleText('Film')

        const selectAgeGroup = driver.wait(until.elementLocated(By.xpath('//*[@id="All Ages"]')), 5 * 1000)
        const selectAge = new Select(selectAgeGroup)
        await selectAge.selectByVisibleText('10-14')

        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[10]/textarea')), 5 * 1000).then(el => {
            el.sendKeys("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        });

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[12]/input')), 5 * 3000).then(el => {
            el.click();
        });
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[12]/div[2]/div/div/div/div[1]/div[1]/div/span[1]')), 5 * 3000).then(el => {
            let i;
            for (i = 0; i < 3; i++) {
                el.click();
            }
        });
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[12]/div[2]/div/div/div/div[1]/div[2]/div[1]/div/div[4]/div[6]/span')), 5 * 3000).then(el => {
            el.click();
        });
        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[13]/input')), 5 * 1000).then(el => {
            el.sendKeys("12:00");
        });
        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[14]/input')), 5 * 1000).then(el => {
            el.sendKeys("12:00");
        });
        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[15]/input')), 5 * 1000).then(el => {
            el.sendKeys("5");
        });

        const selectEventTheme = driver.wait(until.elementLocated(By.xpath('//*[@id="Mind & Body"]')), 5 * 1000)
        const selectTheme = new Select(selectEventTheme)
        await selectTheme.selectByVisibleText('Space')
        await driver.sleep(5 * 1000)
        //submit
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[2]/button[1]')), 5 * 3000).then(el => {
            el.click();
        });
        let validText = await driver.wait(until.elementLocated(By.xpath('//*[@id="alert"]')), 5 * 2000).getText().then(function (value) {
            return value
        })
        expect(validText).to.equal("New event created")
    })

    it("should navigate to 'all-events' page", async function () {
        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/aside[2]/div/div/div/a[2]')), 5 * 1000).then(el => {
            el.click();
        });
        await driver.sleep(5 * 1000)
        let url = await driver.getCurrentUrl();
        console.log(url)
        expect(url).to.equal("http://localhost:3000/")
    })

    it("Should search and find new test", async function () {


        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section[1]/form/div/div[1]/input')), 5 * 1000).then(el => {
            el.sendKeys("Test Title");
        });

        let validText = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section[2]/div/article/header/div/h5')), 5 * 2000).getText().then(function (value) {
            return value
        })
        expect(validText).to.equal("Test Title")

        await driver.quit();
    })
})





