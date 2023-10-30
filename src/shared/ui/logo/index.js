import { commonComponentProps, getAttrs } from "../../lib/index.js";

export function Logo(props) {

    const {
        extraClasses = {},
        extraAttrs = {},
        baseClass = "logo",
        getCN,
        imageSrc
    } = { ...commonComponentProps, ...props }

    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `<img src="${imageSrc}" class="${getClassName("", extraClasses)}" ${getAttrs(extraAttrs)}
    alt="logo"/>`
}