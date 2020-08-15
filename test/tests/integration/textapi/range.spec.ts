//@ts-check

let page: import('playwright').Page;
let browser: import('playwright').Browser;
let context: import('playwright').BrowserContext;
import { firefox, chromium } from 'playwright'
import { textApi } from '../../../../src/textapi'
import { expect } from 'chai';
import 'mocha';



describe('Test TextApi Integration', () => {
    const url = "file:///C:/Users/MrudulPendharkar/devel/devspace/js/textAutomation/test/src/sampleApp.html"

    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 10, args: ['--start-fullscreen']  });
        // Create a context
        context = await browser.newContext({ acceptDownloads: true });
    });

    after(async () => {
        await context.close()
        await browser.close();
    });

    beforeEach(async () => {
        // Create a page.
        page = await context.newPage();
        await page.goto(url);
    });

    afterEach(async function handleEachTest() {
        if (this.currentTest?.state === "failed") {
            await page.screenshot({path: 'screenshot_failed.png'})
        }
        await page.close();
        await context.clearCookies();
    })
    describe('Range Test', () => {
        it('Set Range', async function () {
            const tapi = new textApi()
            const textForAnchor = "Range input"
            const type = "radio"

            let val
            val = await tapi.getRangeValue(page, {anchorText:textForAnchor}).catch(e=>console.log(e))
            expect(val).equal('10')
            await tapi.setRangeValue(page, {anchorText:textForAnchor, value:'20'}).catch(e => console.log("E::",e))
            val = await tapi.getRangeValue(page, {anchorText:textForAnchor}).catch(e=>console.log(e))
            expect(val).equal('20')
        })

        it('Get Range', async function () {
            const tapi = new textApi()
            const textForAnchor = "Range input"
            const type = "radio"

            const val = await tapi.getRangeValue(page, {anchorText:textForAnchor}).catch(e=>console.log(e))
            expect(val).equal('10')
        })
    })
});