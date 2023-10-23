import { commonComponentProps, getAttrs } from "../../../shared/lib";

export function Footer(props) {

    const {
        extraClasses = {},
        extraAttrs = {},
        baseClass = "footer",
        getCN
    } = { ...commonComponentProps, ...props }

    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `
            <footer class="${getClassName("", extraClasses)}" ${getAttrs(extraAttrs)} data-js-footer="" >
                <div class="${getClassName("info")}">
                    <div class="${getClassName("links")}">
                        <a href="/about.html">Курсы</a>
                        <a href="/about.html">О нас</a>
                        <a href="/about.html">Отзывы</a>
                        <a href="/about.html">Контакты</a>
                    </div>
                    <a href="about.html">Политика конфиденциальности</a>
                </div>
                <hr width="800 px">
            </footer>
            `
}