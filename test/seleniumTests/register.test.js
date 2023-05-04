import * as webdriver from 'selenium-webdriver'
import { By } from "selenium-webdriver";
import { expect } from 'chai';



describe("register a user", function() {

    it("successfully register a user", async function(){

    
    let until = webdriver.until
   
    //launch the browser
    let driver = await new webdriver.Builder().forBrowser('chrome')
        .build()
        driver.sleep(10*1000)

    //navigate to application
    await driver.get("http://localhost:3000/")

    //click login button
    driver.wait(until.elementLocated(By.xpath('//*[@id="reg-btn"]')), 10 * 2000).then(el => {
        el.click();
    });
    await driver.wait(until.elementLocated(By.xpath('//*[@id="reg-btn"]')), 30000);

     //click register button
    driver.wait(until.elementLocated(By.xpath('//*[@id="reg-btn"]')), 10 * 2000).then(el => {
        el.click();
    });
    await driver.wait(until.elementLocated(By.xpath('//*[@id="reg-btn"]')), 30000);

    //input username & passwords
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[1]/input')), 10 * 1000).then(el => {
        el.sendKeys('Mark');
    });
    driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[2]/input')), 5 * 1000).then(el => {
        el.sendKeys('Waid');
    });
    driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[3]/input')), 5 * 1000).then(el => {
        el.sendKeys('waidmark@gmail.com');
    });
    driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[4]/input')), 5 * 1000).then(el => {
        el.sendKeys('password12!');
    });
    driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/div[5]/input')), 5 * 1000).then(el => {
        el.sendKeys('password12!');
    });
    
    //submit
    driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/section/form/button')), 5 * 3000).then(el => {
        el.click();
    });
    let validText = await driver.wait(until.elementLocated(By.xpath('//*[@id="alert"]')), 5 * 2000).getText().then(function (value) {
        return value
    })

    expect(validText).to.equal("Great! Your account has been created..")

    await driver.quit();
})
    
});


