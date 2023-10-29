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
                <div class="${getClassName("main")}">
                    <div class="${getClassName("info")}">
                        <div class="${getClassName("links")}">
                            <a href="https://academy.d-element.ru/#kursy" target="_blank">КУРСЫ</a>
                            <a href="https://academy.d-element.ru/#onas" target="_blank">О НАС</a>
                            <a href="https://academy.d-element.ru/#faq" target="_blank">ОТЗЫВЫ</a>
                            <a href="https://d-element.ru/contacts/" target="_blank">КОНТАКТЫ</a>
                        </div>
                        <a href="https://d-element.ru/support/" target="_blank">Политика конфиденциальности</a>
                    </div>
                    <img src="/images/Line 15.svg">
                    <div class="${getClassName("contacts")}">
                        <div class="${getClassName("adress")}">
                            <p>Наш адресс</p>
                            <h5>г. Челябинск, ул. Лесопарковая 5/2</h5>
                        </div>
                        <div class="${getClassName("email")}">
                            <p>Эл. почта</p>
                            <h5>info@d-element.ru</h5>
                        </div>
                    </div>
                </div>
            </footer>
            `
}