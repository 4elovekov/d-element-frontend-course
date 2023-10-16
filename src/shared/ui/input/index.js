import { commonComponentProps, getAttrs } from "../../lib/index.js";

export function Input (props) {
    const { extraClasses = {}, extraAttrs = {}, baseClass = "input", getCN, children } = { ...commonComponentProps, ...props }
    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `<input class="${getClassName("",  extraClasses)}" ${getAttrs(extraAttrs)}>
            ${children}
            </input>
            `
}