export class BasePage {

    async createNewDatasetName() {

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const datasetname = 'Test_Automation_Dataset_' + date + '_' + time;
        return datasetname
    }

    async createNewSchemeName() {

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const schemename = 'Test_Automation_SchemeName_' + date + '_' + time;
        return schemename
    }

    async createNewTempName() {

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const tempname = 'Test_Automation_Temp_' + date + '_' + time;
        return tempname
    }


}

