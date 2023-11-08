import { goods } from "./consts/goods";

export function isPopular () {
    let result = []

    goods.forEach((good) => {
        if (good.data.isPopular == true) {
            result.push(good.data)
        }
    })

    return result;
}