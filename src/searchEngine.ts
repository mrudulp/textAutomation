export class searchTextEngine{

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
    getCenter(rect: any) {
        // console.log("Center::",rect)
        return {
            x:rect.x + rect.width/2,
            y:rect.y + rect.height/2
        }
    }

    /**
     * Anchors need to be exact to find a perfect match.
    *  Hence we use normalise
     * @param page
     * @param anchorText
     */
   async getAnchorWithText(page:any, anchorText:any)  {
        const anchorSelector = `(//body//*[normalize-space(text())='${anchorText}'])`
       const anchorElement = await page.$(anchorSelector);
       const anchorElementBox = await anchorElement.boundingBox();
       return anchorElementBox
    }

    /**
    We need only partial text.
    We rely on anchor to help us locate exact link/button etc.. element
    that needs an action
    */
   async getAllElementsWithText (page:any, elementText:any) {
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
        const anchorBox = await this.getBoundingBoxes(anchorElement)
        const anchorCenter = this.getCenter(anchorBox)
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
        const ctae_centers = ctae_boxes.map(x => this.getCenter(x))
        const distances: number[] = ctae_centers.map(x => this.getDistance(x, anchorCenter))
        const min =Math.min(...distances)
        const minIndex = distances.findIndex((x) => x === min)
        return minIndex
    }

    /**
    Logs provided Object to console
    */
    logObject(obj:any){
        console.log("obj::", obj);
    }

}
