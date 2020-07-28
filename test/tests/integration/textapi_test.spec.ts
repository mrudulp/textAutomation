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
        browser = await chromium.launch({ headless: true, slowMo: 50 });
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
    describe('ClickText Tests', () => {
        it('Test ClickText Functionality on Legacy Button', async function () {
            const tapi = new textApi()
            const textToClick = "<button type=button>"
            const textToVerify = "button type=button Clicked"
            await tapi.clickText(page, textToClick)
            const val = await tapi.verifyText(page, `${textToVerify}`)
            expect(val).true
        });
        it('Test ClickText Functionality on Legacy Button using Anchor', async function () {
            const tapi = new textApi()
            const textToClick = "This is Button"
            const anchorText = "Just another Button"
            const verifyText = "Just a Button Clicked"
            // let val = await tapi.clickText(page, textToClick)
            let val
            const options = { 'anchor': `${anchorText}` }
            val = await tapi.clickText(page, textToClick, options)
            val = await tapi.verifyText(page, `${verifyText}`)
            expect(val).true
        });

        it('Test ClickText Functionality on Hyperlink', async function () {
            const tapi = new textApi()
            const textToClick = "Visit Google"
            const textToVerify = "Google Search"
            await tapi.clickText(page, textToClick)
            const val = await tapi.verifyText(page, `${textToVerify}`)
            expect(val).true
        });

        it('Test ClickText Functionality on HyperLink using Anchor', async function () {
            const tapi = new textApi()
            const textToClick = "Not Google"
            const anchorText = "Just another Button"
            const verifyText = "Search the web without being tracked"
            // let val = await tapi.clickText(page, textToClick)
            let val
            const options = { 'anchor': `${anchorText}` }
            val = await tapi.clickText(page, textToClick, options)
            val = await tapi.verifyText(page, `${verifyText}`)
            expect(val).true
        });
        it('Test ClickText Functionality on Input of Type Button', async function () {
            const tapi = new textApi()
            const textToClick = "<input type=button>"
            const verifyText = "input type=button"
            await tapi.clickText(page, textToClick)
            const val = await tapi.verifyText(page, `${verifyText} Clicked`)
            expect(val).true
        });

        it('Test ClickText Functionality on Input Button using Anchor', async function () {
            const tapi = new textApi()
            const textToClick = "<input type=button2>"
            const anchorText = "Just another Button"
            const verifyText = "Just an Input Button Clicked"
            // let val = await tapi.clickText(page, textToClick)
            let val
            const options = { 'anchor': `${anchorText}` }
            val = await tapi.clickText(page, textToClick, options)
            val = await tapi.verifyText(page, `${verifyText}`)
            expect(val).true
        });
    });

    describe('VerifyText Tests', () => {
        it('Test VerifyText Functionality for Legacy Button', async function () {
            const tapi = new textApi()
            let textToVerify = "This is Button"
            // let val = await tapi.clickText(page, textToClick)
            const val = await tapi.verifyText(page, `${textToVerify}`)
            expect(val).true
        });

        it('Test VerifyText Functionality for Hyperlink Element', async function () {
            const tapi = new textApi()
            const textToVerify = "This is a text link"
            const val = await tapi.verifyText(page, `${textToVerify}`)
            expect(val).true
        });
    });
});