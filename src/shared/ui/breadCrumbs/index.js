import { commonComponentProps, getAttrs } from "../../lib/index.js";

export function breadCrumbs (props) {
    const { extraClasses = {}, extraAttrs = {}, baseClass = "breadCrumbs", getCN, children } = { ...commonComponentProps, ...props }
    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `<p class="${getClassName("", extraClasses)}" ${getAttrs(extraAttrs)}>
                <a href="/index.html">ГЛАВНАЯ</a>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;${children}
            </p>
            `
}