//@ts-check

let page: import('playwright').Page;
let browser: import('playwright').Browser;
let context: import('playwright').BrowserContext;
import { firefox, chromium } from 'playwright'
import { TextApi } from '../../../../src/textapi'
// import TextApi =  require('../../../../src/textApi');
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

    describe('enterText Test', () => {
        it('On Input Searching with placeholder text');
        it('On Input using only Anchor element');
        it('On TextArea', async () => {
            const placeholder = "Enter your message here"
            const textToEnter = "Hello World"
            const tapi = new TextApi()
            await tapi.enterText(page, textToEnter, { textToFind: placeholder })
            const val = await tapi.getInputElementValue(page, {placeholder:placeholder})
            expect(val).equal(textToEnter)
        })

        it('On TextArea using Anchor', async () => {
            const anchorText = "This is Textarea"
            const placeholder = "Enter your message here"
            const textToEnter = "Hello World"
            const tapi = new TextApi()
            // await tapi.enterText(page, textToEnter, { anchorText: anchorText })
            await tapi.enterText(page, textToEnter, { anchorText: anchorText }).catch((e: any) => console.log(e))
            const val = await tapi.getInputElementValue(page, {placeholder:placeholder})
            expect(val).equal(textToEnter)
        })
        it('On Password field using Anchor', async () => {
            const anchorText = "Password"
            const placeholder = "Type your Password"
            const textToEnter = "Hello World"
            const tapi = new TextApi()
            // await tapi.enterText(page, textToEnter, { anchorText: anchorText })
            await tapi.enterText(page, textToEnter, { anchorText: anchorText }).catch((e: any) => console.log(e))
            const val = await tapi.getInputElementValue(page, {placeholder:placeholder})
            expect(val).equal(textToEnter)
        })
        it('On Calendar Element');
        it('On Input like Div Element');// innerHTML to append
        it('On [contenteditable] Element');
    });

});