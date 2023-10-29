import { getPage } from "../../shared/lib/index.js";
import { Button } from "../../shared/ui/button/index.js";
import { Input } from "../../shared/ui/input/index.js";
import { metaTag } from "../../shared/lib/meta.js";
import { Header } from "../../widgets/header/index.js";
import { Footer } from "../../widgets/footer/index.js";

export default () => {

    return getPage({
        title: "Главная",
        body: `
            ${Header()}

            <h1>Главная</h1>

            <div class="form">
                <h2 class="name">Введите Ваше имя</h2>
                ${Input({
                    extraAttrs: {
                        "type": "text",
                        "id": "input",
                        "required minlength": "4",
                        "maxlength": "15"
                    }
                })}
                
                ${Button({
                    label: "Click",
                    extraAttrs: {
                        "id": "btn"
                    },
                    extraClasses: {
                        hidden: false,
                        disabled: false,
                    }
                })}
            </div>

            <nav>
                <ul>
                    <li>
                        <a href="/">Главная</a>
                    </li>
                    <li>
                        <a href="/about.html">О Нас</a>
                    </li>
                    <li>
                        <a href="/catalog.html">Каталог</a>
                    </li>
                </ul>
            </nav>
            ${Footer()}
        `,
        meta: metaTag
    })
}