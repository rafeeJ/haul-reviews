export interface Product {
    URL: string, //  User inputted
    title: string, //  Parsed from website 
    sizeOptions: Array<string>, //  Parsed from website 
    colourOptions: Array<string> // Parsed from website 
}

export interface ProductSubmission extends Product{
    price: number,
    weight: number,
    comments: string,
    inspectionPhotoURL: string,
    inhandPhotoURL: string,
    recommend?: boolean
}