import { getPage } from "../../shared/lib/index.js";
import { Filter } from "../../widgets/filter/index.js";

const cat = [
    {
        name: "Все курсы",
        searchParam: "all",
        isChecked: true
    },
    {
        name: "Frontend-разработка",
        searchParam: "front",
        isChecked: false
    },
    {
        name: "Backend-разработка",
        searchParam: "back",
        isChecked: false
    },
    {
        name: "Мобильная разработка",
        searchParam: "mobile",
        isChecked: false
    },
    {
        name: "Управление разработкой",
        searchParam: "manage",
        isChecked: false
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