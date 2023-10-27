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
                ${category.map( cat => `<label><input ${cat.isChecked ? "checked" : ""} data-js-search-param="" type="checkbox" value="${cat.searchParam}" ${cat.isChecked ? "checked" : ""}>${cat.name}</label>`).join("")}
            </section>
            `
} 