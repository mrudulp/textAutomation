import { searchTextEngine } from './searchEngine';
import { textApi } from './textapi'
import { strict as assert } from 'assert';

const { webkit, firefox, chromium, ElementHandle } = require('playwright');
let page, browser, context

async function testVerifyText(page:any) {
    const tapi = new textApi();
    let textToVerify = "Blockquotes"
    let val = await tapi.textToVerify(page, textToVerify)
    console.log("Text found::", val);
    assert.ok(val)

    textToVerify = "Greek paragraphos"
    val = await tapi.textToVerify(page, textToVerify)
    console.log("Text found::", val);
    assert.equal(val, false)
    val = await tapi.textToVerify(page, textToVerify, false)
    console.log("Text found::", val);
    assert.equal(val, true)
}

async function testClickText(page: any) {
    const tapi = new textApi()
    const textToClick = "Visit Google"
    const textToVerify = "Google Search"
    await tapi.textToClick(page, textToClick)
    const val = await tapi.textToVerify(page, `${textToVerify}`)
    console.log(val)
}

(async () => {
    // Create a context
    // Create a page.
    browser = await chromium.launch({ headless: false, slowMo: 50, devtools:true });
    context = await browser.newContext({ acceptDownloads: true });
    page = await context.newPage();
    // const url = "http://jpdtest.intra.saunalahti.fi/intra/LoginJPD"
    const url = "file:///C:/Users/MrudulPendharkar/devel/devspace/js/textAutomation/test/src/sampleApp.html"

    await page.goto(url);
    // const anchorText = "JPD Sisäänkirjautuminen";
    // await findNearestElementAndClick(page)
    // await testVerifyText(page)
    await testClickText(page)
    await browser.close()
})().catch(e=>console.error("Error is::",e));