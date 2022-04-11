import { Rules } from '../pages/components/Rules'
import { apiCalls } from '../pages/components/apiCalls'
import { username, password, timeout, panel } from "../config"
import { BasePage } from "../pages/BasePage"


describe('CXM Regression Testing Suite', () => {
    let rules
    let rules2
    let cases
    let basePage
    let pod
    let api
    let customdataName
    let location
   

    beforeAll(async () => {
        jest.setTimeout(timeout)
        rules = new Rules()
        rules2 = new Survey()
        cases = new Cases()
        basePage = new BasePage()
        api = new apiCalls()
        location = new Location()

        pod = '2b4e915b-b9cd-44c1-a259-acd901165502'  //Swati Panel
        customdataName = 'test_s1'
    })

    it('Test 1 : Login to sit1', async () => {
        await rules.login(username, password)
    })

    it('Test 6 : Enable rule with custom data source and EDS', async () => {
       await rules.createNewRuleEds()
       await api.postCustomdata()
       await rules.deleteRule()
    })

    afterAll(async () => {
        await rules.close()
       //  await api.close()
    })
})
