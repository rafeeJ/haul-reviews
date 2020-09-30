import { Product, ProductSubmission } from './product';

export interface Haul {
    uid: string,
    title?: string,
    productList: Array<ProductSubmission>,
    shippingFee?: number 
}
