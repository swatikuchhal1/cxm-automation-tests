import { BasePage } from "../BasePage"
import { env, imageMatch, panel, surveyName, takeScreenshots } from "../../config"
import { click, insert, clickXPathElement, insertXPathElement, waitForElement, waitForXPathElement } from "../../lib/helpers"
import { browserContext } from "../../jest-puppeteer.config"
import { assert } from "console"
const fs = require('fs')
const pixelmatch = require('pixelmatch')
const PNG = require('pngjs').PNG;
export class Location extends BasePage {

    async newlocation(){

        page.goto('https://app.sit1.vcilabs.com/social/locationslist')

       // await page.setViewportSize({ width: 2133, height: 1076 })
        await page.waitForTimeout(20000)
        const [newLoc] = await page.$x("//span[contains(text(),'New Location')]")
        newLoc.click() 
        await page.waitForTimeout(10000)
        const [subject] = await page.$x("//input[@placeholder='Location Quick Search']")
        await subject.type("Starbucks, Robson Street, Vancouver, BC, Canada")
        
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        
        await page.waitForTimeout(20000)

        const [saveloc] = await page.$x("//div[contains(text(),'Save')]")
        saveloc.click()
        await page.waitForTimeout(30000)
        /*await page.click('#Answer-option-0')
        const [savecase] = await page.$x("//span[contains(text(),'Save')]")
        savecase.click()
        await page.waitForTimeout(10000)
        if (takeScreenshots == 'true') {
            await page.screenshot({ path: 'screenshots/7_CXM_Cases.png', fullPage: true })
        }
        const img3 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/screenshots/7_CXM_Cases.png'))
        const img4 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/masterscreenshots/7_Master_CXM_Cases.png'))
        const diff2 = new PNG({ width: img3.width, height: img3.height })
        if (imageMatch == 'true') {
            pixelmatch(img3.data, img4.data, diff2.data, img3.width, img3.height, { threshold: 0.1 })
            fs.writeFileSync('../CXM-UI-Automation/screenshots/3_CXM_diff.png', PNG.sync.write(diff2))
        }*/

    }
}
