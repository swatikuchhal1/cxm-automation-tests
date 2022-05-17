import { BasePage } from "../BasePage"
import { env, imageMatch, panel, surveyName, takeScreenshots } from "../../config"
import { click, insert, clickXPathElement, insertXPathElement, waitForElement, waitForXPathElement } from "../../lib/helpers"
import { browserContext } from "../../jest-puppeteer.config"
import { assert } from "console"
const fs = require('fs')
const pixelmatch = require('pixelmatch')
const PNG = require('pngjs').PNG;
export class Journeys extends BasePage {

    async newJourney(){

        page.goto('https://app.sit1.vcilabs.com/journeys/journeyslist')
        await page.waitForTimeout(20000)

        const [alidabtn] = await page.$x("//button[contains(text(),'Take me to Alida.com')]")
        alidabtn.click()

       // await page.setViewportSize({ width: 2133, height: 1076 })
        await page.waitForTimeout(40000)
        const [newJourney] = await page.$x("//span[contains(text(),'Create Journey')]")
        newJourney.click() 
        await page.waitForTimeout(5000)
        const [enterName] = await page.$x("//input[@placeholder='Enter Journey Name']")
        await enterName.type("test-automation")
        await page.waitForTimeout(10000)

        const [Create] = await page.$x("(//button//span[contains(text(),'Create')])[2]")
        Create.click()
                       
            
        
        await page.waitForTimeout(30000)
        if (takeScreenshots == 'true') {
            await page.screenshot({ path: 'screenshots/7_CXM_journey.png', fullPage: true })
        }
        const example = await page.$x('//*[@id="cc-container"]/main/div/div[2]/div/div[1]/div[2]/div/div[1]')
        const bounding_box = await example.boundingBox()
        await page.mouse.move(bounding_box.x + bounding_box.width / 2, bounding_box.y + bounding_box.height / 2)
        await page.mouse.down()

        await page.waitForTimeout(20000)
        /*
        const img3 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/screenshots/7_CXM_journey.png'))
        const img4 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/masterscreenshots/7_Master_CXM_journey.png'))
        const diff2 = new PNG({ width: img3.width, height: img3.height })
        if (imageMatch == 'true') {
            pixelmatch(img3.data, img4.data, diff2.data, img3.width, img3.height, { threshold: 0.1 })
            fs.writeFileSync('../CXM-UI-Automation/screenshots/3_CXM_diff.png', PNG.sync.write(diff2))
        }*/
    }
}
