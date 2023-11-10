import { getPage } from "../../shared/lib/index.js";
import { metaTag } from "../../shared/lib/meta.js";
import { Header } from "../../widgets/header/ui/Header.js";
import { Footer } from "../../widgets/footer/index.js";
import { Cart } from "../../widgets/cart/index.js";
import { breadCrumbs } from "../../shared/ui/breadCrumbs/index.js";

export default () => {

    return getPage({
        title: "Корзина",
        body: `
            ${Header()}
            <main>
                <div class="container">
                    ${breadCrumbs({
                        children: "КОРЗИНА"
                    })}
                    <h1>Корзина</h1>
                </div>
                ${Cart()}
            </main>
            ${Footer()}
        `,
        meta: metaTag
    })
}