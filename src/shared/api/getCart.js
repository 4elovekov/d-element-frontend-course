import myStore from "../config/zustandStore";
import { goods } from "./consts/goods";

export function GetCart () {
    const { getState } = myStore;
    const ids = getState().ids;
    let result = [];

    goods.forEach((good) => {
        if (ids.includes(Number(good.data.idProduct))) {
            result.push(good.data)
        }
    })

    return result;
}
