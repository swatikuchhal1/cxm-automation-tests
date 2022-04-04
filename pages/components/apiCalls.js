import { BasePage } from "../BasePage"
import qs from 'qs'

const axios = require('axios')

export class apiCalls extends BasePage {  
     async getAccessToken() {
        const username = '216f14b7-b992-43fe-baef-e1fef13c193e'
        const password = '9EY9P2Q9sBgYhT0tHqnH6IN1mwWWLYcr'
        const token = `${username}:${password}`
        const encodedToken = Buffer.from(token).toString('base64')
        let response
        try {
            response = await axios.post('https://login.sit1.vcilabs.com/login/oauth2/token',
                {
                    'grant_type': 'client_credentials'
                },
                {
                    headers: {
                        'Authorization': `Basic ${encodedToken}`,
                        'x-api-key': '30961d8f-6fec-4efa-b678-6c6200294adc'
                    }
                })
            const responseObj = {
               status: response.status,
               data: response.data                    
            }
            var token2 = response.data.access_token
            console.log(token2)

            if (responseObj.status == 200) {
                console.log(JSON.stringify(responseObj))
            } 
            return response.data.access_token
            
        }
        catch (error) {
            const errorObj = {
                url: `GET access token for '${username}'`,
                status: error.response?.status,
                data: error.response?.data
            }
            throw new Error(JSON.stringify(errorObj))
        }
        
        
    }

    async postCustomdata () {
         let response
         const token3 = await this.getAccessToken()

       // console.log(token3)
       
        try {
            response = await axios.post(`https://fre.sit1.vcilabs.com/api/v1/trayio/applications/2b4e915b-b9cd-44c1-a259-acd901165502/solutions/customSource/uploads/test_s1`,
               [ {
                    "Transaction ID": "Va2E0004125_1",
                    "Email": "swati.kuchhal-pvv3102k@dev.local",
                    "Transaction Time": "2021-11-19T13:45:00.000Z",
                    "Purchase Amount": 52.5,
                    "Category": "bath_and_body",
                    "Tags": "home",
                    "Other Time": "2022-01-19T13:45:00.000Z",
                    "Other Text": "some test text"
                }],
                {
                    headers: {
                        'Authorization': `Bearer ${token3}`,
                        'x-webapi-return-resource': true,
                        'FRE-Client-ID': `E87DD59F0B50555050494553608035DF`,
                        'Content-Type': `application/json`
                    }
                })

            const responseObj = {
                url: `POST ${`https://fre.sit1.vcilabs.com/api/v1/trayio/applications/2b4e915b-b9cd-44c1-a259-acd901165502/solutions/customSource/uploads/test_s1`}`,
                status: response.status,
                data: response.data
            }
            if (responseObj.status == 204) {
                return responseObj.status
            }
        } catch (error) {
            const errorObj = {
                status: error.response?.status,
                data: error.response?.data
            }
            throw new Error(JSON.stringify(errorObj))
        }

    }

    

  
  
}
