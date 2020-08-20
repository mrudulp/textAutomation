// @ts-check
/** @type {import('playwright').Page} */
import { searchTextEngine } from './searchEngine';
import { strict as assert } from 'assert';
import {
    VerifyTextOptions, ClickTextOptions,
    EnterTextOptions, InputElementOptions,
    SelectOptions, ElementValueOptions
} from './types/textapitypes'
import { Page } from 'playwright';

export class textApi {
    ste: searchTextEngine;
    constructor() {
        this.ste = new searchTextEngine();
    }

    /**
     *
     * @param page      Handle to Page
     * @param textToFind    TextToFind
     * @param options   Optional parameters to determie operations. Check VerifyTextOptions for more information
     */
    async textToVerify(page: Page, textToFind: string, options?: VerifyTextOptions) {

        const elements = await page.$$(`text=${textToFind}`)
        const elementLength = elements.length
        console.log("Element Length::", elementLength, ":: TexToFind::", textToFind)
        if (elementLength)
            return true
        else
            return false
    }

    /**
     *
     * @param page      Handle to Page
     * @param options
     */
    async textToClick(page: Page, options?: ClickTextOptions) {
        let elements: any = []
        let element
        if (options?.textToClick !== undefined) {
            elements = await page.$$(`text=${options?.textToClick}`)
        } else if (options?.type !== undefined) {
            const typetext = `[type="${options?.type}"]`
            elements = await page.$$(typetext)
        }
        const elementLength = elements.length
        if (elementLength > 1) {
            if (options?.index !== undefined) {
                element = elements[options.index-1]
            } else if (options?.anchorText !== undefined) {
                element = await this.ste.getClosestElement(page, options.anchorText, elements);
            } else {
                assert.equal(elementLength, 1, "Found More than one Element to click, Provide an anchor or index to determine which element to click")
            }
        } else if (elementLength==1){
            element = elements[0]
        } else {
            console.log("ClickText:: NO ELEMENT FOUND... IGNORING & RETURNING")
            return
        }
        await element.click();
    }

    /**
     *
     * @param page      Handle to Page
     * @param textToEnter
     * @param options Element can be found using attributes placeholder, value or anchorText
     *  Works only with input & textarea. Following input types are supported
     *  input[type = email], input[type = number], input[type = password]
     *  input[type = search], input[type=tel], input[type=text], input[type=url]
     */
    async enterText(page: Page, textToEnter: string, options?: EnterTextOptions) {
        let element:any
        const elementByPlaceholder = await page.$(`[placeholder='${options?.textToFind}']`)
        const elementByValue = await page.$(`[value='${options?.textToFind}']`)
        if (elementByPlaceholder) {
            element = elementByPlaceholder
        }
        else if (elementByValue) {
            element = elementByValue
        }
        else if (options?.index !== undefined) {
            const elements = await page.$$("\
            input[type = email], input[type = number], input[type = password], \
            input[type = search], input[type=tel], input[type=text], input[type=url], textarea")
            element = elements[options.index-1]
        }
        else if (options?.anchorText !== undefined) {
            /* Finding nearest element based on anchor text */
            const elements = await page.$$("\
            input[type = email], input[type = number], input[type = password], \
            input[type = search], input[type=tel], input[type=text], input[type=url], textarea")

            element = await this.ste.getClosestElement(page, options.anchorText, elements)
        }
        if (options?.clearText !== undefined)
            await element.fill('')
        await element.fill(textToEnter)
    }
    /**
     *
     * @param page
     * @param options
     *  For Input type=image -- options.alt
     *  For Input type=checkbox -- options.type=checkbox & options.anchor=anchorText
     *  For Input type=radio -- options.type=radio & options.anchor=anchorText
     *  For Input type=text,tel,number,url,search,password,email -- options.placeholder=placeholderText
     *  For Input type=button -- options.value=button, reset, submit
     *  For Input type=range -- options.type=range & options.anchor=anchorText
     */
    async getInputElementValue(page: Page, options: InputElementOptions) {
        let element: any
        let elements: any = []
        if (options.placeholder !== undefined) {
            element = await page.$(`[placeholder='${options?.placeholder}']`)
        }
        if (options.value !== undefined) {
            element = await page.$(`[value='${options?.value}']`)
        }
        if (options.alt !== undefined) {
            element = await page.$(`[alt='${options?.alt}']`)
        }
        if (options.type !== undefined) {
            elements = await page.$$(`[type='${options.type}']`)
        }
        if (options.index !== undefined) {
            element = elements[options.index - 1]
        }
        if (options.anchorText !== undefined) {
            if (elements.length == 0)
                elements = await page.$$("input, textarea")
            element = await this.ste.getClosestElement(page, options.anchorText, elements)
        }
        if (options.type === "checkbox" || options.type === "radio") {
            return await element!.evaluate((e: any) => e.checked)
        } else {
            return await element!.evaluate((e: any) => e.value)
        }
        // const elements = await page.$$("input, textarea")
    }

    async getRangeValue(page: Page, options: InputElementOptions) {
        let element: any
        let elements = await page.$$('[type="range"]')

        if (options.index !== undefined) {
            element = elements[options.index - 1]
        } else if (options.anchorText !== undefined) {
            element = await this.ste.getClosestElement(page, options.anchorText, elements)
        }
        return await element!.evaluate((e: any) => e.value)
    }

    async setRangeValue(page: Page, options: InputElementOptions) {
        /**
         * Todo: Check if we can merge this function to enterText.
         */
        let element:any
        let elements:any = []
        elements = await page.$$("[type='range']")
        if (options.index !== undefined) {
            element = elements[options.index]
        } else if (options.anchorText !== undefined) {
            element = await this.ste.getClosestElement(page, options.anchorText, elements)
        }
        return await element.evaluate((e:any, value:any)=>e.value = value,options.value)
    }

    async selectText(page: Page, options: SelectOptions) {
        let element:any
        let elements:any = []
        elements = await page.$$("select")
        if (options.index !== undefined) {
            element = elements[options.index]
        } else if (options.anchorText !== undefined) {
            element = await this.ste.getClosestElement(page, options.anchorText, elements)
        }
        element.selectOption(options.selectText)
        return await element.evaluate((e:any, value:any)=>e.value = value,options.selectText)
    }

    async getElementValue(page: Page, options: ElementValueOptions) {
        const elements = await page.$$(`${options.elementType}`)
        let element:any
        if (options.index !== undefined) {
            element = elements[options.index-1]
        } else if (options.anchorText !== undefined) {
            element = await this.ste.getClosestElement(page, options.anchorText, elements)
        }
        return await element!.evaluate((e: any) => e.value)
    }
}