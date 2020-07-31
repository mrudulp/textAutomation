import { searchTextEngine } from './searchEngine';
import { strict as assert } from 'assert';
import {VerifyTextOptions, ClickTextOptions, FillTextOptions } from './types/textapitypes'

export class textApi{
    ste: searchTextEngine;
    constructor() {
        this.ste = new searchTextEngine();
    }
    /**
     *
     * @param textToFind TextToFind
     * @param fullCompare True/False. Default is True. If False partialComparision will be done
     */
    async textToVerify(page: any, textToFind: string, options?:VerifyTextOptions) {
        const elements = await page.$$(`text=${textToFind}`)
        const elementLength = elements.length
        console.log("Element Length::",elementLength, ":: TexToFind::",textToFind)
        if (elementLength)
            return true
        else
            return false
    }

    /**
     *
     * @param page
     * @param textToClick
     * @param options
     *                  anchor:String -- String which can be used as an anchor to the element
     */
    async textToClick(page: any, textToClick: string, options?:ClickTextOptions ) {
        const elements = await page.$$(`text=${textToClick}`)
        const elementLength = elements.length
        let element
        if (elementLength >= 1) {
            if (options?.anchorText === undefined) {
                assert.equal(elementLength,1, "Found More than one Element to click, Provide an anchor to determine which element to click")
                element = elements[0]
            } else if (options?.anchorText !== undefined) {
                const anchorElements = await page.$$(`text =${options?.anchorText}`)
                assert.equal(anchorElements.length , 1, "Anchor needs to be unique &/or valid")
                const anchorElement = anchorElements[0]
                const minIndex = await this.ste.getClosestElementIndex(anchorElement, elements)
                element = elements[minIndex]
            }
        await element.click();
        }
    }

    async enterText(page: any, textToEnter: string, textToFind: string, options?: FillTextOptions) {
        // const elements = await page.$$(`${textToFind}`)
        // await elements[0].fill(textToEnter)
        await page.fill(`[placeholder='${textToFind}']`, textToEnter)
    }
}