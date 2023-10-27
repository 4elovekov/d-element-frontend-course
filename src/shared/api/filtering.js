import { goods } from "./goods";

export function Filtering (params) {
    params = params.slice(1).split("&");
    let result = []

    goods.forEach((good) => {
        let flag = true
        params.forEach((param) => {
            if ( !((param.split("=")[1] == "true") && (good.data.category.includes(param.split("=")[0]))) ) {
                flag = false;
            }
        })
        if (flag) {
            result.push(good.data)
        }
    })

    return result;
}