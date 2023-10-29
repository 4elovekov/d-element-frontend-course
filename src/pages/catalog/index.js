import { getPage } from "../../shared/lib/index.js";
import { Filter } from "../../widgets/filter/index.js";
import { Header } from "../../widgets/header/index.js"

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
            ${Header()}
            <h1>Каталог</h1>
            ${Filter({ category: cat })}
        `,
    })
}