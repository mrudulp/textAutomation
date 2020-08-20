export interface InputElementOptions{
    // Covers Any HTMLInputElement & TextArea Elements
    placeholder?: string,   //attribute placeholder of input element
    type?: string,  // type of input for more info about input types (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input)
    value?: string, //attribute value of input element. Can be used both for setting new value or  get element using value attribute
    alt?: string // attribute alt of input element. Valid for type=image
    anchorText?: string, // Text which seems to be closest to the element
//    by?: number // Value by which input value needs to be increased. Can't be used alone. It needs to be used with type option. Valid for Range, ??Date??
    index?:number // index of element when multiple elements are found  TODO:: Index still not tested
}
export interface VerifyTextOptions{
    fullCompare?: boolean   // Full or partial compare. By default it fullcompare
}

export interface ClickTextOptions{
    anchorText?: string,
    textToClick?: string,
    type?: string,
    index?:number // index of element when multiple elements are found
}

export interface EnterTextOptions{
    anchorText?: string,  // Text which seems to be closest to the element
    // Todo:: Do we need atrribute as an option
    textToFind?: string,  // text that should be used to find input/text element. This will look for placeholder or value attribute.
    clearText?: boolean, // Should the text be cleared or not. Default clears the text  TODO:: ClearText still not tested
    index?:number // index of element when multiple elements are found
}

export interface SelectOptions{
    selectText?: string,
    anchorText?: string,  // Text which seems to be closest to the element
    index?:number // index of element when multiple elements are found  TODO:: Index still not tested
}

export interface ElementValueOptions{
    elementType?: string,
    anchorText?: string,
    index?:number // index of element when multiple elements are found  TODO:: Index still not tested
}