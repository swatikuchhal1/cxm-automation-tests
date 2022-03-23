const axios = require('axios')

export class apiCalls {

    async getDatasetId (pod, newDatasetName) {
        let response
        try {
            response = await axios.get(`https://int-ds.sit1.vcilabs.com/v1/applications/${pod}/datasets?q=name.contains("${newDatasetName}")`, {
                headers: {
                    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZmRzZGYiLCJWQ19Ub2tlblR5cGUiOiJTZXJ2ZXIiLCJpYXQiOjE2MzI4NDQyNzksImV4cCI6MjQ5Njg0NDI3OSwibmJmIjoxNjMyODQ0Mjc5fQ.W3KWmBOPopN5sZysEx5Fr-Q07OhOtg9Nn4hIqiL5z8A`,
                    'x-webapi-return-resource': true
                }
            })
            const responseObj = {
                url: `GET ${`https://int-ds.sit1.vcilabs.com/v1/applications/${pod}/datasets?q=name.contains("${newDatasetName}")`}`,
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
