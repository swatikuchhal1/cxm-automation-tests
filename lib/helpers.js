module.exports = {

    click: async function (page, selector, timeout = 30000) {
        const today = new Date();
        const errorName = 'Error_' + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
        try {
            await page.waitForSelector(selector, { visible: true, timeout })
            await page.click(selector)
        } catch (error) {
            await page.screenshot({ path: `screenshots/errors/${errorName}.png`, fullPage: true })
            throw new Error(`Could not click on the Element: ${selector}`)
        }
    },

    insert: async function (page, selector, text, timeout = 30000) {
        const today = new Date();
        const errorName = 'Error_' + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
        try {
            await page.waitForSelector(selector, { visible: true, timeout })
            await page.type(selector, text)
        } catch (error) {
            await page.screenshot({ path: `screenshots/errors/${errorName}.png`, fullPage: true })
            throw new Error(`Could not type in the Element: ${selector}`)
        }
    },
    clickXPathElement: async function (page, selector, timeout = 30000) {
        const today = new Date();
        const errorName = 'Error_' + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
        try {
            await page.waitForXPath(selector, { visible: true, timeout })
            const [element] = await page.$x(selector)
            await element.click()
        } catch (error) {
            await page.screenshot({ path: `screenshots/errors/${errorName}.png`, fullPage: true })
            throw new Error(`Could not click on the Element: ${selector}`)
        }
    },
    insertXPathElement: async function (page, selector, text, timeout = 30000) {
        const today = new Date();
        const errorName = 'Error_' + today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
        try {
            await page.waitForXPath(selector, { visible: true, timeout })
            const [element] = await page.$x(selector)
            await element.type(text)
        } catch (error) {
            await page.screenshot({ path: `screenshots/errors/${errorName}.png`, fullPage: true })
            throw new Error(`Could not type in the Element: ${selector}`)
        }
    },
    waitForElement: async function (page, selector, timeout = 30000) {
        try {
            await page.waitForSelector(selector, { visible: true, timeout })
        } catch (error) {
            throw new Error(`Element not found: ${selector}`)
        }
    },
    waitForXPathElement: async function (page, selector, timeout = 30000) {
        try {
            await page.waitForXPath(selector, { visible: true, timeout })
        } catch (error) {
            throw new Error(`Element not found: ${selector}`)
        }
    }

}

