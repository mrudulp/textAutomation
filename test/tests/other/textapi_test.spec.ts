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
import { TextApi } from '../../../src/textapi'
// import TextApi =  require('../../../src/textApi');
import { expect } from 'chai';
import 'mocha';



describe('Test TextApi Integration', () => {
    const url = "http://jpdtest.intra.saunalahti.fi/intra/LoginJPD"

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
        // await page.goto(url);
    });



    afterEach(async function handleEachTest() {
        if (this.currentTest?.state === "failed") {
            await page.screenshot({path: 'screenshot_failed.png'})
        }
        await page.close();
        await context.clearCookies();
    })
    describe('Elisa Test', () => {
        it('On Home Page', async function () {
            const tapi = new TextApi()
            // const anchorText = "JPD Sisäänkirjautuminen"
            const textToClick = "Kirjaudu"
            const textToVerify = "Haetaan taulusta"
            // const userTextToFind = "SLuser"
            // const pwdTextToFind = "SLpass"
            await tapi.enterText(page, 'ee913264', {index: 1})
            await tapi.enterText(page, 'mrpe64', {index: 2})
            await tapi.textToClick(page, {textToClick: textToClick, index:1})
            const val = await tapi.textToVerify(page, `${textToVerify}`)
            expect(val).true
        });

        it('On Reseller Webpage', async function () {
            const tapi = new TextApi()
            const RESELLER_username = 'jpdts01'
            const RESELLER_password = 'jpdsell'
            const url = 'https://kauppa-test.elisa.fi/myynti/'
            await page.goto(url)
            await tapi.enterText(page, RESELLER_username, { anchorText: 'Käyttäjätunnus' })
            await tapi.enterText(page, RESELLER_password, { anchorText: 'Salasana' })
            // await page.click("text=Kirjaudu")
            // await page.waitForLoadState('networkidle')
            // // await page.waitForTimeout(1000);
            // await page.click("text=Verkkokauppaan")
            // await page.waitForLoadState('networkidle')
            // await page.waitForTimeout(5000);
            await tapi.textToClick(page, { textToClick: "Kirjaudu", isRedirect: true, timeout:5000 })
            await tapi.textToClick(page, { textToClick: "VERKKOKAUPPAAN", isRedirect: true, timeout: 5000}) // Wait for navigation to complete

            // page.waitForSelector("text='Tuotteet ja palvelut}")
            //  await tapi.textToVerify(page,"Tuotteet ja palvelut" )
            await tapi.enterText(page, "060785-383T", { textToFind: "Hetu tai y-tunnus" })
            await tapi.textToClick(page, { textToClick: "Tuotteet ja palvelut" })
            await tapi.textToClick(page, { textToClick: "Nettiliittymät" })
            await tapi.textToClick(page, { textToClick: "Netti kotiin", isRedirect: true })
            await tapi.enterText(page, "21530", { textToFind: "Postinumero" })
            await tapi.enterText(page, "Arolantie 65", { textToFind: "Katuosoite" })
            console.log("Testing")
        });

        it('Test Currency App', async function () {
            const tapi = new TextApi()
            const url = 'http://localhost:3000/historical'
            await page.goto(url)
            await tapi.textToClick(page,{textToClick:"Fetch Rates"})
            // await page.click('text=Fetch Rates')
            // await page.waitForLoadState("networkidle")
            const val = await tapi.textToVerify(page, "Currency Rates")
            await tapi.textToClick(page, { textToClick: "Go to Google" })
            await tapi.textToVerify(page, "Google ")
            expect(val).equal(true)
        })

    });
});