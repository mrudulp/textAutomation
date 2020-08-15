// @ts-check
/** @type {import('playwright').Page} */

let page: import('playwright').Page;
let browser: import('playwright').Browser;
let context: import('playwright').BrowserContext;
import { firefox, chromium } from 'playwright'
import { textApi } from '../../../../src/textapi'
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

    describe('GetInputValue Test', () => {

        it('on Type=tel', async function () {
            const placeholder = "(999) 999-9999"
            const tapi = new textApi()
            const textToEnter = "(111) 456-1234"
            await tapi.enterText(page, textToEnter, { textToFind: placeholder })
            const val = await tapi.getInputElementValue(page, {placeholder:placeholder})
            expect(val).equal(textToEnter)
        })
        it('on Type=text', async function () {
            const placeholder = "Text Input"
            const tapi = new textApi()
            const textToEnter = "This is not so long text"
            await tapi.enterText(page, textToEnter, { textToFind: placeholder })
            const val = await tapi.getInputElementValue(page, {placeholder:placeholder})
            expect(val).equal(textToEnter)
        })

        it('on Type=email', async function () {
            const placeholder = "name@email.com"
            const tapi = new textApi()
            const textToEnter = "myemail@email.com"
            await tapi.enterText(page, textToEnter, { textToFind: placeholder })
            const val = await tapi.getInputElementValue(page, {placeholder:placeholder})
            expect(val).equal(textToEnter)
        })

        it('on Type=number', async function () {
            const placeholder = "Enter a Number"
            const tapi = new textApi()
            const textToEnter = "12345678"
            await tapi.enterText(page, textToEnter, { textToFind: placeholder })
            const val = await tapi.getInputElementValue(page, {placeholder:placeholder})
            expect(val).equal(textToEnter)
        })

        it('on Type=password', async function () {
            const placeholder = "Type your Password"
            const tapi = new textApi()
            const textToEnter = "Hello World"
            await tapi.enterText(page, textToEnter, { textToFind: placeholder })
            const val = await tapi.getInputElementValue(page, {placeholder:placeholder})
            expect(val).equal(textToEnter)
        })

        it('on Type=search', async function () {
            const placeholder = "Enter Search Term"
            const tapi = new textApi()
            const textToEnter = "Hello World"
            await tapi.enterText(page, textToEnter, { textToFind: placeholder })
            const val = await tapi.getInputElementValue(page, {placeholder:placeholder})
            expect(val).equal(textToEnter)
        })

        it('on Type=url', async function () {
            const placeholder = "http://yoursite.com"
            const tapi = new textApi()
            const textToEnter = "http://www.google.com"
            await tapi.enterText(page, textToEnter, { textToFind: placeholder })
            const val = await tapi.getInputElementValue(page, {placeholder:placeholder})
            expect(val).equal(textToEnter)
        })

        it('on Type=time')

        it('on Type=CheckBox Value Checked', async function () {
            const anchor = "Choice A"
            const tapi = new textApi()
            const val = await tapi.getInputElementValue(page, {anchorText:anchor, type:'checkbox'}).catch(e=>console.log(e))
            expect(val).equal(true)
        })

        it('on Type=CheckBox Value Unchecked', async function () {
            const anchor = "Choice B"
            const tapi = new textApi()
            const val = await tapi.getInputElementValue(page, {anchorText:anchor, type:'checkbox'}).catch(e=>console.log(e))
            expect(val).equal(false)
        })
        it('on Type=radio Value Checked', async function () {
            const anchor = "Option 1"
            const tapi = new textApi()
            const val = await tapi.getInputElementValue(page, {anchorText:anchor, type:'radio'}).catch(e=>console.log(e))
            expect(val).equal(true)
        })

        it('on Type=radio Value UnChecked', async function () {
            const anchor = "Option 2"
            const tapi = new textApi()
            const val = await tapi.getInputElementValue(page, {anchorText:anchor, type:'radio'}).catch(e=>console.log(e))
            expect(val).equal(false)
        })

        it('on Type=range', async function () {
            const anchor = "Range input"
            const tapi = new textApi()
            const val = await tapi.getInputElementValue(page, {anchorText:anchor, type:'range'}).catch(e=>console.log(e))
            expect(val).equal('10')
        })
        it('on Type=date')
        it('on Type=datetime-local')
        it('on Type=week')
        it('on Type=datetime')
        it('on Type=month')


        it('on Type=Color')
        it('on Type=file')
        it('on Type=hidden')
        it('on Type=image')

        it('on Type=Button', async function() {
            const value = "<input type=button>"
            const tapi = new textApi()
            const val = await tapi.getInputElementValue(page, {value:value})
            expect(val).equal(value)
        })

        it('on Type=reset', async function () {
            const value = "<input type=reset>"
            const tapi = new textApi()
            const val = await tapi.getInputElementValue(page, {value:value})
            expect(val).equal(value)
        })

        it('on Type=submit', async function () {
            const value = "<input type=submit>"
            const tapi = new textApi()
            const val = await tapi.getInputElementValue(page, {value:value})
            expect(val).equal(value)
        })

    })
});