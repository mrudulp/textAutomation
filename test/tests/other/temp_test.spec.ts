import { TextApi } from '../../../src/textapi'
// import TextApi =  require('../../../src/textApi');


import { expect } from 'chai';
import 'mocha';

describe('Test Bing Page Integration', () => {
    it('On Bing Page', async function () {
        const textapi = new TextApi()
        const browserOptions = { headless: false, slowMo: 10, args: ['--start-fullscreen'] }
        const browserName = "chrome"
        const context = await textapi.newBrowserContext(browserName, browserOptions)
        const page = await textapi.newPage(context)
        const url = "https://www.bing.com"
        await page.goto(url);
        console.log(page.url());
        await context.close()
        await textapi.closeBrowser()
    })
})