import { BasePage } from "../BasePage"
import { env, imageMatch, panel, surveyName, takeScreenshots } from "../../config"
import { click, insert, clickXPathElement, insertXPathElement, waitForElement, waitForXPathElement } from "../../lib/helpers"
import { browserContext } from "../../jest-puppeteer.config"
import { assert } from "console"
const fs = require('fs')
const pixelmatch = require('pixelmatch')
const PNG = require('pngjs').PNG;
export class Survey extends BasePage {

    async sendSurveys(){

        page.goto('https://app.sit1.vcilabs.com/surveys')
        await page.waitForTimeout(20000)
        const frameHandle = await page.$("iframe[title='iframe body']")
        const frame = await frameHandle.contentFrame();
        const [newProject] = await frame.$x("//a[contains(text(),'test-survey-rule1')]")
        await newProject.click()
        await page.waitForTimeout(30000)
        await page.click('[id="distribute"]')

        await page.waitForTimeout(30000)

        const frameHandle2 = await page.$("iframe[title='iframe body']")
        const frame2 = await frameHandle2.contentFrame();

        const [invite] = await frame2.$x("//div[@id='ui-id-2']")
        
        await invite.click()

        await page.waitForTimeout(30000)

        const [invite1] = await frame2.$x("//span[@id='ui-id-5']")
        await invite1.click()

        await page.waitForTimeout(10000)

        const frameHandle3 = await page.$("iframe[class='iframe alida-cc-ui21 alida-cc-ui23']")

        const frame3 = await frameHandle3.contentFrame()

        const [invite2] = await frame3.$x("//input[@data-qa-id='communication-name-input']")

        await invite2.type("test-Swati2")

        await page.waitForTimeout(5000)

        const [createbtn] = await page.$x("//span[contains(text(),'Create')]")
        await createbtn.click()

        await page.waitForTimeout(15000)

        const frameHandle4 = await page.$("iframe[class='iframe alida-cc-ui21']")

        const frame4 = await frameHandle4.contentFrame()

        const frameHandle5 = await page.$("iframe[class='iframe alida-cc-ui22']")

        const frame5 = await frameHandle5.contentFrame()

       // const [recipients] = await frame4.$x("//div[contains(text(),'Recipients')]")
        //await recipients.click()
        await frame4.waitForTimeout(50000)
        const [selectFile] = await frame4.$x("//div/button/span[contains(text(),'Live')]")
        await selectFile.click()
        await frame4.waitForTimeout(10000)
        const [name1] = await frame4.$x("//input[@title='Live Link URL']")

        let value4 = await frame4.evaluate(x => x.value, name1)

        console.log('Text in the attr: ' + value4);

        await page.goto(value4)

        await page.waitForTimeout(10000)

        const [selectOP] = await page.$x("//div[@role='radio'][1]")
        await selectOP.click()
        const [next] = await page.$x("//button[@id='Next']")
        await next.click()


        await page.waitForTimeout(10000)

 
    }
}
