const axios = require('axios')

export class apiCalls {

    async postCustomdata (pod, customdataName) {
        let response
        try {
            response = await axios.post(`https://fre.sit1.vcilabs.com/api/v1/trayio/applications/${pod}/solutions/customSource/uploads/${customdataName}`, {
                headers: {
                    'Authorization': `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1rcUd2S0VOT282X3NYcG9lVGF1TlUtSjRQYyJ9.eyJlbWFpbCI6IjIxNmYxNGI3LWI5OTItNDNmZS1iYWVmLWUxZmVmMTNjMTkzZUBhcGl1c2VyLmludmFsaWQiLCJ1bmlxdWVfbmFtZSI6IlBBTUludGVncmF0aW9uVXNlcl8yMTZmMTRiNy1iOTkyLTQzZmUtYmFlZi1lMWZlZjEzYzE5M2UiLCJnaXZlbl9uYW1lIjoiMjE2ZjE0YjctYjk5Mi00M2ZlLWJhZWYtZTFmZWYxM2MxOTNlIiwiZmFtaWx5X25hbWUiOiIyMTZmMTRiNy1iOTkyLTQzZmUtYmFlZi1lMWZlZjEzYzE5M2UiLCJWQ1NTT19Vc2VySWQiOiJhZTNiOGNmMy0yNjM5LTRjZWQtYjBjOC00ZDNiZjE4MzE0OGEiLCJWQ1NTT19BY2NvdW50SWQiOiIxMTExMTExMS0wMDAwLTAwMDAtMDAwMS0wMDAwMDAwMDAwYTEiLCJWQ1NTT19EaXJlY3RvcnlJZCI6IjExMTExMTExLTAwMDAtMDAwMC0wMDAxLTAwMDAwMDAwMDBhMSIsIlZDU1NPX0N1bHR1cmUiOiJlbi1VUyIsInN1YiI6ImFlM2I4Y2YzLTI2MzktNGNlZC1iMGM4LTRkM2JmMTgzMTQ4YSIsIlZDU1NPX0FwcGxpY2F0aW9ucyI6IltdIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5zaXQxLnZjaWxhYnMuY29tL2xvZ2luIiwiYXVkIjoidXJuOnZjOnNlcnZpY2UiLCJleHAiOjE2NDg1NTM3NTEsIm5iZiI6MTY0ODU1MTk1MX0.fpuYKZ4TNTkdtJME9fQGb-xKKCWi8wpjthAAg44hEEpa_zOVDe73PVFCHpyKf0VW6lrSHo-OPHFbxqyHfXgMqlxP3gtETOYG6V2-rWTAmug61jImsnZN2gYVRpG8cdPYIl5x2A8W0aiOgPcwvWo_Alu3mkfNvTbDRUuNA9K4wn81HjMxkLYlxtBWLDEyK_-IyCAUuNg1w3TRx8k3468vUGjYirvlcq9EV2ojuYF_rtTZFdaEhjzloe38SiYfEn5FO-L26gL_afJ2ALnHDUq3H2nE0-OMdK_CylU54SxvwTxOiuLDRDbHjO7KFcPohEKxRguKxmAt_ADQqR-qDPEaXw`,
                    'x-webapi-return-resource': true,
                    'Content-Type' : 'application/json'                    
                },
                body: JSON.stringify([
                    {
                        "Transaction ID":"Va2E0004125_1",
                        "Email":"swati.kuchhal-pvv3102k@dev.local",
                        "Purchase Amount": 52.5,
                        "Transaction Time": "2021-11-19T13:45:00.000Z",
                        "Category":"bath_and_body",
                        "Tags": "home,living",
                        "Other Time": "2022-01-19T13:45:00.000Z",
                        "Other Text": "some test text"
                   }
                ])
                
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

    async deleteDataset (pod, datasetGuid) {
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
    }


}
