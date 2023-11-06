import { promos } from "./promos";

export function checking (promo) {
    if (promos.promo.includes(promo)) {
        return promos.percentage;
    } else {
        return false
    }
}