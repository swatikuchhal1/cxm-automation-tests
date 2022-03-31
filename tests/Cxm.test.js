import { Rules } from '../pages/components/Rules'
import { Survey } from '../pages/components/Survey'
import { apiCalls } from '../pages/components/apiCalls'
import { username, password, timeout, panel } from "../config"
import { BasePage } from "../pages/BasePage"
import { Cases } from '../pages/components/cases'

describe('CXM Regression Testing Suite', () => {
    let rules
    let rules2
    let cases
    let basePage
    let pod
    let api
    let customdataName
   

    beforeAll(async () => {
        jest.setTimeout(timeout)
        rules = new Rules()
        rules2 = new Survey()
        cases = new Cases()
        basePage = new BasePage()
        api = new apiCalls()

        pod = '2b4e915b-b9cd-44c1-a259-acd901165502'  //Swati Panel
        customdataName = 'test_s1'
    })

    it.skip('Test 1 : Login to sit1', async () => {
        await rules.login(username, password)
    })

    it.skip('Test 2 : Go To CXM Page', async () => {
        await rules.gotoCXMPage()
        
    })

    it.skip('Test 3 : Create new rule with sparq survey', async () => {
        await rules.createNewRuleSS()

    })
    it.skip('Test 4 : Create new rule with touchpoint', async () => {
        await rules.createNewRuletp()

    })
    it.skip('Test 5 : Create and trigger new rule with custom data source', async () => {
        await rules.createNewRuleCDS()

    })
    it('Test 6 : Enable rule with custom data source and EDS', async () => {
       // await rules.createNewRuleEds()
        //await api.postCustomdata(pod, customdataName)
        await api.postlogin()

    })
    it.skip('Test 7 : Create new alida case', async () => {
        await cases.newCases()

    })
    it.skip('Test 8 : Send Survey to trigger rule', async () => {
        await rules2.sendSurveys()

    })
    afterAll(async () => {
        await rules.close()
       //  await api.close()
    })
})