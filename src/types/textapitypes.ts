export interface VerifyTextOptions{
    fullCompare?: boolean
    anchorText?:string
}

export interface ClickTextOptions{
    anchorText?:string
}

export interface EnterTextOptions{
    anchorText?: string,
    textToFind?: string,
    clearText?:boolean
}