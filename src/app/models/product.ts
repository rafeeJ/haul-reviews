export interface Product {
    ID: number, // User inputted
    title: string, // Parsed from website 
    sizes: Array<string>, // Parsed from website 
    colours: Array<string> // Parsed from website 
    origin: "TaoBao" | "Weidian" // One or the other
}

export interface ProductSubmission{
    ID: number,
    title: string,
    origin: "TaoBao" | "Weidian",
    size?: string,
    colour?: string,
    price: number,
    weight: number,
    comments: string,
    inspectionPhotoURL: string,
    inhandPhotoURL: string,
    recommend: boolean
}

export interface ProductListItem {
    ID: number, 
    origin: "TaoBao" | "Weidian", 
}