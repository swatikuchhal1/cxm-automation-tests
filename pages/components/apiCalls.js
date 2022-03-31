import { BasePage } from "../BasePage"
import qs from 'qs'

const axios = require('axios')

export class apiCalls extends BasePage {
     

   /* async  getAccessToken() {
        const username = '216f14b7-b992-43fe-baef-e1fef13c193e'
        const password = '9EY9P2Q9sBgYhT0tHqnH6IN1mwWWLYcr'
        const token = `${username}:${password}`
        const encodedToken = Buffer.from(token).toString('base64')
        let response
        try {
           response = await axios.post('https://login.sit1.vcilabs.com/login/oauth2/token', {
            {
                'grant_type':'client_credentials'
            },
           headers: {
              'Authorization': `Basic Auth`,
              auth: {
                 username: '${username}',
                 password: '${password}'
              }
              'Content-Type':'application/x-www-form-urlencoded',
              'x-api-key':'30961d8f-6fec-4efa-b678-6c6200294adc'
           }
           })
         //  return response.data.access_token
     
        } catch (error) {
           const errorObj = {
              url: `GET access token for '${username}'`,
              status: error.response?.status,
              data: error.response?.data
           }
           await throwError(JSON.stringify(errorObj), env.pod)
        }
     }*/
     async postlogin () {
        const username = '216f14b7-b992-43fe-baef-e1fef13c193e'
        const password = '9EY9P2Q9sBgYhT0tHqnH6IN1mwWWLYcr'
        const data = qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': '216f14b7-b992-43fe-baef-e1fef13c193',
            'client_secret': '9EY9P2Q9sBgYhT0tHqnH6IN1mwWWLYcr'
            
          })
        let response
        try {
            
            response = await axios.post(`https://login.sit1.vcilabs.com/login/oauth2/token`,
           data,               
            /*{
                auth: {
                    username: `216f14b7-b992-43fe-baef-e1fef13c193`,
                    password: `9EY9P2Q9sBgYhT0tHqnH6IN1mwWWLYcr`
                 }},*/
                {
                    headers: {
                        //'Authorization': `Basic Auth`,
                        'Content-Type': `application/x-www-form-urlencoded;charset=UTF-8`,
                        'x-api-key': `30961d8f-6fec-4efa-b678-6c6200294adc`,
                        'x-webapi-return-resource': true
                    }
                
                }
                
                )

            const responseObj = {
                url: `POST ${`https://login.sit1.vcilabs.com/login/oauth2/token`}`,
                status: response.status,
                data: response.data
            }
            if (responseObj.status == 200) {
                return responseObj.status
                console.log(response.status)
            }
        } catch (error) {
            const errorObj = {
                status: error.response?.status,
                data: error.response?.data   
            }
            throw new Error(JSON.stringify(errorObj))
        }

    }


    async postCustomdata (pod, customdataName) {
        let response
        try {
            response = await axios.post(`https://fre.sit1.vcilabs.com/api/v1/trayio/applications/${pod}/solutions/customSource/uploads/${customdataName}`,
               [ {
                    "Transaction ID": "Va2E0004125_1",
                    "Email": "swati.kuchhal-pvv3102k@dev.local",
                    "Transaction Time": "2021-11-19T13:45:00.000Z",
                    "Purchase Amount": 52.5,
                    "Category": "bath_and_body",
                    "Tags": "home living",
                    "Other Time": "2022-01-19T13:45:00.000Z",
                    "Other Text": "some test text"
                }],
                {
                    headers: {
                        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1rcUd2S0VOT282X3NYcG9lVGF1TlUtSjRQYyJ9.eyJlbWFpbCI6IjIxNmYxNGI3LWI5OTItNDNmZS1iYWVmLWUxZmVmMTNjMTkzZUBhcGl1c2VyLmludmFsaWQiLCJ1bmlxdWVfbmFtZSI6IlBBTUludGVncmF0aW9uVXNlcl8yMTZmMTRiNy1iOTkyLTQzZmUtYmFlZi1lMWZlZjEzYzE5M2UiLCJnaXZlbl9uYW1lIjoiMjE2ZjE0YjctYjk5Mi00M2ZlLWJhZWYtZTFmZWYxM2MxOTNlIiwiZmFtaWx5X25hbWUiOiIyMTZmMTRiNy1iOTkyLTQzZmUtYmFlZi1lMWZlZjEzYzE5M2UiLCJWQ1NTT19Vc2VySWQiOiJhZTNiOGNmMy0yNjM5LTRjZWQtYjBjOC00ZDNiZjE4MzE0OGEiLCJWQ1NTT19BY2NvdW50SWQiOiIxMTExMTExMS0wMDAwLTAwMDAtMDAwMS0wMDAwMDAwMDAwYTEiLCJWQ1NTT19EaXJlY3RvcnlJZCI6IjExMTExMTExLTAwMDAtMDAwMC0wMDAxLTAwMDAwMDAwMDBhMSIsIlZDU1NPX0N1bHR1cmUiOiJlbi1VUyIsInN1YiI6ImFlM2I4Y2YzLTI2MzktNGNlZC1iMGM4LTRkM2JmMTgzMTQ4YSIsIlZDU1NPX0FwcGxpY2F0aW9ucyI6IltdIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5zaXQxLnZjaWxhYnMuY29tL2xvZ2luIiwiYXVkIjoidXJuOnZjOnNlcnZpY2UiLCJleHAiOjE2NDg1Njg5NjksIm5iZiI6MTY0ODU2NzE2OX0.hpVEbSr_05UwIVCVSSN7ZGLb_oW2L98quVO6kb8ySmK7St0QqlHKSltDHQ_f0GkgdKlsJ7APrsUOTberSblCq_JBoUzX1k2yvkLb1GzJ9R4_l44-6KYgp1NsowuYQd_A92a6PH9dJfUds6KSMWHAHxYnPmULPVcs1g7nXHBh23mGjGmC-7UlvnpZkIPWx1kLtMukYTgg8EZv4mljHQJdKohmIPjXpfniBn-jXVff_ctTEXBWpAcXVc3CzFIa1psDorJsigNdC6wqSrFMHs_iC6qI-02WrGAgQTeUEyE8zakMv_-NWeEqXWUtDgcZl2zp5CHQDSDF0Mj3trs4i8afdA`,
                        'x-webapi-return-resource': true,
                        'FRE-Client-ID': `E87DD59F0B50555050494553608035DF`,
                        'Content-Type': `application/json`
                    }
                })

            const responseObj = {
                url: `POST ${`https://fre.sit1.vcilabs.com/api/v1/trayio/applications/${pod}/solutions/customSource/uploads/${customdataName}`}`,
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

    

  /*  async deleteDataset (pod, datasetGuid) {
        let response
        try {
            response = await axios.delete(`https://int-ds.sit1.vcilabs.com/v1/applications/${pod}/datasets/${datasetGuid}`, {
                headers: {
                    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZmRzZGYiLCJWQ19Ub2tlblR5cGUiOiJTZXJ2ZXIiLCJpYXQiOjE2MzI4NDQyNzksImV4cCI6MjQ5Njg0NDI3OSwibmJmIjoxNjMyODQ0Mjc5fQ.W3KWmBOPopN5sZysEx5Fr-Q07OhOtg9Nn4hIqiL5z8A`,
                    'x-webapi-return-resource': true
                }
            })
            const responseObj = {
                url: `DELETE ${`https://int-ds.sit1.vcilabs.com/v1/applications/${pod}/datasets/${datasetGuid}`}`,
                status: response.status
            }
            return responseObj.status
        } catch (error) {
            const errorObj = {
                status: error.response?.status,
                data: error.response?.data
            }
            throw new Error(JSON.stringify(errorObj))


        }
    }

    async getTemplateId (pod, newTempName) {
        let response
        try {
            response = await axios.get(`https://int-ds.sit1.vcilabs.com/v1/applications/${pod}/datasets/00000000-0000-0000-0000-000000000000/weighting/schemes?q=name.contains("${newTempName}")`, {
                headers: {
                    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZmRzZGYiLCJWQ19Ub2tlblR5cGUiOiJTZXJ2ZXIiLCJpYXQiOjE2MzI4NDQyNzksImV4cCI6MjQ5Njg0NDI3OSwibmJmIjoxNjMyODQ0Mjc5fQ.W3KWmBOPopN5sZysEx5Fr-Q07OhOtg9Nn4hIqiL5z8A`,
                    'x-webapi-return-resource': true
                }
            })
            const responseObj = {
                url: `GET ${`https://int-ds.sit1.vcilabs.com/v1/applications/${pod}/datasets/00000000-0000-0000-0000-000000000000/weighting/schemes?q=name.contains("${newTempName}")`}`,
                status: response.status,
                data: response.data
            }
            if (responseObj.data.meta.count == 1) {
                return responseObj.data.items[0].id
            }
        } catch (error) {
            const errorObj = {
                status: error.response?.status,
                data: error.response?.data
            }
            throw new Error(JSON.stringify(errorObj))
        }
    }

    async deleteTemplate (pod, templateGuid) {
        let response
        try {
            response = await axios.delete(`https://int-ds.sit1.vcilabs.com/v1/applications/${pod}/datasets/00000000-0000-0000-0000-000000000000/weighting/schemes/${templateGuid}`, {
                headers: {
                    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZmRzZGYiLCJWQ19Ub2tlblR5cGUiOiJTZXJ2ZXIiLCJpYXQiOjE2MzI4NDQyNzksImV4cCI6MjQ5Njg0NDI3OSwibmJmIjoxNjMyODQ0Mjc5fQ.W3KWmBOPopN5sZysEx5Fr-Q07OhOtg9Nn4hIqiL5z8A`,
                    'x-webapi-return-resource': true
                }
            })
            const responseObj = {
                url: `DELETE ${`https://int-ds.sit1.vcilabs.com/v1/applications/${pod}/datasets/00000000-0000-0000-0000-000000000000/weighting/schemes/${templateGuid}`}`,
                status: response.status
            }
            return responseObj.status
        } catch (error) {
            const errorObj = {
                status: error.response?.status,
                data: error.response?.data
            }
            throw new Error(JSON.stringify(errorObj))


        }
    }*/


}
