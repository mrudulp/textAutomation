import { Page } from "playwright";
import { strict as assert } from 'assert';

/** @type {import('playwright').Page} */
// @ts-check
export class searchTextEngine{

    async getClosestElement(page: Page, anchorText:string, elements: any) {
        const anchorElements = await page.$$(`text =${anchorText}`);
        assert.equal(anchorElements.length, 1, "Anchor needs to be unique &/or valid");
        const anchorElement = anchorElements[0];
        const minIndex = await this.getClosestElementIndex(anchorElement, elements);
        return elements[minIndex];
    }
    /**
     *
     * @param element
     */
    async getBoundingBoxes(element: any) {
        const box = await element.boundingBox();
        return box;
    }

    /**
    Returns center of the rect provided
    */
    getCenter(rect: any, xOffset:any, yOffset:any) {
        // console.log("Center::",rect)
        // Do not add width and height as element size can be different resulting in unpredictable behaviour
        return {
            x:rect.x + xOffset,
            y:rect.y + yOffset
        }
    }

    /**
     * Anchors need to be exact to find a perfect match.
    *  Hence we use normalise
     * @param page
     * @param anchorText
     */
   async getAnchorWithText(page: Page, anchorText:any)  {
        const anchorSelector = `(//body//*[normalize-space(text())='${anchorText}'])`
       const anchorElement = await page.$(anchorSelector);
       const anchorElementBox = await anchorElement!.boundingBox();
       return anchorElementBox
    }

    /**
    We need only partial text.
    We rely on anchor to help us locate exact link/button etc.. element
    that needs an action
    */
   async getAllElementsWithText (page: Page, elementText:any) {
        const anchorSelector = `(//body//*[normalize-space(text())='${elementText}' or @value='${elementText}'])`
       const selectors = await page.$$(anchorSelector)
        return selectors
    }

    /**
    Returns distance between element that needs action & anchor
    */
    getDistance (elementRect:any, anchorRect:any){
        return Math.sqrt(Math.pow((elementRect.x - anchorRect.x), 2) + Math.pow((elementRect.y - anchorRect.y), 2));
    }

    /**
     *
     * @param anchorElement
     * @param elements
     */
    async getClosestElementIndex(anchorElement: any, elements: any) {
        // scrolling to anchor element which should bring actual element in viewport as well
        await this.scrollIntoView(anchorElement)
        const anchorBox = await this.getBoundingBoxes(anchorElement)
        const pageOffsets = await this.getPageOffsets(anchorElement)
        const anchorCenter = this.getCenter(anchorBox, pageOffsets.pageXOffset, pageOffsets.pageYOffset)
        // console.log("Center is:: ", anchorCenter);
        // console.log("Elements are :: ", elements)
        const ctae = Array.from(elements)

        // Wait on all the promises to be completed (https://dev.to/jamesliudotcc/how-to-use-async-await-with-map-and-promise-all-1gb5)
        const ctae_boxes = await Promise.all(
            ctae.map( // Call async function as a normal call
                element => this.getBoundingBoxes(element)
                )
            )
        // console.log(ctae_boxes);
        const ctae_centers = ctae_boxes.map(x => {
            return this.getCenter(x, pageOffsets.pageXOffset, pageOffsets.pageYOffset)
        }, pageOffsets)
        // console.log("Centers::",ctae_centers)
        const distances: number[] = ctae_centers.map(x => this.getDistance(x, anchorCenter))
        // console.log("Dis::", distances)
        const min =Math.min(...distances)
        const minIndex = distances.findIndex((x) => x === min)
        return minIndex
    }

    async scrollIntoView(element: any) {
        await element.evaluate( (e: any) => {
            e.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        });
    }

    async getPageOffsets(element: any) {
        const pageXOffset = await element.evaluate(()=>window.pageXOffset)
        const pageYOffset = await element.evaluate(()=>window.pageYOffset)
        const pageoffsets = {
            pageXOffset: pageXOffset,
            pageYOffset: pageYOffset
        }
        return pageoffsets
    }
    /**
    Logs provided Object to console
    */
    logObject(obj:any){
        console.log("obj::", obj);
    }

}
