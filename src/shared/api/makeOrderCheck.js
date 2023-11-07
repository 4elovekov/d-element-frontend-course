import { goods } from "./consts/goods";
import { promos } from "./consts/promos";

export function makeOrderCheck (promocode, ids) {
    let price = 0;
    let count = 0;
    let percentage = 0;
    let isPromoAvailable = false;
    goods.forEach((good) => {
        if (ids.includes(good.data.idProduct)) {
            price += good.data.price;
            count += 1;
        }
    })
    if (promos.promo.includes(promocode)) {
        percentage = promos.percentage;
        isPromoAvailable = true;
        price = price - price * percentage / 100;
    }
    if (count > 0) {
        return { isPromoAvailable, count, price, percentage }
    } else {
        return false
    }
}