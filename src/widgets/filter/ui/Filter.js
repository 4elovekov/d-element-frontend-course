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
                <div class="${getClassName("", "cards")}"></div>
                <div class="${getClassName("", "categories")}">
                ${category.map( cat => `<label data-js-search ${cat.isChecked ? "checked" : ""}><input data-js-search-param="" type="checkbox" value="${cat.searchParam}" ${cat.isChecked ? "checked" : ""}>${cat.name}</label>`).join("")}
                </div>
            </section>
            `
} 