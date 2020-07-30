import { Product } from './product';

export interface Haul {
    uid: string
    title?: string
    productList: Array<Product>
}
