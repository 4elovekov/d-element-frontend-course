//import { commonComponentProps, getAttrs } from "../../../shared/lib";
import { commonComponentProps } from "../../../shared/lib";
import { Button } from "../../../shared/ui/button";

export function AddToCart(props) {

    const {
        extraClasses = {},
        extraAttrs = {},
        //baseClass = "btn",
        //getCN,
    } = { ...commonComponentProps, ...props }

    //const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `
            ${Button({
                label: "В корзину",
                extraAttrs: extraAttrs,
                extraClasses: extraClasses
            })}
            `
} 