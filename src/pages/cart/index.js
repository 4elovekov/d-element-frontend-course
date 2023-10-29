import { getPage } from "../../shared/lib/index.js";
import { metaTag } from "../../shared/lib/meta.js";
import { Header } from "../../widgets/header/ui/Header.js";
import { Footer } from "../../widgets/footer/index.js";

export default () => {

    return getPage({
        title: "Корзина",
        body: `
            ${Header()}
            <main>
                <div class="container">
                    <h1>Корзина</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Главная</a>
                        </li>
                        <li>
                            <a href="/cart.html">Корзина</a>
                        </li>
                        <li>
                            <a href="/catalog.html">Каталог</a>
                        </li>
                    </ul>
                </nav>
            </main>
            ${Footer()}
        `,
        meta: metaTag
    })
}