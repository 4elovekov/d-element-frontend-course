import { commonComponentProps, getAttrs } from "../../../shared/lib";

export function Cart(props) {

    const {
        extraClasses = {},
        extraAttrs = {},
        baseClass = "cart",
        getCN,
    } = { ...commonComponentProps, ...props }

    const getClassName = (elem, mod) => getCN(baseClass, elem, mod)

    return `
            <section class="${getClassName("", extraClasses)}" ${getAttrs(extraAttrs)} data-js-cart="" >
                <div class="${getClassName("", "cards")}"></div>
                <div class="${getClassName("", "form")}">
                    <h3 class="${getClassName("", "title")}">Итого</h3>

                    <div class="${getClassName("", "info")}">
                        <div class="${getClassName("", "products")}">
                            <p class="${getClassName("", "quantity")}">3 товара</p>
                            <p class="${getClassName("", "amount")}">24 000 ₽</p>
                        </div>
                        <div class="${getClassName("", "promo")}">
                            <label>Промокод</label>
                            <input type="text" placeholder="Введите промокод"></input>
                        </div>
                        <img src="/images/Line 16.svg">
                        <div class="${getClassName("", "total")}">
                            <p class="${getClassName("", "sum")}">Итоговая сумма</p>
                            <p class="${getClassName("", "price")}">24 000 ₽</p>
                        </div>
                    </div>

                    <button>Оформить заказ</button>
                </div>
                <a href="javascript:history.go(-1)"><img src="/images/Arrow left blue.svg">Продолжить покупки</a>
            </section>
            `
} 