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
                <div class="${getClassName("main")}">
                    <div class="${getClassName("logo")}">
                        ${Logo({
                            imageSrc: "./images/logo.svg",
                            extraAttrs: {
                                "id": "logo"
                            }
                        })}
                    </div>
                    <div class="${getClassName("nav")}">
                        <a href="/">ГЛАВНАЯ</a>
                        <a href="/catalog.html">КАТАЛОГ</a>
                        <a href="/cart.html">
                            <img src="./images/Shopping cart.svg">
                            Корзина
                        </a>
                    </div>
                </div>
            </header>
            `
}