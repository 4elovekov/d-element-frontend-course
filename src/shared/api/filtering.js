import { goods } from "./goods";

export function Filtering (category) {
    if (category) {
        console.debug("goods[0]: ", goods[0])
        return goods[0]
    } else {
        return null
    }
    
}