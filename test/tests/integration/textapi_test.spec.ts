//@ts-check
// ...
// const { firefox } = require('playwright');

// var sfh = require('../../../src/textapi');

let page: import('playwright').Page;
let browser: import('playwright').Browser;
let context: import('playwright').BrowserContext;
// let textApi: import('../../src/textapi').textApi;
// let expect: import('chai');
import {firefox, chromium} from 'playwright'
import { textApi } from '../../../src/textapi'
import { expect } from 'chai';
import 'mocha';

describe('Test TextApi Integration', () => {
    const url = "file:///C:/Users/MrudulPendharkar/devel/devspace/js/textAutomation/test/src/sampleApp.html"

    before(async () => {
        // Initialising AutoIt
        browser = await chromium.launch({ headless: false, slowMo: 50 });
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

    afterEach(async () => {
        await page.close();
        await context.clearCookies();
    });
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
            const anchorText = "Just another Button"
            const textToVerify = "Just a Button Clicked"
            // let val = await tapi.textToClick(page, textToClick)
            let val
            const options = { 'anchor': `${anchorText}` }
            val = await tapi.textToClick(page, textToClick, options)
            val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On Hyperlink', async function () {
            const tapi = new textApi()
            const textToClick = "Visit Google"
            const textToVerify = "Google Search"
            // await tapi.textToClick(page, textToClick)
            await Promise.all([tapi.textToClick(page, textToClick), page.waitForNavigation()]);
            const val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On HyperLink using Anchor', async function () {
            const tapi = new textApi()
            const textToClick = "Not Google"
            const anchorText = "Just another Button"
            const textToVerify = "Tired of being tracked online? "
            // const textToVerify = "Tired of being tracked online? We can help."
            // let val = await tapi.textToClick(page, textToClick)
            let val
            const options = { 'anchor': `${anchorText}` }
            val = await Promise.all([tapi.textToClick(page, textToClick, options), page.waitForNavigation()]).catch(e=>console.error("Error is::",e) );
            val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });
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
            const anchorText = "Just another Button"
            const textToVerify = "Just an Input Button Clicked"
            // let val = await tapi.textToClick(page, textToClick)
            let val
            const options = { 'anchor': `${anchorText}` }
            val = await tapi.textToClick(page, textToClick, options)
            val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On Input Searching with placeholder text');
        it('On Input using only Anchor element');
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
});