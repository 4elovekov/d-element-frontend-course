import { getPage } from "../../shared/lib/index.js";
import { Filter } from "../../widgets/filter/index.js";

const cat = [
    {
        name: "Все курсы",
        searchParam: "all"
    },
    {
        name: "Фронтенд",
        searchParam: "front"
    },
    {
        name: "Бэкенд",
        searchParam: "back"
    }
]

export default () => {

    return getPage({
        title: "Каталог",
        body: `
            <h1>Каталог</h1>
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
            ${Filter({ category: cat })}
        `,
    })
}