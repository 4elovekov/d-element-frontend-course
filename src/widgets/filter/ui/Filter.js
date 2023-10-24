import { commonComponentProps, getAttrs } from "../../../shared/lib";

export function Header(props) {

    const {
        extraClasses = {},
        extraAttrs = {},
        baseClass = "filter",
        getCN,
    } = { ...commonComponentProps, ...props }

    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `
            <section class="${getClassName("", extraClasses)}" ${getAttrs(extraAttrs)} data-js-filter="" >
            
            </section>
            `
}