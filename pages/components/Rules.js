import { BasePage } from "../BasePage"
import { env, imageMatch, panel, surveyName, takeScreenshots } from "../../config"
import { click, insert, clickXPathElement, insertXPathElement, waitForElement, waitForXPathElement } from "../../lib/helpers"
import { browserContext } from "../../jest-puppeteer.config"
import { assert } from "console"
const fs = require('fs')
const pixelmatch = require('pixelmatch')
const PNG = require('pngjs').PNG;
export class Rules extends BasePage {

    async login(username, password) {
        await page.goto(env)
        await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 0.50 })
        await waitForElement(page, '.signin-header')
        if (takeScreenshots == 'true') {
            await page.screenshot({ path: 'screenshots/1_Login.png', fullPage: true })
        }

        const img1 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/screenshots/1_Login.png'))
        const img2 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/masterscreenshots/1_Master_Login.png'))

        const { width, height } = img1
        const diff = new PNG({ width, height })
        if (imageMatch == 'true') {
            pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 })
            fs.writeFileSync('../screenshots/1_Login_diff.png', PNG.sync.write(diff))
        }

        await insert(page, '#Email', username)
        await insert(page, '#Password', password)
        await click(page, '#email-form > div > input')
        await page.waitForTimeout(15000)

        try {
            const panelName = await page.$eval('#tenant-search', el => el.value)
            if (panelName != panel) {
                await click(page, '#tenant-search')
                await page.waitForTimeout(3000)
                await page.$eval('#tenant-search', el => el.value = '')
                await insert(page, '#tenant-search', panel)
                await page.keyboard.press('ArrowDown')
                await page.keyboard.press('Enter')
            }
        } catch (error) {
            throw new Error("Issue while selecting the Panel..!!")
        }

        await page.waitForTimeout(12000)

    }

    async gotoCXMPage() {
       if (takeScreenshots == 'true') {
            await page.screenshot({ path: 'screenshots/2_HomePage.png', fullPage: true })
        }
        const img1 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/screenshots/2_HomePage.png'))
        const img2 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/masterscreenshots/2_Master_HomePage.png'))
        const { width, height } = img1
        const diff = new PNG({ width, height })
        if (imageMatch == 'true') {
            pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 })
            fs.writeFileSync('../screenshots/2_HomePage_diff.png', PNG.sync.write(diff))
        }

        //page.reload()
        await page.waitForTimeout(10000)
        await page.waitForSelector('#cxm-link')
        await page.click('#cxm-link')

        await page.waitForTimeout(10000)
        if (takeScreenshots == 'true') {
            await page.screenshot({ path: 'screenshots/3_CXM.png', fullPage: true })
        }
        const img3 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/screenshots/3_CXM.png'))
        const img4 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/masterscreenshots/3_Master_CXM.png'))
        const diff2 = new PNG({ width: img3.width, height: img3.height })
        if (imageMatch == 'true') {
            pixelmatch(img3.data, img4.data, diff2.data, img3.width, img3.height, { threshold: 0.1 })
            fs.writeFileSync('../screenshots/3_CXM_diff.png', PNG.sync.write(diff2))
        }

        await page.waitForTimeout(15000)

        page.goto('https://app.sit1.vcilabs.com/cxm/rules')


        await page.waitForTimeout(12000)

        await page.screenshot({ path: 'screenshots/4_CXMRules.png', fullPage: true })
        await page.waitForTimeout(10000)


    }
    async createNewRuleSS() {
        page.goto('https://app.sit1.vcilabs.com/cxm/rules')
        await page.waitForTimeout(20000)
        const [newRule] = await page.$x("//div[contains(text(),'New Rule')]")
        await newRule.click()
        await page.waitForTimeout(10000)
        const [ruleName] = await page.$x("//input[@placeholder='Enter a name for this rule']")
        await ruleName.type("auto-test-ss-slack1")
        await page.waitForTimeout(5000)
        const [createCondition] = await page.$x("//div[contains(text(),'Condition')]")
        await createCondition.click()
        await page.screenshot({ path: 'screenshots/5_CXMNewRule.png', fullPage: true })
        await page.waitForTimeout(20000)
        await page.click('[id="Data Source"]')
        await page.waitForTimeout(10000)
        await insert(page, '[id="Data Source"]', "Sparq Survey")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(10000)
        await page.click('[id="Survey Name"]')
        await insert(page, '[id="Survey Name"]', "test-survey-rule1")
        await page.waitForTimeout(10000)
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(5000)
        await page.click('[id="Question"]')
        await page.waitForTimeout(10000)
        await page.click('#Question-option-3')
        await page.click('[id="Operator"]')
        await insert(page, '[id="Operator"]', "Is")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(10000)
        await page.waitForSelector('#Answer')
        await page.click('#Answer')
        await page.waitForSelector('#Answer-option-0')
        await page.click('#Answer-option-0')
        const [createAction] = await page.$x("//div[contains(text(),'Create An Action')]")
        createAction.click()
        await page.waitForTimeout(5000)
        const [actionDropDown] = await page.$x("(//div[@aria-haspopup='listbox'])[2]")
        actionDropDown.click()
        await page.waitForTimeout(5000)
        const [createSlackMessage] = await page.$x("//span[contains(text(),'Create Slack Message')]")
        await createSlackMessage.click()
        await page.waitForTimeout(5000)
        await page.click('[id="Channel-input"]')
        await page.waitForTimeout(5000)
        const [channelName] = await page.$x("//span[contains(text(),'@swati')]")
        channelName.click()
        await page.waitForTimeout(5000)
        const [message] = await page.$x("(//div[@aria-label='rdw-wrapper'])")
        message.click()
        await page.waitForTimeout(5000)
        await message.type("automation test ss and slack")
        await page.waitForTimeout(10000)
        const [saveDraft] = await page.$x("//span[contains(text(),'Save As Draft')]")
        saveDraft.click()
        await page.waitForTimeout(10000)
        const [Draft] = await page.$x("//span[contains(text(),'Draft')]")
        Draft.click()
        await page.waitForTimeout(10000)
        const [enable] = await page.$x("//li[contains(text(),'Enable')]")
        enable.click()       
        await page.waitForTimeout(5000)
        if (takeScreenshots == 'true') {
            await page.screenshot({ path: 'screenshots/6_CXMNewRuleSurvey.png', fullPage: true })
        }
        const img5 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/screenshots/6_CXMNewRuleSurvey.png'))
        const img6 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/masterscreenshots/6_Master_CXMNewRuleSurvey.png'))
        const diff2 = new PNG({ width: img5.width, height: img5.height })
        if (imageMatch == 'true') {
            pixelmatch(img5.data, img6.data, diff2.data, width, height, { threshold: 0.1 })
            fs.writeFileSync('../screenshots/6_CXM_SS_diff.png', PNG.sync.write(diff2))
        }
        

    }
    async createNewRuletp() {
        page.goto('https://app.sit1.vcilabs.com/cxm/rules')
        await page.waitForTimeout(20000)
        const [newRule] = await page.$x("//div[contains(text(),'New Rule')]")
        await newRule.click()
        await page.waitForTimeout(10000)

        const [ruleName] = await page.$x("//input[@placeholder='Enter a name for this rule']")
        await ruleName.type("auto-test-touchpoint")
        await page.waitForTimeout(5000)
        const [createCondition] = await page.$x("//div[contains(text(),'Condition')]")
        await createCondition.click()
       // await page.screenshot({ path: 'screenshots/5_CXMNewRule.png', fullPage: true })
        await page.waitForTimeout(20000)
        await page.click('[id="Data Source"]')
        await page.waitForTimeout(10000)
        await insert(page, '[id="Data Source"]', "Touchpoint Microsurvey")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(10000)
        await page.click('[id="Activity"]')
        await insert(page, '[id="Activity"]', "optional-2")
        await page.waitForTimeout(10000)
        await page.keyboard.press('ArrowDown')

        await page.keyboard.press('Enter')

        await page.waitForTimeout(5000)
        await page.click('[id="Screen"]')
        await page.waitForTimeout(10000)
        await page.click('#Screen-option-4')
        await page.click('[id="Operator"]')
        await insert(page, '[id="Operator"]', "Contains")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(5000)
        
        const [ans] = await page.$x("//input[@placeholder='Answer']")
        await ans.type("swati")

        
        const [createAction] = await page.$x("//div[contains(text(),'Create An Action')]")
        createAction.click()
        await page.waitForTimeout(5000)
        const [actionDropDown] = await page.$x("(//div[@aria-haspopup='listbox'])[2]")
        actionDropDown.click()
        await page.waitForTimeout(5000)
        const [createSlackMessage] = await page.$x("//span[contains(text(),'Create Slack Message')]")
        await createSlackMessage.click()
        await page.waitForTimeout(5000)
        await page.click('[id="Channel-input"]')
      
        await page.waitForTimeout(5000)
        const [channelName] = await page.$x("//span[contains(text(),'@swati')]")
        channelName.click()
        await page.waitForTimeout(5000)
        const [message] = await page.$x("(//div[@aria-label='rdw-wrapper'])")
        message.click()
        await page.waitForTimeout(5000)
        await message.type("automation test")
        await page.waitForTimeout(10000)
        const [saveDraft] = await page.$x("//span[contains(text(),'Save As Draft')]")
        saveDraft.click()
        await page.waitForTimeout(10000)
        const [Draft] = await page.$x("//span[contains(text(),'Draft')]")
        Draft.click()
        await page.waitForTimeout(10000)
        const [enable] = await page.$x("//li[contains(text(),'Enable')]")
        enable.click()
        
        await page.waitForTimeout(10000)
      
        await page.screenshot({ path: 'screenshots/7_CXMNewRuleToucpoint.png', fullPage: true })
        page.goto('https://app.sit1.vcilabs.com/cxm/rules')
        await page.waitForTimeout(10000)

       /* const [ruleA] = await page.$x("//tr//td//a//div[contains(text(),'auto-test-swati')]")
        await ruleA.click()
        await page.waitForTimeout(10000)

        const [del] = await page.$x("//span[@aria-label='delete']")
        await del.click()

        await page.waitForTimeout(10000)
        const [confirmDeleteButton] = await page.$x("//span[contains(text(),'Delete')]")

        await confirmDeleteButton.click()*/

        await page.waitForTimeout(6000)

    }
    async createNewRulepv() {
        page.goto('https://app.sit1.vcilabs.com/cxm/rules')
        await page.waitForTimeout(20000)
        const [newRule] = await page.$x("//div[contains(text(),'New Rule')]")
        await newRule.click()
        await page.waitForTimeout(10000)

        const [ruleName] = await page.$x("//input[@placeholder='Enter a name for this rule']")
        await ruleName.type("auto-test-swati-pv")
        await page.waitForTimeout(5000)
        const [createCondition] = await page.$x("//div[contains(text(),'Condition')]")
        await createCondition.click()
        await page.screenshot({ path: 'screenshots/5_CXMNewRule.png', fullPage: true })
        await page.waitForTimeout(20000)
        await page.click('[id="Data Source"]')
        await page.waitForTimeout(10000)
        await insert(page, '[id="Data Source"]', "Profile Variable")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(10000)
        await page.click('[id="Variable"]')
        await insert(page, '[id="Variable"]', "City")
        await page.waitForTimeout(10000)
        await page.keyboard.press('ArrowDown')

        await page.keyboard.press('Enter')

        await page.waitForTimeout(5000)
       
        await page.click('[id="Operator"]')
        await insert(page, '[id="Operator"]', "Is")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(5000)
        await page.click('[id="Value"]')
        const [city] = await page.$x("//li/span[contains(text(),'t1')]")
        await city.click()
       
        
        await page.waitForTimeout(10000)
        const [createAction] = await page.$x("//div[contains(text(),'Create An Action')]")
        createAction.click()
        await page.waitForTimeout(5000)
        const [actionDropDown] = await page.$x("(//div[@aria-haspopup='listbox'])[2]")
        actionDropDown.click()
        await page.waitForTimeout(5000)
        const [createSlackMessage] = await page.$x("//span[contains(text(),'Create Slack Message')]")
        await createSlackMessage.click()
        await page.waitForTimeout(5000)
        await page.click('[id="Channel-input"]')
        await page.waitForTimeout(5000)
        const [channelName] = await page.$x("//span[contains(text(),'@swati')]")
        channelName.click()
        await page.waitForTimeout(5000)
        const [message] = await page.$x("(//div[@aria-label='rdw-wrapper'])")
        message.click()
        await page.waitForTimeout(5000)
        await message.type("automation test")
        await page.waitForTimeout(10000)
        const [saveDraft] = await page.$x("//span[contains(text(),'Save As Draft')]")
        saveDraft.click()
        await page.waitForTimeout(10000)
        const [Draft] = await page.$x("//span[contains(text(),'Draft')]")
        Draft.click()
        await page.waitForTimeout(10000)
        const [enable] = await page.$x("//li[contains(text(),'Enable')]")
        enable.click()
        await page.waitForTimeout(10000)
        await page.screenshot({ path: 'screenshots/7_CXMNewRuleToucpoint.png', fullPage: true })
        page.goto('https://app.sit1.vcilabs.com/cxm/rules')
        await page.waitForTimeout(10000)

        const [ruleA] = await page.$x("//tr//td//a//div[contains(text(),'auto-test-swati')]")
        await ruleA.click()
        await page.waitForTimeout(10000)

        const [del] = await page.$x("//span[@aria-label='delete']")
        await del.click()

        await page.waitForTimeout(10000)
        const [confirmDeleteButton] = await page.$x("//span[contains(text(),'Delete')]")

        await confirmDeleteButton.click()

        await page.waitForTimeout(6000)

    }
    async createNewRuleCDS() {
        page.goto('https://app.sit1.vcilabs.com/cxm/rules')
        await page.waitForTimeout(20000)
        const [newRule] = await page.$x("//div[contains(text(),'New Rule')]")
        await newRule.click()
        await page.waitForTimeout(10000)

        const [ruleName] = await page.$x("//input[@placeholder='Enter a name for this rule']")
        await ruleName.type("auto-test-swati-CDS")
        await page.waitForTimeout(5000)
        const [createCondition] = await page.$x("//div[contains(text(),'Condition')]")
        await createCondition.click()
        await page.screenshot({ path: 'screenshots/5_CXMNewRule.png', fullPage: true })
        await page.waitForTimeout(20000)
        await page.click('[id="Data Source"]')
        await page.waitForTimeout(10000)
        await insert(page, '[id="Data Source"]', "test_s1")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(10000)
        await page.click('[id="Field-label"]')
        await insert(page, '[id="Field-label"]', "Email")
        await page.waitForTimeout(10000)
        await page.keyboard.press('ArrowDown')

        await page.keyboard.press('Enter')

        await page.waitForTimeout(5000)
       
        await page.click('[id="Operator"]')
        await insert(page, '[id="Operator"]', "Contains")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(10000)
        const [val1] = await page.$x("//input[@placeholder='Value']")
        val1.click()
        await val1.type("a")
        await page.waitForTimeout(10000)
        const [createAction] = await page.$x("//div[contains(text(),'Create An Action')]")
        createAction.click()
        await page.waitForTimeout(5000)
        const [actionDropDown] = await page.$x("(//div[@aria-haspopup='listbox'])[2]")
        actionDropDown.click()
        await page.waitForTimeout(5000)
        const [createSlackMessage] = await page.$x("//span[contains(text(),'Create Slack Message')]")
        await createSlackMessage.click()
        await page.waitForTimeout(5000)
        await page.click('[id="Channel-input"]')
      
        await page.waitForTimeout(5000)
        const [channelName] = await page.$x("//span[contains(text(),'@swati')]")
        channelName.click()
        await page.waitForTimeout(5000)
        const [message] = await page.$x("(//div[@aria-label='rdw-wrapper'])")
        message.click()
        await page.waitForTimeout(5000)
        await message.type("automation test")
        await page.waitForTimeout(10000)
        const [saveDraft] = await page.$x("//span[contains(text(),'Save As Draft')]")
        saveDraft.click()
        await page.waitForTimeout(10000)
        const [Draft] = await page.$x("//span[contains(text(),'Draft')]")
        Draft.click()
        await page.waitForTimeout(10000)
        const [enable] = await page.$x("//li[contains(text(),'Enable')]")
        enable.click()
        
        await page.waitForTimeout(10000)
      
        await page.screenshot({ path: 'screenshots/7_CXMNewRuleToucpoint.png', fullPage: true })
        page.goto('https://app.sit1.vcilabs.com/cxm/rules')
        await page.waitForTimeout(10000)

        /*const [ruleA] = await page.$x("//tr//td//a//div[contains(text(),'auto-test-swati')]")
        await ruleA.click()
        await page.waitForTimeout(10000)

        const [del] = await page.$x("//span[@aria-label='delete']")
        await del.click()

        await page.waitForTimeout(10000)
        const [confirmDeleteButton] = await page.$x("//span[contains(text(),'Delete')]")

        await confirmDeleteButton.click()*/

        await page.waitForTimeout(6000)

    }
    async createNewRuleEds() {
        page.goto('https://app.sit1.vcilabs.com/cxm/rules')
        await page.waitForTimeout(20000)
        const [newRule] = await page.$x("//div[contains(text(),'New Rule')]")
        await newRule.click()
        await page.waitForTimeout(10000)

        const [ruleName] = await page.$x("//input[@placeholder='Enter a name for this rule']")
        await ruleName.type("auto-test-swati-customdata-eds")
        await page.waitForTimeout(5000)
        const [createCondition] = await page.$x("//div[contains(text(),'Condition')]")
        await createCondition.click()
        await page.screenshot({ path: 'screenshots/5_CXMNewRule.png', fullPage: true })
        await page.waitForTimeout(20000)
        await page.click('[id="Data Source"]')
        await page.waitForTimeout(10000)
        await insert(page, '[id="Data Source"]', "test_s1")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(10000)
        await page.click('[id="Field-label"]')
        await insert(page, '[id="Field-label"]', "Email")
        await page.waitForTimeout(10000)
        await page.keyboard.press('ArrowDown')

        await page.keyboard.press('Enter')

        await page.waitForTimeout(5000)
       
        await page.click('[id="Operator"]')
        await insert(page, '[id="Operator"]', "Contains")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.waitForTimeout(10000)
        const [val1] = await page.$x("//input[@placeholder='Value']")
        val1.click()
        await val1.type("a")
        await page.waitForTimeout(10000)
        const [createAction] = await page.$x("//div[contains(text(),'Create An Action')]")
        createAction.click()
        await page.waitForTimeout(5000)
        const [actionDropDown] = await page.$x("(//div[@aria-haspopup='listbox'])[2]")
        actionDropDown.click()
        await page.waitForTimeout(5000)
        const [sendSurvey] = await page.$x("//span[contains(text(),'Send a Survey')]")
        await sendSurvey.click()
        await page.waitForTimeout(5000)
        await page.click('[id="survey-input"]')
      
        await page.waitForTimeout(10000)
        
        await page.keyboard.press('Space')
        await page.waitForTimeout(10000)
        
        
        const [sname] = await page.$x("(//span[contains(text(),'test1')])[2]")
        await sname.click()
        
        await page.waitForTimeout(10000)

        await page.click('[id="distribution"]')
        await page.waitForTimeout(10000)
        const [dist] = await page.$x("//li/span[contains(text(),'t1')]")
        await dist.click()
        /*await page.click('[id="distribution"]')
        await page.waitForTimeout(000)
        await insert(page, '[id="distribution"]', "t1")
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')*/
        await page.waitForTimeout(10000)

        const [ivar] = await page.$x("(//div/input[@type='text'])[10]")
       // await ivar.click()
        await ivar.type("swati.kuchhal-90@dev.local")
        
        await page.waitForTimeout(5000)
        /*const [datasource1] = await page.$x("//input[@id='Data Source']")
        await datasource1.type("Profile Variable")

        await page.waitForTimeout(5000)
        const [var1] = await page.$x("//input[@id='Data Source']")
        await var1.type("email")

        const [saveb] = await page.$x("(//span[contains(text(),'Save')])[2]")
        await saveb.click()*/

        const [q1] = await page.$x("//div[contains(text(),'Question')]")
        await q1.click()
        await page.waitForTimeout(5000)
        await page.click('[id="questions_0_question-input"]')
        const [sc2] = await page.$x("//span[contains(text(),'Single')]")
        await page.waitForTimeout(5000)
        await sc2.click()
        await page.waitForTimeout(5000)
        const [ivar1] = await page.$x("(//div/input[@type='text'])[11]")
       
        await ivar1.type("a")
        await page.waitForTimeout(5000)       
        const [saveDraft] = await page.$x("//span[contains(text(),'Save As Draft')]")
        saveDraft.click()
        await page.waitForTimeout(10000)
        const [Draft] = await page.$x("//span[contains(text(),'Draft')]")
        Draft.click()
        await page.waitForTimeout(10000)
        const [enable] = await page.$x("//li[contains(text(),'Enable')]")
        enable.click()
        
        await page.waitForTimeout(10000)
        await page.screenshot({ path: 'screenshots/9_CXMNewRuleEDS.png', fullPage: true })
        if (takeScreenshots == 'true') {
            await page.screenshot({ path: 'screenshots/9_CXMNewRuleEDS.png', fullPage: true })
        }
        const img5 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/screenshots/9_CXMNewRuleEDS.png'))
        const img6 = PNG.sync.read(fs.readFileSync('../cxm-automation-tests/masterscreenshots/9_Master_CXMNewRuleEDS.png'))
        const diff2 = new PNG({ width: img5.width, height: img5.height })
        if (imageMatch == 'true') {
            pixelmatch(img5.data, img6.data, diff2.data, width, height, { threshold: 0.1 })
            fs.writeFileSync('../screenshots/9_CXM_Eds_diff.png', PNG.sync.write(diff2))
        }
        
    }

async deleteRule() {
    page.goto('https://app.sit1.vcilabs.com/cxm/rules')
        await page.waitForTimeout(20000)
         const [ruleA] = await page.$x("//tr//td//a//div[contains(text(),'auto-test-swati-customdata-eds')]")
        await ruleA.click()
        await page.waitForTimeout(10000)

        const [del] = await page.$x("//span[@aria-label='delete']")
        await del.click()

        await page.waitForTimeout(10000)
        const [confirmDeleteButton] = await page.$x("//span[contains(text(),'Delete')]")

        await confirmDeleteButton.click()
        await page.waitForTimeout(10000)
}

    

    }
