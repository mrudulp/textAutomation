import { searchTextEngine } from './searchEngine';
import { strict as assert } from 'assert';
import {VerifyTextOptions, ClickTextOptions, EnterTextOptions } from './types/textapitypes'

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

    async enterText(page: any, textToEnter: string, options?: EnterTextOptions) {
        const elementByPlaceholder = await page.$(`[placeholder='${options?.textToFind}']`)
        const elementByValue = await page.$(`[value='${options?.textToFind}']`)
        if (elementByPlaceholder) {
            if (options?.clearText !== undefined)
                await elementByPlaceholder.fill('')
            await elementByPlaceholder.fill(textToEnter)
        }
        else if (elementByValue) {
            if (options?.clearText !== undefined)
                await elementByPlaceholder.fill('')
            await elementByValue.fill(textToEnter)
        }
        else if (options?.anchorText !== undefined) {
            const elements = await page.$$("\
            input[type = email], input[type = number], input[type = password], \
            input[type = search], input[type=tel], input[type=text], input[type=url], textarea")

            const anchorElements = await page.$$(`text ="${options?.anchorText}"`)

            assert.equal(anchorElements.length , 1, "Anchor needs to be unique &/or valid")
            const anchorElement = anchorElements[0]
            const minIndex = await this.ste.getClosestElementIndex(anchorElement, elements)
            const element = elements[minIndex]
            if (options?.clearText !== undefined)
                await element.fill('')
            await element.fill(textToEnter)
        }
    }
}