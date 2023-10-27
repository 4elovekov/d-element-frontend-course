import { commonComponentProps, getAttrs } from "../../../shared/lib";
import { Logo } from "../../../shared/ui/logo";

export function Header(props) {

    const {
        extraClasses = {},
        extraAttrs = {},
        baseClass = "header",
        getCN
    } = { ...commonComponentProps, ...props }

    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `
            <header class="${getClassName("", extraClasses)}" ${getAttrs(extraAttrs)} data-js-header="" >
            <div class="${getClassName("logo")}">
                ${Logo({
                    imageSrc: "./images/logo.svg",
                })}
            </div>
            <div class="${getClassName("nav")}">
            <a href="/">Главная</a>
            <a href="/catalog.html">Католог</a>
            <a href="/about.html">Корзина</a>
            </div>
            </header>
            `
}