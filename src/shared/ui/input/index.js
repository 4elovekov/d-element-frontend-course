import { commonComponentProps, getAttrs } from "../../lib/index.js";

export function Input (props) {
    const { extraClasses = {}, extraAttrs = {}, baseClass = "input", getCN } = { ...commonComponentProps, ...props }
    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `<input class="${getClassName("",  extraClasses)}" ${getAttrs(extraAttrs)}></input>`
}