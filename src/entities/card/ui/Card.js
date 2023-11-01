import { commonComponentProps, getAttrs } from "../../../shared/lib";

export function Card(props) {

    const {
        extraClasses = {},
        extraAttrs = {},
        baseClass = "card",
        getCN,
        imageSrc,
        label,
        productName,
        idProduct,
        children
    } = { ...commonComponentProps, ...props }

    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `
            <div class="${getClassName("", extraClasses)}" ${getAttrs(extraAttrs)} data-js-card="" data-js-idProduct="${idProduct}">
                <img src="${imageSrc}" class="${getClassName("image")}" alt="course"/>
                <div class="${getClassName("textBlock")}">
                    <p class="${getClassName("label")}">${label}</p>
                    <h6 class="${getClassName("productName")}">${productName}</h6>
                </div>
                ${children || `<p>тут могла быть ваша кнопка</p>`}
            </div>
            `
} 