//@ts-check
// ...
// const { firefox } = require('playwright');

// var sfh = require('../../../src/textapi');

let page: import('playwright').Page;
let browser: import('playwright').Browser;
let context: import('playwright').BrowserContext;
// let textApi: import('../../src/textapi').textApi;
// let expect: import('chai');
import { firefox, chromium } from 'playwright'
import { textApi } from '../../../src/textapi'
import { expect } from 'chai';
import 'mocha';



describe('Test TextApi Integration', () => {
    const url = "file:///C:/Users/MrudulPendharkar/devel/devspace/js/textAutomation/test/src/sampleApp.html"

    before(async () => {
        // Initialising AutoIt
        browser = await chromium.launch({ headless: false, slowMo: 10, args: ['--start-fullscreen']  });
        // Create a context
        context = await browser.newContext({ acceptDownloads: true });
        // browser.ov
        // await context.grantPermissions(['notifications'], "https://resourceful-bear-mjuv0o-dev-ed.my.salesforce.com")
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
            await tapi.textToClick(page, textToClick)
            const val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });
        it('On Legacy Button using Anchor', async function () {
            const tapi = new textApi()
            const textToClick = "This is Button"
            const textForAnchor = "Just another Button"
            const textToVerify = "Just a Button Clicked"
            // let val = await tapi.textToClick(page, textToClick)
            let val
            val = await tapi.textToClick(page, textToClick, {anchorText: `${textForAnchor}`})
            val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On Hyperlink', async function () {
            const tapi = new textApi()
            const textToClick = "Visit Google"
            const textToVerify = "Google Search"
            // await tapi.textToClick(page, textToClick)
            await Promise.all([
                page.waitForNavigation({waitUntil:"networkidle"}),
                await tapi.textToClick(page, textToClick),
            ]);
            const val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On HyperLink using Anchor', async function () {
            const tapi = new textApi()
            const textToClick = "Not Google"
            const textForAnchor = "Just another Button"
            const textToVerify = "Tired of being tracked online?"

            await Promise.all([
                page.waitForNavigation({waitUntil:"networkidle"}),
                await tapi.textToClick(page, textToClick, {anchorText: `${textForAnchor}`}),
            ])
            const val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        })
        it('On Input of Type Button', async function () {
            const tapi = new textApi()
            const textToClick = "<input type=button>"
            const textToVerify = "input type=button"
            await tapi.textToClick(page, textToClick)
            const val = await tapi.textToVerify(page, `${textToVerify} Clicked`)
            expect(val).true
        });

        it('On Input Button using Anchor', async function () {
            const tapi = new textApi()
            const textToClick = "<input type=button2>"
            const textForAnchor = "Just another Button"
            const textToVerify = "Just an Input Button Clicked"
            // let val = await tapi.textToClick(page, textToClick)
            let val
            val = await tapi.textToClick(page, textToClick, {anchorText: `${textForAnchor}`})
            val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On Div Menus');
    });

    describe('textToVerify Test', () => {
        it('On Legacy Button', async function () {
            const tapi = new textApi()
            let textToVerify = "This is Button"
            // let val = await tapi.textToClick(page, textToClick)
            const val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On Hyperlink Element', async function () {
            const tapi = new textApi()
            const textToVerify = "This is a text link"
            const val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });
    });

    describe('enterText Test', () => {
        it('On Input Searching with placeholder text');
        it('On Input using only Anchor element');
        it('On TextArea', async () => {
            const placeholder = "Enter your message here"
            const textToEnter = "Hello World"
            const tapi = new textApi()
            await tapi.enterText(page, textToEnter, {textToFind:placeholder})
            const element = await page.$(`[placeholder='${placeholder}']`)
            const val = await element!.evaluate((e:any) => e.value)
            // const val = await tapi.textToVerify(page, `${textToEnter}`)
            expect(val).equal(textToEnter)
        })

        it('On TextArea using Anchor', async () => {
            const anchorText = "This is Textarea"
            const placeholder = "Enter your message here"
            const textToEnter = "Hello World"
            const tapi = new textApi()
            // await tapi.enterText(page, textToEnter, { anchorText: anchorText })
            await tapi.enterText(page, textToEnter, { anchorText: anchorText }).catch(e => console.log(e))
            const element = await page.$(`[placeholder='${placeholder}']`)
            const val = await element!.evaluate((e:any) => e.value)
            // const val = await tapi.textToVerify(page, `${textToEnter}`)
            expect(val).equal(textToEnter)
        })
        it('On Password field using Anchor', async () => {
            const anchorText = "Password"
            const placeholder = "Type your Password"
            const textToEnter = "Hello World"
            const tapi = new textApi()
            // await tapi.enterText(page, textToEnter, { anchorText: anchorText })
            await tapi.enterText(page, textToEnter, { anchorText: anchorText }).catch(e => console.log(e))
            const element = await page.$(`[placeholder='${placeholder}']`)
            const val = await element!.evaluate((e:any) => e.value)
            // const val = await tapi.textToVerify(page, `${textToEnter}`)
            expect(val).equal(textToEnter)
        })
        it('On Calendar Element');
        it('On Input like Div Element');// innerHTML to append
        it('On [contenteditable] Element');
    });

    describe('Slider Test', () => {
        it('On Simple Slider')
    })

    describe('Select Test', () => {
        it('On Div Selects');
        it('On Regular Selects');
    })

    describe('OptionsOrCheckbox Test', () => {
        it('On Option Button');
        it('On Checkbox');
    })
});