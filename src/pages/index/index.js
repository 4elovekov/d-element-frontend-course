import { getPage } from "../../shared/lib/index.js";
import { metaTag } from "../../shared/lib/meta.js";
import { Header } from "../../widgets/header/index.js";
import { Footer } from "../../widgets/footer/index.js";
import { Slider } from "../../widgets/slider/index.js";

export default () => {

    return getPage({
        title: "Главная",
        body: `
            ${Header()}
            <main>
                <div class="container">
                    <h1>Популярные товары</h1>
                </div>
                ${Slider()}
                <div class="container">
                    <div class="about">
                        <h2>О нас</h2>
                        <div class="about__textBlock">
                            <label>> 100 сотрудников</label>
                            <p>Аттестованных middle и senior разработчиков со всеми необходимыми\nкомпетенциями для создания качественных продуктов, которые занимают\nпризовые места на всероссийских и международных конкурсах.</p>
                        </div>
                        <div class="about__textBlock">
                            <label>Своя диджитал академия</label>
                            <p>Курсы по основам управления проектами, веб-разработки,\nпрограммированию. Много практики, основанной на проектах нашей\nкомпании, познавательные лекции и море интерактива.</p>
                        </div>
                    </div>
                    <div class="howTo">
                        <h2>Как пройти курс</h2>
                        <div class="howTo__qrBlock">
                            <div class="howTo__textBlock">
                                <p>Записывайтесь и получайте новые знания! \nДелайте репост и отправляйте друзьям,\nкоторым эта новость будет полезна.</p>
                                <label>Ждем вас на наших курсах!</label>
                            </div>
                            <img src="/images/qr.png">
                        </div>
                    </div>
                    <img src="/images/Ellipse.svg">
                </div>
            </main>
            ${Footer()}
        `,
        meta: metaTag
    })
}