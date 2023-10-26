import { commonComponentProps, getAttrs } from "../../../shared/lib";

export function Filter(props) {

    const {
        extraClasses = {},
        extraAttrs = {},
        baseClass = "filter",
        getCN,
        category,
    } = { ...commonComponentProps, ...props }

    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `
            <section class="${getClassName("", extraClasses)}" ${getAttrs(extraAttrs)} data-js-filter="" >
            ${category.map(cat => `<button data-js-search-param="${cat.searchParam}" class="${getClassName("btn")}">${cat.name}</button>`).join("")}
            </section>
            `
} 