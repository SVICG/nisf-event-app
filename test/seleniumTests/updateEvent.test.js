import * as webdriver from 'selenium-webdriver'
import { By } from "selenium-webdriver";
import { Select } from 'selenium-webdriver';
import { expect } from 'chai';

describe("Edit an event", function () {
    let until;
    let driver;
    let newTitle = "Bricks For Kids Workshops"


    it("should login user", async function () {
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
        await driver.sleep(5 * 1000)
        let url = await driver.getCurrentUrl();
        expect(url).to.equal("http://localhost:3000/")
    })

    //find event to update
    it("should search for an event and check current values", async function () {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section[1]/form/div/div[1]/input')), 5 * 1000).then(el => {
            el.sendKeys("Bricks 4 Kidz Workshops");
        });
        await driver.sleep(2000)
        let validTitle = await driver.findElement(By.xpath('//*[@id="root"]/section/main/div/div/section[2]/div/article/header/div/h5'), 5 * 1000).getText().then(function (value) {
            return value
        })
        expect(validTitle).to.equal("Bricks 4 Kidz Workshops")

        let currentType = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section[2]/div/article/header/div/p')), 5 * 1000).getText().then(function (value) {
            return value
        })
        expect(currentType).to.equal("Other")

        let currentTheme = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section[2]/div/article/div/div[1]/div[3]/span[2]')), 5 * 1000).getText().then(function (value) {
            return value
        })
        expect(currentTheme).to.equal("Maths & Physics")
        await driver.sleep(5 * 1000)
    })

    it("should select 'edit' and navigate to 'edit-event' page", async function () {
        await driver.sleep(5 * 1000)
        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section[2]/div/article/div/div[2]/a')), 5 * 1000).then(el => {
            el.click();
        });

        await driver.sleep(5 * 1000)
        let url = await driver.getCurrentUrl();
        expect(url).to.equal("http://localhost:3000/add-event")

    })

    it("should confirm event values are in form fields", async function () {
        await driver.sleep(5 * 1000)
        //current title
        let currentTitle = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[1]/input')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        // current location
        let currentAddress1 = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[2]/input')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let currentAddress2 = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[3]/input')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let city = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[4]/input')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let county = await driver.wait(until.elementLocated(By.xpath('//*[@id="Armagh"]')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let postCode = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[6]/input')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let capacity = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[7]/input')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let eventType = await driver.wait(until.elementLocated(By.xpath('//*[@id="Other"]')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let targetAudience = await driver.wait(until.elementLocated(By.xpath('//*[@id="0-3"]')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let description = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[10]/textarea')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let date = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[12]/input')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let startTime = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[13]/input')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let endTime = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[14]/input')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let admission = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[15]/input')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })
        let theme = await driver.wait(until.elementLocated(By.xpath('//*[@id="Maths & Physics"]')), 5 * 2000).getAttribute("value").then(function (value) {
            return value
        })

        expect(currentTitle).to.equal("Bricks 4 Kidz Workshops")
        expect(currentAddress1).to.equal("Armagh Planetarium")
        expect(currentAddress2).to.equal("College Hill")
        expect(city).to.equal("Armagh")
        expect(county).to.equal("Armagh")
        expect(postCode).to.equal("BT61 9DB")
        expect(capacity).to.equal("272")
        expect(eventType).to.equal("Other")
        expect(targetAudience).to.equal("0-3")
        expect(description).to.equal("A small group will be given an insight into what becoming a biomedical scientist entails. Researchers at different stages of their careers, including a PhD student, postdoctoral fellow and Principal Investigator will talk about their work and career paths. You will have an opportunity to chat informally with them and members of teaching staff will be on hand to explain the opportunities available within QUB. The group will then be split into subgroups and escorted with volunteers for a tour of the Wellcome-Wolfson Institute for Experimental Medicine (WWIEM) building, including the microscopy facility. The tours will return to the open event in the WWIEM atrium where “Biomedical Research in Action” will be on display from 1-5pm.")
        expect(date).to.equal("2023/02/24")
        expect(startTime).to.equal("22:34:00")
        expect(endTime).to.equal("18:00:00")
        expect(admission).to.equal("5.69")
        expect(theme).to.equal("Maths & Physics")
    })

    it("should submit updated event and recieve an alert", async function () {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[1]/input')), 5 * 1000).clear();
        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[1]/div[1]/input')), 5 * 1000).then(el => {
            el.sendKeys(newTitle);
        });

        const selectEventType = driver.wait(until.elementLocated(By.xpath('//*[@id="Other"]')), 5 * 1000)
        const selectType = new Select(selectEventType)
        await selectType.selectByVisibleText('Workshop Event')

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section/form[1]/div[2]/button[1]')), 5 * 3000).then(el => {
            el.click();
        });
        let validText = await driver.wait(until.elementLocated(By.xpath('//*[@id="alert"]')), 5 * 2000).getText().then(function (value) {
            return value
        })
        expect(validText).to.equal("Event has been updated")

    })

    it("should confirm the old details don't appear", async function () {

        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/aside[2]/div/div/div/a[2]')), 5 * 1000).then(el => {
            el.click();
        });

        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section[1]/form/div/div[1]/input')), 5 * 1000).then(el => {
            el.sendKeys("Bricks 4 Kidz Workshops");
        });

        let validText = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/h2')), 5 * 2000).getText().then(function (value) {
            return value
        })
        expect(validText).to.equal("No Events")



    })

    it("should confirm new event details appear", async function () {

        driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section[1]/form/div/div[1]/input')), 5 * 1000).then(el => {
            el.sendKeys(newTitle);
        });
        await driver.sleep(2000)
        let validText = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section[2]/div/article/header/div/h5')), 5 * 2000).getText().then(function (value) {
            return value
        })
        expect(validText).to.equal("Bricks For Kids Workshops")
        let newType = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/main/div/div/section[2]/div/article/header/div/p')), 5 * 1000).getText().then(function (value) {
            return value
        })
        expect(newType).to.equal("Workshop Event")

    })

});