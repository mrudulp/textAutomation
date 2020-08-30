//@ts-check

let page: import('playwright').Page;
let browser: import('playwright').Browser;
let context: import('playwright').BrowserContext;
import { firefox, chromium } from 'playwright'
import { textApi } from '../../../../src/core/textapi'
import { expect } from 'chai';
import 'mocha';

describe('Test TextApi Integration', () => {
    const url = "file:///C:/Users/MrudulPendharkar/devel/devspace/js/textAutomation/test/src/formElements.html"

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
    describe('textToClick Test', () => {
        it('On Legacy Button', async function () {
            const tapi = new textApi()
            const textToClick = "<button type=button>"
            const textToVerify = "button type=button Clicked"
            await tapi.textToClick(page, { textToClick: textToClick })
            const val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });
        it('On Legacy Button using Anchor', async function () {
            const tapi = new textApi()
            const textToClick = "This is Button"
            const textForAnchor = "Just another Button"
            const textToVerify = "Just a Button Clicked"

            let val
            val = await tapi.textToClick(page, {textToClick:textToClick, anchorText: `${textForAnchor}`})
            val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On Hyperlink', async function () {
            const tapi = new textApi()
            const textToClick = "Visit Google"
            const textToVerify = "Google Search"

            await tapi.textToClick(page, { textToClick: textToClick, isRedirect:true })
            const val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On HyperLink using Anchor', async function () {
            const tapi = new textApi()
            const textToClick = "Not Google"
            const textForAnchor = "Just another Button"
            const textToVerify = "Tired of being tracked online?"

            await tapi.textToClick(page, {textToClick:textToClick, anchorText: textForAnchor, isRedirect: true, timeout:2000 })
            const val = await tapi.textToVerify(page, textToVerify)
            expect(val).true
        })
        it('On Input of Type Button', async function () {
            const tapi = new textApi()
            const textToClick = "<input type=button>"
            const textToVerify = "input type=button"
            await tapi.textToClick(page, { textToClick: textToClick })
            const val = await tapi.textToVerify(page, `${textToVerify} Clicked`)
            expect(val).true
        });

        it('On Input Button using Anchor', async function () {
            const tapi = new textApi()
            const textToClick = "<input type=button2>"
            const textForAnchor = "Just another Button"
            const textToVerify = "Just an Input Button Clicked"

            let val
            val = await tapi.textToClick(page, {textToClick:textToClick, anchorText: `${textForAnchor}`})
            val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On CheckBox using Anchor', async function () {
            const tapi = new textApi()
            const textForAnchor = "Choice B"
            const type = "checkbox"

            let val
            val = await tapi.getInputElementValue(page, {anchorText:textForAnchor, type:'checkbox'}).catch(e=>console.log(e))
            expect(val).equal(false)
            val = await tapi.textToClick(page, {type:type, anchorText: `${textForAnchor}`})
            val = await tapi.getInputElementValue(page, {anchorText:textForAnchor, type:'checkbox'}).catch(e=>console.log(e))
            expect(val).equal(true)
        });

        it('On RadioButton using Anchor', async function () {
            const tapi = new textApi()
            const textForAnchor = "Option 2"
            const type = "radio"

            let val
            val = await tapi.getInputElementValue(page, {anchorText:textForAnchor, type:'radio'}).catch(e=>console.log(e))
            expect(val).equal(false)
            val = await tapi.textToClick(page, {type:type, anchorText: `${textForAnchor}`})
            val = await tapi.getInputElementValue(page, {anchorText:textForAnchor, type:'radio'}).catch(e=>console.log(e))
            expect(val).equal(true)
        });
        it('On Div Menus');
    });
});